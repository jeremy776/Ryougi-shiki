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
      channel = msg.guild?.channels.cache.get(dataWelcome.id)?.name;
    }else{
      channel = "NOT SET";
    }
    /* AKHIR WELCOME */
    
    /* GOODBYE */
    let leaveStatus;
    if(dataLeave.status == true) {
      leaveStatus = "ON"
    }else{
      leaveStatus = "OFF"
    }
    
    let leaveChannel;
    if(!isNaN(dataLeave.id)) {
      leaveChannel = msg.guild?.channels.cache.get(dataLeave.id).name;
    }else{
     leaveChannel = "NOT SET";
    }
    /* AKHIR GOODBYE */
    
    let embed = new MessageEmbed()
    .setAuthor(msg.guild?.name + " Config", msg.author?.displayAvatarURL({ dynamic:true }) as any)
    .setColor(this.client.color)
    .addField("Welcome Config",
`\`\`\`
• Status     :: ${status}
• Message    :: ${dataWelcome.message}
• Channel    :: ${channel}
• Background :: ${dataWelcome.bg}\`\`\``)

    .addField("Goodbye Config",
`\`\`\`
• Status  :: ${leaveStatus}
• Message :: ${dataLeave.message}
• Channel :: ${leaveChannel}
• Background :: ${dataLeave.bg}\`\`\``)
    .setFooter("replied from "+msg.author?.username)
    return msg.channel.send(embed)
  }
}