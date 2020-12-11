import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "server-icon",
  aliases: ["si", "servericon", "iconserver"],
  description: "Shows the server icon",
  usage: "server-icon"
  cooldown: 3,
  ownerOnly:false
})

 export default class server-iconCommand extends Command {
  public async exec(msg:Message, args:[]) {

  let embed = new MessageEmbed()
  .setColor(this.client.color)
  .setImage(msg.guild.iconURL({dynamic:true, size:2048}))
  .setTimestamp()
  .setAuthor(msg.guild.name, msg.author.displayAvatarURL({dynamic:true}));
  return msg.channel.send(embed)
 }
}
