import { MessageEmbed } from "discord.js";

export default {
  name: "penis",
  cooldown: 3,
  description: "how long is your penis?",
  guildOnly:true,
  execute(msg, args, client) {

  let user = msg.mentions.users.first() || msg.author;
  if(user.id == client.user.id) return msg.reply("Error. Too long ;)");
  let embed = new MessageEmbed()
  .setColor(client.color)
  .setAuthor(`${user.username} Penis`)
  .setDescription(`8`+`=`.repeat(client.util.randomNumber(1, 20))+`D`)
  .setTimestamp()
  return msg.channel.send(embed)

 }
}
