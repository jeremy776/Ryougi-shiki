import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";
import { MessageEmbed, MessageAttachment } from "discord.js";
import type { Message } from "discord.js";

@CommandConf({
 name: "addrole",
 aliases: [],
 description: "None",
 usage: "addrole [ @user || user id ] [ @role || role ]",
 cooldown:3,
 ownerOnly:false
})

export default class addRoleCommand extends Command {
  public async exec(message: Message, args:string[]) {


  let noPerms = new MessageEmbed()
  .setDescription("**You don't have permission**")
  .setColor(this.client.color)

  if(!message.member?.hasPermission("MANAGE_ROLES")) return message.channel.send(noPerms);
  if(!message.guild?.me?.hasPermission("MANAGE_ROLES")) return message.channel.send({embed:{description: "**Give me \`MANAGE_ROLES\` permission if you want to run this command**", color:this.client.color}});


  let user = message.mentions.members?.first() || message.guild.members.cache?.get(args[0]);
  if(!user) {
    return message.reply("**You have to mention the person you want to add the role to, or use r.help addrole**")
  }
  let role = message.mentions.roles?.first() || message.guild.roles.cache?.get(args[1]);
  if(!role) {
    return message.reply("**You have to mention the role**");
  }

  
  if(user.roles?.cache.has(role?.id)) {
    return message.reply(`**${user.tag}** already have that role [\`${role.name}\`]`)
  }

  let embed = new MessageEmbed()
  .setAuthor("ADD ROLE", message.guild?.iconURL({dynamic:true}) as any)
  .addField("Moderator", `${message.author} | \`${message.author.tag}\``)
  .addField("User", `${user} | \`${user.tag}\``)
  .addField("Role", `${role} | \`${role.name}\``)
  .setColor(this.client.color)
  .setTimestamp()
  .setFooter(`${user.username} you get a new role`)
  .setThumbnail(user.displayAvatarURL({ dynamic:true }))
  return message.channel.send(embed);

 }
}
