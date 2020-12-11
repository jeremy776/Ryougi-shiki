import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
   name: "uptime",
   description: "how long has this bot been active?",
   usage: "uptime",
   cooldown: 1,
   ownerOnly:false
})

 export default class uptimeCommand extends Command {
   public async exec(msg:Message, args:[]) {

   let embed = new MessageEmbed()
   .setDescription(`**${this.client.util.parseDur(this.client.uptime)}**`)
   .setColor(client.color)
   .setTimestamp()
   return msg.channel.send(embed)
 }
}
