import { MessageEmbed } from "discord.js";

export default {
  name: "server-icon",
  aliases: ["si", "servericon", "iconserver"],
  description: "Shows the server icon",
  cooldown: 3,
  execute(msg, args, client) {

  let embed = new MessageEmbed()
  .setColor(client.color)
  .setImage(msg.guild.iconURL({dynamic:true, size:2048}))
  .setTimestamp()
  .setDescription(msg.guild.name);
  return msg.channel.send(embed)

 }
}
