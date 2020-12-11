import { MessageEmbed } from "discord.js";

export default {
  name: "slowmode",
  description: "set slowmode channel",
  guildOnly:true,
  execute(msg, args, client) {
    
    let embed1 = new MessageEmbed()
    .setDescription("**You must have \`MANAGE_CHANNELS\` permission**")
    .setColor(this.client.color)
    
    let embed2 = new MessageEmbed()
    .setDescription("**I need \`MANAGE_CHANNELS\` permission**")
    .setColor(this.client.color)
    
    if(!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(embed1)
    if(!msg.member.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(embed2)
    
    let channel = msg.mentions.channels.first() || msg.channel;
    
    let embed4 = new MessageEmbed()
    .setDescription("**Try again, you not specify a valid duration**")
    .setColor(this.client.color)
    
    let slowmode = args[0]
    if(!slowmode || isNaN(slowmode)) return msg.channel.send(embed4)
    
    let embed3 = new MessageEmbed()
    .setDescription(`**You have successfully set slowmode [${channel}] to \`${slowmode} Seconds\`**`)
    .setColor(this.client.color)
    
    channel.setRateLimitPerUser(slowmode)
    return msg.channel.send(embed3)
    
  }
}
