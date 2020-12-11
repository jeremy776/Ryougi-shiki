import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "kick",
  cooldown: 2,
  aliases: ["kick-user"],
  description: "Kick member",
  usage: "kick <@user> [reason]",
  ownerOnly:false
})

 export default class kickCommand extends Command {
   public async exec(msg:Message, args:[]) {

  let noPerms = new MessageEmbed()
  .setDescription("**You must have \`KICK MEMBERS\` permission**")
  .setColor(client.color)
  .setTimestamp()
  if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(noPerms);
  if(!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.send({embed:{description: "**Give me \`KICK MEMBER\` permission if you want to run this command**", color:client.color}});


  let user = msg.mentions.members.first();
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "None";

  let noMention = new MessageEmbed()
  .setDescription("**You must mention member first!**")
  .setColor(client.color)
  .setTimestamp()
  if(!user) return msg.channel.send(noMention);

  if(user.id == msg.author.id) {
    let sameUser = new MessageEmbed()
    .setDescription("**You can't kick yourself**")
    .setColor(client.color)
    .setTimestamp()
    return msg.channel.send(sameUser)
  }

  if(user.id == msg.guild.ownerID) {
    let ownerUser = new MessageEmbed()
    .setDescription("**You can't kick owner from this server!**")
    .setColor(client.color)
    .setTimestamp()
    return msg.channel.send(ownerUser);
  }

  if(!user.kickable) {
    let cantKick = new MessageEmbed()
    .setDescription(`**Maybe something went wrong, but I can't kick ${user.displayName}**`)
    .setColor(client.color)
    .setTimestamp()
    return msg.channel.send(cantKick);
  }

  user.kick(reason)
      .then(() => {
       let succes = new MessageEmbed()
       .setAuthor("KICK USER", msg.guild.iconURL({dynamic:true}))
       .addField("Moderator", "**"+msg.author.tag+"**")
       .addField("User", "**"+user.user.tag+"**")
       .addField("Reason", "**"+reason+"**")
       .setTimestamp()
       .setColor(client.color)
       return msg.channel.send(succes)
      })
      .catch(console.error);
 }
}
