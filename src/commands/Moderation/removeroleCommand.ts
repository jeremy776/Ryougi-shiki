import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";
import { MessageEmbed, MessageAttachment } from "discord.js";
import type { Message } from "discord.js";

@CommandConf({
 name: "removerole",
 aliases: ["remove-role", "take-role"],
 description: "None",
 usage: "removerole [ @user || user id ] [ @role || role ]",
 cooldown:3,
 ownerOnly:false
})

export default class removeRoleCommand extends Command {
  public async exec(message: Message, args:string[]) {


  let noPerms = new MessageEmbed()
  .setDescription("**You don't have permission**")
  .setColor(this.client.color)

  if(!message.member?.hasPermission("MANAGE_ROLES")) return message.channel.send(noPerms);
  if(!message.guild?.me?.hasPermission("MANAGE_ROLES")) return message.channel.send({embed:{description: "**Give me \`MANAGE_ROLES\` permission if you want to run this command**", color:this.client.color}});


  let user = message.mentions.members?.first() || message.guild.members.cache?.get(args[0]);
  if(!user) {
    return message.reply("**You have to mention the person you want to remove the role to, or use r.help removerole**")
  }
  let role = message.mentions.roles?.first() || message.guild.roles.cache?.get(args[1]);
  if(!role) {
    return message.reply("**You have to mention the role**");
  }

  
  if(!user.roles?.cache.has(role?.id)) {
    return message.reply(`**${user.user.tag}** doesn't have that role [\`${role.name}\`]`)
  }

  let embed = new MessageEmbed()
  .setAuthor("REMOVE ROLE", message.guild?.iconURL({dynamic:true}) as any)
  .addField("Moderator", `${message.author} | \`${message.author.tag}\``)
  .addField("User", `${user} | \`${user.user.tag}\``)
  .addField("Role", `${role} | \`${role.name}\``)
  .setColor(this.client.color)
  .setTimestamp()
  .setFooter(`${user.user.username} you lose the role`)
  .setThumbnail(user.user.displayAvatarURL({ dynamic:true }))
  user.roles?.remove(role?.id)
  return message.channel.send(embed);

 }
}