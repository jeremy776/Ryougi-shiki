import { MessageEmbed } from "discord.js";

export default {
  name: "global",
  aliases: ["global-channel", "global-set"],
  cooldown: 3,
  description: "set channel for connect to global chat with all guild who use this",
  guildOnly:true,
  execute(msg, args, client) {

  if(!client.config.owner.includes(msg.author.id)) return msg.reply("**This command is still under development**")
  let channel = msg.mentions.channels.first();
  let noMention = new MessageEmbed()
  .setDescription("**You must mention channel first**")
  .setColor(client.color)
  .setTimestamp()
  if(!channel) return msg.channel.send(noMention);


  let Succes = new MessageEmbed()
  .setDescription(`**You have successfully set global-chat to ${channel} channel**`)
  .setColor(client.color)
  .setTimestamp()
  msg.channel.send(Succes)
 }
}
