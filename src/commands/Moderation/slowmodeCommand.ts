import { MessageEmbed } from "discord.js";
import type { Message, TextChannel } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "slowmode",
  description: "set slowmode channel",
  cooldown:1,
  ownerOnly:false,
  usage: "slowmode 60"
})

 export default class slowmodeCommand extends Command {
   public async exec(msg:Message, args:string[]) {
    
    let embed1 = new MessageEmbed()
    .setDescription("**You must have \`MANAGE_CHANNELS\` permission**")
    .setColor(this.client.color)
    let embed2 = new MessageEmbed()
    .setDescription("**I need \`MANAGE_CHANNELS\` permission**")
    .setColor(this.client.color)
    if(!msg.member?.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(embed1)
    if(!msg.member.guild?.me?.hasPermission("MANAGE_CHANNELS")) return msg.channel.send(embed2)
    let channel = msg.mentions.channels?.first() as TextChannel || msg.channel as TextChannel;
    let embed4 = new MessageEmbed()
    .setDescription("**Try again, you not specify a valid duration**")
    .setColor(this.client.color)
    let slowmode = Number(args[0])
    if(!slowmode || isNaN(slowmode as any)) return msg.channel.send(embed4)
    let embed3 = new MessageEmbed()
    .setDescription(`**You have successfully set slowmode [${channel}] to \`${slowmode} Seconds\`**`)
    .setColor(this.client.color)
    channel.setRateLimitPerUser(slowmode)
    
    if(["off", "0"].includes(args[0])) {
      channel.setRateLimitPerUser(0);
    }
    return msg.channel.send(embed3)
  }
}
