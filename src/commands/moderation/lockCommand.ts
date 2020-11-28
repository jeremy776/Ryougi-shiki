export default {
  name: "lock",
  aliases: ["lockdown"],
  cooldown: 5,
  guildOnly: true,
  description: "Lock channel",
  execute(message, args, client) {

  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed:{description: "**You do not have permission \`MANAGE_CHANNELS\` to lock this channel**", color:client.color}});
  if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed:{description: "**Give me \`MANAGE_CHANNELS\` permission if you want to run this command**", color:client.color}});
   
  message.channel.overwritePermissions([{
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],
   );
  return message.channel.send({embed:{description:`**\`${message.author.tag}\` has locked this channel**`, color:client.color}});
 }
}