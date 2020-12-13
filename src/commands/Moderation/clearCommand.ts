import { MessageEmbed } from "discord.js";
import type { Message, TextChannel } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
   name: "clear",
   aliases: ["purge"],
   description: "clear message in channel",
   ownerOnly:false,
   cooldown:10,
   usage: "clear 80"
})

 export default class clearCommand extends Command {
   public async exec(msg:Message, args:string[]) {

    let client = this.client;
    let channel = msg.channel as TextChannel;
    let userPerm = new MessageEmbed()
    .setDescription(`**Sorry, but you need \`MANAGE_MESSAGEA\` permissions to do this**`)
    .setColor(client.color)
    
    let clientPerm = new MessageEmbed()
    .setDescription(`**Sorry, but I need \`MANAGE_MESSAGES\` permission to do this**`)
    .setColor(client.color)
    
    if(!msg.member?.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(userPerm)
    if(!msg.member.guild?.me?.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(clientPerm)
    
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
    
    channel.bulkDelete(total).then((x:any) => {
      let succes = new MessageEmbed()
      .setDescription(`**You delete ${x.size} messages**`)
      .setColor(client.color)
      return msg.channel.send(succes).then((b:any) => b.delete({timeout:4000}))
    });

 }
}
