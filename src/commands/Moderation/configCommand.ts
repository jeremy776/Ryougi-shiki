import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";

@CommandConf({
  name: "config",
  cooldown: 2,
  aliases: [],
  ownerOnly: false,
  description: "see the guild config",
  usage: "config"
})

export default class ConfigCommand extends Command {
  public async exec(msg:Message, args:string[]) {
    
    let dataWelcome = await this.client.db.get(`welcome.${msg.guild?.id}`);
    let dataLeave = await this.client.db.get(`leave.${msg.guild?.id}`);
    if(!dataWelcome) {
      dataWelcome = {
        id: "NOT SET",
        serverId: msg.guild?.id,
        message: "NOT SET",
        status: false,
        bg: "NOT SET"
      }
    }
    if(!dataLeave) {
      dataLeave = {
        id: "NOT SET",
        serverId: msg.guild?.id,
        message: "NOT SET",
        status: false,
        bg: "NOT SET"
      }
    }
    
    /* WELCOME */
    let status;
    if(dataWelcome.status == true) {
      status = "ON"
    }else{
      status = "OFF"
    }
    let channel;
    if(!isNaN(dataWelcome.id)) {
      channel = `<#${dataWelcome.id}>`
    }else{
      channel = "NOT SET"
    }
    /* AKHIR WELCOME */
    
    let embed = new MessageEmbed()
    .setAuthor(msg.guild?.name + " Config", msg.author?.displayAvatarURL({ dynamic:true }) as any)
    .setColor(this.client.color)
    .addField("WELCOME", `**STATUS:** ${status}\n**MESSAGE:** ${dataWelcome.message}\n**CHANNEL:** ${channel}`)
    .setFooter("replied from "+msg.author?.username)
    return msg.channel.send(embed)
  }
}