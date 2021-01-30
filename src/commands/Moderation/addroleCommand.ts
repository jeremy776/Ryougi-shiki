import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";
import { MessageEmbed, MessageAttachment } from "discord.js";
import type { Message } from "discord.js";

@CommandConf({
 name: "beautiful",
 aliases: [],
 description: "None",
 usage: "addrole [ @user || user id ] [ @role || role ]",
 cooldown:3,
 ownerOnly:false
})

export default class addRoleCommand extends Command {
  public async exec(message: Message, args:string[]) {

  let user = message.mentions.users?.first() || this.client.users.cache?.get(args[0]);
  if(!user) {
    return message.channel.reply("**You have to mention the person you want to add the role to, or use r.help addrole**")
  }
  let role = message.mentions.roles?.first() || message.guild.roles.cache?.get(args[0]);
  if(!role) {
    return message.channel.reply("**You have to mention the role**");
  }

  let embed = new MessageEmbed()
  .setAuthor("ADD ROLE", msg.guild?.iconURL({dynamic:true}))
  .addField("Moderator", `${msg.author} | \`${msg.author.tag}\``)
  .addField("User", `${user} | \`${user.tag}\``)
  .addField("Role", `${role} | \`${role.name}\``)
  .setColor(this.client.color)
  .setTimestamp()
  .setFooter(`${user.username} you get a new role`)
  .setThumbnail(user.displayAvatarURL({ dynamic&true }))
  return message.channel.send(embed);

 }
}
