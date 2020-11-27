import { MessageEmbed } from "discord.js";

export default {
  name: "lock",
  aliases: ["lockdown"],
  description: "Lock channel",
  execute(client, args, message) {

  if(!message.guild.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed:{description: "**You do not have permission to lock this channel**", color:client.color}});
  
   message.channel.overwritePermissions([{
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],
   );

  return msg.channel.send({embed:{description:`**\`${message.author.tag}\` has locked this channel**`, color:client.color}});

 }
}
