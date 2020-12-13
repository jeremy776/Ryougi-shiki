import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
    name: "setnick",
    aliases: ["nick"],
    description: "set nick member",
    usage: "setnick [@member] [new nickname]",
    cooldown: 2,
    ownerOnly: false
})

 export default class setnickCommand extends Command {
   public async exec(msg:Message, args:string[]) {

  let noPerms = new MessageEmbed()
  .setDescription("**Maybe you or I don't have \`MANAGE_NICKNAMES\` permissions**")
  .setColor(this.client.color)
  if(!msg.member?.hasPermission("MANAGE_NICKNAMES")) return msg.channel.send(noPerms)
  if(!msg.guild?.me?.hasPermission("MANAGE_NICKNAMES")) return msg.channel.send(noPerms)

  let member = msg.mentions.members?.first();
  let noMember = new MessageEmbed()
  .setDescription("**Mention members first**")
  .setColor(this.client.color)
  .setTimestamp()
  if(!member) return msg.channel.send(noMember)

  let nick = args[1]
  let noNickname = new MessageEmbed()
  .setDescription("**Give some new nickname for "+member.user.tag+ "**")
  .setColor(this.client.color)
  .setTimestamp()
  if(!nick) return msg.channel.send(noNickname)

  let nickname = nick.replace(/{member.tag}/g, member.user.tag).replace(/{member}/g, member.user.username)

  let succes = new MessageEmbed()
  .setDescription(`**You succesfully set ${member.user.tag} to ${nickname}**`)
  .setColor(this.client.color)
  .setTimestamp()
  msg.channel.send(succes)
  return member.setNickname(nickname)

 }
}
