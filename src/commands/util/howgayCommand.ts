import { MessageEmbed } from "discord.js";

export default {
  name: "howgay",
  description: "you gay!",
  cooldown: 3,
  guildOnly:true,
  execute(msg, args, client) {

  let user = msg.mentions.users.first() || msg.author;
  if(user.id == client.user.id) return msg.reply("I'll never be gay!")
  let embed = new MessageEmbed()
  .setColor(client.color)
  .setAuthor(user.tag + " is gay?", user.displayAvatarURL({dynamic:true}))
  .setDescription(client.util.randomNumber(1, 100)+"%")
  .setTimestamp()
  return msg.channel.send(embed)

 }
}
