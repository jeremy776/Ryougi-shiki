import { MessageEmbed } from "discord.js";

export default {
  name: "server-icon",
  aliases: ["si", "servericon", "iconserver"],
  description: "Shows the server icon",
  cooldown: 3,
  execute(message, args, client) {

  let embed = new MessageEmbed()
  .setColor(client.color)
  .setImage(message.guild.iconURL({dynamic:true, size:2048})
  .setTimestamp()
  .setDescription(message.guild.name)

  return message.channel.send(embed)


 }
}
