import { MessageEmbed } from "discord.js";

export default {
   name: "wasted",
   cooldown: 1,
   description: "wasted....",
   guildOnly:true,
   execute(msg, args, client) {

   let user = msg.mentions.users.first() || msg.author;
   let embed = new MessageEmbed()
   .setColor(client.color)
   .setImage(`https://some-random-api.ml/canvas/wasted?avatar=${user.displayAvatarURL()}`)
   .setTimestamp()
   return msg.channel.send(embed)
 }
}
