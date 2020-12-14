import { MessageEmbed } from "discord.js";
const superagent = require("superagent");
import { CommandConf } from "../../decorators";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
    name: "npm",
    aliases: [],
    description: "get info about npm",
    usage: "npm discord.js",
    cooldown: 3,
    ownerOnly: false
})

 export default class npmCommand extends Command {
   public async exec(message:Message, args:string[]) {

  let noNpm = new MessageEmbed()
  .setDescription("**You must enter the name npm**")
  .setColor("RED")

  const npm = args.join("+");
  if (!npm) return message.channel.send(noNpm);
  try {
    const { body } = await superagent.get(`https://registry.npmjs.com/${npm}`);
    const version = body.versions[body["dist-tags"].latest];
    let deps = version.dependencies ? Object.keys(version.dependencies) : null;
    let maintain = body.maintainers.map((user:any) => user.name);
    //if (maintain.length > 10) maintain = this.client.util.trimArray(maintain);
   // if (deps && deps.length > 10) deps = this.client.util.trimArray(deps);
    const embed = new MessageEmbed()
      .setColor(this.client.color)
      .setFooter(`Reply ${message.author.tag}`)
      .setTimestamp()
      .setAuthor(body.name, "https://i.imgur.com/ErKf5Y0.png")
      .setDescription(`${body.description || "No description."}`)
      .addField("**Version:**", "v"+body["dist-tags"].latest)
      .addField("**License:**", `©️ ${body.license || "None"}`)
      .addField("**Author:**", `👤 ${body.author ? body.author.name : "Unknown"}`)
      .addField("**Modified:**", `⏰ ${new Date(body.time.modified).toDateString()}`)
      .addField("**Dependencies:**", `🗃️ ${deps && deps.length ? deps.map(x => `\`${x}\``).join(", ") : "None"}`)
      .addField("**Maintainers:**", `👥 ${maintain.map((x:any) => `\`${x}\``).join(", ")}`)
      .addField("**Download:**", `[${body.name}](https://www.npmjs.com/package/${npm})`)
    return message.channel.send(embed);
  } catch (e) {
    return message.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }

 }
}
