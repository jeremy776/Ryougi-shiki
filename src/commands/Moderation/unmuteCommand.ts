import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "unmute",
  aliases: [],
  description: "unmute user",
  usage: "unmute [@user]",
  cooldown: 1,
  ownerOnly:false
})

 export default class unmuteCommand extends Command {
   public async exec(msg:Message, args:string[]) {

   let user = msg.mentions.members?.first()
   if(!user) return msg.reply("**You must mention members who have been mute**")

   let check = msg.guild?.roles.cache.filter((x:any) => x.name.toLowerCase() == "muted").first()
   if(!user.roles?.cache.has(check?.id)) return msg.reply("**Maybe the role is not detected, or this user is not muted**")

   let embed = new MessageEmbed()
   .setAuthor("🔊 UNMUTE", msg.author.displayAvatarURL({dynamic:true}) as any)
   .setColor(this.client.color)
   .addField("User Unmute", `${user} | ${user.user.tag}`)
   .addField("Moderator", `${msg.author} | ${msg.author?.tag}`)
   .addField("Time Stamp", `**\`${require("moment")(Date.now()).format("ddd MMM DD YYYY hh:mm:ss")}\`**`)
   .setFooter("Congratulations, you are no longer muted")
   .setTimestamp()
   msg.channel.send(embed)
   return user.roles?.remove(check?.id)
 }
}
