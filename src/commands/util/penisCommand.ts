import { MessageEmbed } from "discord.js";

export default {
  name: "penis",
  cooldown: 5,
  description: "how long is your penis?",
  guildOnly:true,
  execute(msg, args, client) {

  let user = msg.mentions.users.first() || msg.author;
  let embed = new MessageEmbed()
  .setColor(client.color)
  .setAuthor(`${user.username} Penis`)
  .setDescription(`8`+`=`.repeat(client.util.randomNumber(0, 10))+`D`)
  .setTimestamp()
  return msg.channel.send(embed)

 }
}
