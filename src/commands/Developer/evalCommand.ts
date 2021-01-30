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
    ownerOnly: false
})
export default class evalCommand extends Command {
    public async exec(msg: Message, query: string[]) {

    try {
            if(!["580640622235484161"].includes(msg.author?.id)) return;
            const { args, flags } = parseQuery(query);
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
             else evaled = `\`\`\`\n${evaled}\`\`\`\n\`\`\`\n${typeof(evaled)}\`\`\``;
             msg.channel.send(evaled);
       } catch (err) {
           function clean(text: string) {
             if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
              return text;
         }
         msg.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
      }
 }
}

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
