import { MessageEmbed } from "discord.js";

export default {
  name: "unlock",
  aliases: ["unlockdown"],
  cooldown: 5,
  guildOnly:true,
  description: "Unlock a locked channel",
  execute(message, args, client) {

   let noPerms = new MessageEmbed()
   .setColor(client.color)
   .setDescription(`**You must have the \`MANAGE_CHANNELS\` permission**`);
   if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(noPerms);

   let clientNoPerms = new MessageEmbed()
   .setColor(client.color)
   .setDescription(`**I need to have the \`MANAGE_CHANNELS\` permission**`);
   if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(clientNoPerms);


   message.channel.overwritePermissions([{
        id: message.guild.id,
        null: ['SEND_MESSAGES'],
     },
    ],
   );

   let Succes = new MessageEmbed()
   .setColor(client.color)
   .setDescription(`**\`${message.author.tag}\` has unlocked the channel`)
   return message.channel.send(Succes)
 }
}
