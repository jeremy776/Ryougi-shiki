import { MessageEmbed } from "discord.js";

export default {
  name: "setnick",
  cooldown:1,
  description: "set nickname, how to use?\n• setnick <@member> <new nickname>\n• documentation:\n  {member.tag} = Jeremy#2007\n  {member} = Jeremy",
  guildOnly:true,
  execute(msg, args, client) {

  let noPerms = new MessageEmbed()
  .setDescription("**Maybe you or I don't have \`MANAGE_NICKNAMES\` permissions**")
  if(!msg.member.hasPermission("MANAGE_NICKNAMES")) return msg.channel.send(noPerms)
  if(!msg.guild.me.hasPermission("MANAGE_NICKNAMES")) return msg.channel.send(noPerms)

  let member = msg.mentions.members.first();
  let noMember = new MessageEmbed()
  .setDescription("**Mention members first**")
  .setColor(client.color)
  .setTimestamp()
  if(!member) return msg.channel.send(noMember)

  let nick = args[0]
  let noNickname = new MessageEmbed()
  .setDescription("**Give some new nickname for "+member.user.tag+ "**")
  .setColor(client.color)
  .setTimestamp()
  if(!nick) return msg.channel.send(noNickname)

  let nickname = nick.replace(/{member.tag}/g, member.user.tag).replace(/{member}/g, member.user.username)

  let succes = new MessageEmbed()
  .setDescription(`**You succesfully set ${member.user.tag} to ${nickname}**`)
  .setColor(client.color)
  .setTimestamp()
  msg.channel.send(succes)
  return member.setNickname(nickname)

 }
}
