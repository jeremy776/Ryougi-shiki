import { MessageEmbed } from "discord.js";

export default {
   name: "clear",
   aliases: ["purge"],
   description: "clear message in channel",
   guildOnly:true,
   cooldown:10,
   execute(msg, args, client) {
    
    let userPerm = new MessageEmbed()
    .setDescription(`**Sorry, but you need \`MANAGE_MESSAGEA\` permissions to do this**`)
    .setColor(client.color)
    
    let clientPerm = new MessageEmbed()
    .setDescription(`**Sorry, but I need \`MANAGE_MESSAGES\` permission to do this**`)
    .setColor(client.color)
    
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(userPerm)
    if(!msg.member.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(clientPerm)
    
    let totalPut = new MessageEmbed()
    .setDescription(`**usage: ${client.config.prefix}clear [1 - 100]**`)
    .setColor(client.color)
    
    let total = args.join(" ");
    if(!total) return msg.channel.send(totalPut)
    
    let nan = new MessageEmbed()
    .setDescription(`**Value must be a number**`)
    .setColor(client.color)
    
    if(isNaN(total)) return msg.channel.send(nan)
    
    if(total > 100) return msg.channel.send(totalPut)
    
    if(total < 1) return msg.channel.send(totalPut)
    
    msg.channel.bulkDelete(total).then(x => {
      let succes = new MessageEmbed()
      .setDescription(`**You delete ${x.size} messages**`)
      .setColor(client.color)
      return msg.channel.send(succes).then(b => b.delete({timeout:4000}))
    });

 }
}
