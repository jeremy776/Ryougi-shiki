import { CommandConf } from "../../decorators";
import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
  name: "level-enable",
  aliases: ["enable-level", "level-on"],
  description: "Turn off leveling on your server",
  usage: "level-disable",
  cooldown: 1,
  ownerOnly:true
})

 export default class levelDisableCommand extends Command {
   public async exec(msg:Message, args:string[]) {

   let data = await this.client.db.get(`level-status.${msg.guild?.id}`)
   //if(!data) return msg.reply("**It's not active anymore**");
   if(data == true) return msg.reply("**It's already active**");

   let embed = new MessageEmbed()
   .setDescription(`**You have successfully enabled the leveling on your server**`)
   .setColor(this.client.color)
   .setTimestamp()
   msg.channel.send(embed)
   return this.client.db.set(`level-status.${msg.guild?.id}`, true);
 }
}
