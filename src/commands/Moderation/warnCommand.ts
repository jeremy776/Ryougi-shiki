import { CommandConf } from "../../decorators";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
  name: "warn",
  aliases: [],
  description: "warn user",
  usage: "warn [@user] [reason]",
  cooldown: 1,
  ownerOnly:true
})

 export default class warnCommand extends Command {
   public async exec(msg:Message, args:string[]) {

   let noPerms = new MessageEmbed()
   .setDescription("**You don't have permission**")
   .setColor(this.client.color)
   if(!msg.member?.hasPermission("MANAGE_GUILD")) return msg.channel.send(noPerms);

   let user = msg.mentions.users.first();
   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No Reason";

   let noUser = new MessageEmbed()
   .setDescription("**You must mention the person to be warned**")
   .setColor(this.client.color)
   if(!user) return msg.channel.send(noUser);

   if(user.id == this.client.user?.id) {
     return msg.reply("**Oh no, you can't warn me**")
   }

   if(user.id == msg.author?.id) {
     return msg.reply("**Oh no, you can't warn your self**")
   }

   let succes = new MessageEmbed()
   .setAuthor("⚠️ WARN", msg.author.displayAvatarURL({dynamic:true}) as any)
   .setThumbnail(user.displayAvatarURL({dynamic:true}) as any)
   .addField("User warned", `${user} | ${user.tag}`)
   .addField("Moderator", `${msg.author} | ${msg.author?.tag}`)
   .setColor(this.client.color)
   .addField("Time Stamp", `**\`${require("moment")(Date.now()).format("ddd MMM DD YYYY hh:mm:ss")}\`**`)
   .addField("Reason Warn", reason)
   .setFooter("Read the rules if you don't want to be warned")
   .setTimestamp()
   msg.channel.send(succes);

   let userData = {
      id: user.id,
      reason: reason,
      mod:msg.author?.id,
      timestamp:Date.now()
   }

   return this.client.db.push(`warning.${msg.guild?.id}.${user.id}`, userData);
 }
}
