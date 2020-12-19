import { CommandConf } from "../../decorators";
import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
  name: "setreward",
  aliases: [],
  description: "Set reward when the member gets the level that has been set and will get a role",
  usage: "setreward <level> <roles>",
  cooldown: 3,
  ownerOnly:true
})

 export default class setrewardCommand extends Command {
   public async exec(msg:Message, args:string[]) {

   let level = args[0]
   if(!level) return msg.reply("**You didn't enter the level:(**");

   let role = msg.mentions.roles?.first()
   if(!role) return msg.reply("**You did not enter a role reward :(**");

   let set = new MessageEmbed()
   .setColor(this.client.color)
   .setAuthor("New Reward", msg.guild?.iconURL({dynamic:true}) as any)
   .setDescription(`New rewards have been added\n If a member reaches level **${level}**, he will get a role ${role}`)
   .setTimestamp()
   .setFooter(`Set by ${msg.author?.tag}`, msg.author?.displayAvatarURL({dynamic:true}) as any)
   return msg.channel.send(set)
 }
}
