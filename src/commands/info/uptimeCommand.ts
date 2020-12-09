import { MessageEmbed } from "discord.js";

export default {
   name: "uptime",
   cooldown:1,
   description: "how long has this bot been active?",
   execute(msg, args, client) {

   let embed = new MessageEmbed()
   .setDescription(`**${client.util.parseDur(client.uptime)}**`)
   .setColor(client.color)
   .setTimestamp()
   return msg.channel.send(embed)

 }
}
