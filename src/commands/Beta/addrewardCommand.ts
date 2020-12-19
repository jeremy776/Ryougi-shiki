import { CommandConf } from "../../decorators";
import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
  name: "addreward",
  aliases: ["addrewards"],
  description: "Add reward when the member gets the level that has been set and will get a role",
  usage: "setreward <level> <roles>",
  cooldown: 3,
  ownerOnly:true
})

 export default class setrewardCommand extends Command {
   public async exec(msg:Message, args:string[]) {

   let data = await this.client.db.get(`levelreward.${msg.guild?.id}`);
   let level = Number(args[0]);
   if(!level) return msg.reply("**You didn't enter the level:(**");
   if(isNaN(level)) return msg.reply("**That's not a valid level**");
   if(data) {
     if(data.map((x:any) => x.theLevel).includes(level)) return msg.reply("Rewards at this level already exist")
   }

     let role = msg.mentions.roles?.first();
     if(!role) return msg.reply("**You did not enter a role reward :(**");
     if(data) {
       if(data.map((x:any) => x.roleId).includes(role.id)) return msg.reply("This role is already registered in the database")
     }

     let set = new MessageEmbed()
     .setColor(this.client.color)
     .setAuthor("New Reward", msg.guild?.iconURL({dynamic:true}) as any)
     .setDescription(`New rewards have been added\n\n• If a member reaches level **${level}**, he will get a role ${role}`)
     .setTimestamp()
     .setFooter(`Set by ${msg.author?.tag}`, msg.author?.displayAvatarURL({dynamic:true}) as any)
     msg.channel.send(set)
     return this.client.db.push(`levelreward.${msg.guild?.id}`, {
       roleId: role.id,
       theLevel: level
     });
 }
}