import { MessageEmbed } from "discord.js";
import type { Message, TextChannel } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "mute",
  aliases: [],
  description: "mute member",
  usage: "mute <@user> [reason]",
  cooldown:1,
  ownerOnly:true
})

 export default class muteCommand extends Command {
   public async exec(msg:Message, args:string[]) {

  if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send("You need permission KICK_MEMBER")
  if(!msg.member?.guild?.me.hasPermission("KICK_MEMBERS")) return msg.reply("I cant mute that user, give me KICK_MEMBER")
  
  let a = msg.mentions?.users.first()
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "No Reason";
  
  if(!a) return msg.reply("who want to you mute?")
  if(a.id === msg.author?.id) return msg.reply("You cant mute your self")
  let g = this.client.guilds?.cache.get(msg.guild?.id)
  
  let user = g.members?.cache.get(a.id)
  let role = g.roles?.cache.find(r => r.name === "Muted") as any
  if (!role) {
    try {
      role = await msg.guild?.roles.create({
        data: {
          name: "Muted",
          permissions: []
        }
      })
      msg.guild?.channels?.cache.forEach(async (channel) => {
        await channel.createOverwrite(role, {
          SEND_MESSAGES: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false
        })
      })
    } catch(e) {
      console.log(e.stack)
    }
  }
  user.roles?.add(role.id)

  let embed = new MessageEmbed()
  .setAuthor("🔇 MUTE", msg.author.displayAvatarURL({dynamic:true}) as any)
  .setColor(this.client.color)
  .addField("User Muted", `${a} | ${a.tag}`)
  .addField("Moderator", `${msg.author} | ${msg.author?.tag}`)
  .addField("Time Stamp", `**\`${require("moment")(Date.now()).format("ddd MMM DD YYYY hh:mm:ss")}\`**`)
  .addField("Reason Mute", reason)
  .setTimestamp()
  .setFooter("Read the rules if you don't want to be muted")
  msg.channel.send(embed)

 }
}
