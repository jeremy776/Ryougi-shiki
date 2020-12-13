import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";
import { MessageEmbed } from "discord.js";

@CommandConf({ 
    name: "eval",
    aliases: ["ev", "e"],
    description: "secret command",
    usage: "",
    cooldown: 1,
    ownerOnly: true
})
export default class evalCommand extends Command {
    public async exec(message: Message, query: string[]) {

 if(!this.client.config.owner.includes(message.author.id)) return message.channel.send({embed:{description:"**Only for my dev**", color:this.client.color}});
  
  const choice = ["🚫"]
  const bot = this.client;
  const msg = message;

  const { args, flags } = parseQuery(query);
  try {
    if (!args.length) {
      throw new TypeError("Eval command cannot execute without input!. You bbbaka...");
    }
    let code = args.join(" ");
    let depth = 0;
    if (flags.includes("async")) {
      code = `(async() => { ${code} })()`;
    }
    let { evaled, type } = await parseEval(eval(code)); /* eslint-disable-line */
    if (flags.includes("silent")) return;
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth });
    evaled = evaled
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`);
    if (evaled.length > 2048) evaled = await this.client.util.hastebin(evaled);
    else evaled = `\`\`\`${evaled}\`\`\``;
    const embed = new MessageEmbed()
      .setAuthor("Evaled success")
      .setColor(this.client.color)
      .setDescription(evaled)
      .addField("Type", `\`\`\`${type}\`\`\``)
      .setFooter(`React to delete message.`);
    const m = await message.channel.send(embed);
    for (const chot of choice) {
      await m.react(chot);
    }
    const filter = (rect:any, usr:any) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 600000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "🚫") return m.delete();
    });
  }catch (e) {
    const embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor("Evaled error")
      .setDescription(`\`\`\`${e}\`\`\``)
      .setFooter(`React to delete message.`);
    const m = await message.channel.send(embed);
    for (const chot of choice) {
      await m.react(chot);
    }
    const filter = (rect:any, usr:any) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 60000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "🚫") return m.delete();
    });
  }
 }
};

async function parseEval(input: any) {
  const isPromise =
    input instanceof Promise &&
    typeof input.then === "function" &&
    typeof input.catch === "function";
  if (isPromise) {
    input = await input;
    return {
      evaled: input,
      type: `Promise<${parseType(input)}>`
    };
  }
  return {
    evaled: input,
    type: parseType(input)
  };
}

function parseType(input: any) {
  if (input instanceof Buffer) {
    let length = Math.round(input.length / 1024 / 1024);
    let ic = "MB";
    if (!length) {
      length = Math.round(input.length / 1024);
      ic = "KB";
    }
    if (!length) {
      length = Math.round(input.length);
      ic = "Bytes";
    }
    return `Buffer (${length} ${ic})`;
  }
  return input === null || input === undefined ? "Void" : input.constructor.name;
}

function parseQuery(queries: string[]) {
  const args = [];
  const flags = [];
  for (const query of queries) {
    if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase());
    else args.push(query);
  }
  return { args, flags };
}