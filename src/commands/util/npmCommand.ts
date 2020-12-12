import { MessageEmbed } from "discord.js";
const superagent = require("superagent");
import { CommandConf } from "../../decorators";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
  name: "npm",
  cooldown: 2,
  ownerOnly:false,
  description: "Get information about npm",
  usage: "npm quick.db"
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
    let maintain = body.maintainers.map(user => user.name);
    if (maintain.length > 10) maintain = client.util.trimArray(maintain);
    if (deps && deps.length > 10) deps = client.util.trimArray(deps);
    const embed = new MessageEmbed()
      .setColor(this.client.color)
      .setFooter(`Reply ${message.author.tag}`)
      .setTimestamp()
      .setAuthor(body.name, "https://i.imgur.com/ErKf5Y0.png")
      .setDescription(`${body.description || "No description."}
🆙 **Version:** ${body["dist-tags"].latest}
©️ **License:** ${body.license || "None"}
👤 **Author:** ${body.author ? body.author.name : "Unknown"}
⏰ **Modified:** ${new Date(body.time.modified).toDateString()}
🗃️ **Dependencies:** ${deps && deps.length ? deps.map(x => `\`${x}\``).join(", ") : "None"}
👥 **Maintainers:** ${maintain.map((x:any) => `\`${x}\``).join(", ")}
**Download:** [${body.name}](https://www.npmjs.com/package/${npm})`);
    return message.channel.send(embed);
  } catch (e) {
    return message.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }

 }
}
