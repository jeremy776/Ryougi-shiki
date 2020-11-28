import { MessageEmbed } from "discord.js";

export default {
  name: "stats",
  aliases: ["bot-stats"],
  cooldown: 3,
  guildOnly: true,
  description: "Get stats or information about bots",
  execute(message, args, client) {

  let botInfo = new MessageEmbed()
  .setAuthor(`${client.user.username} Stats`, message.author.displayAvatarURL({dynamic:true}))
  .setColor(client.color)

  return message.channel.send(botInfo)

 }
}
