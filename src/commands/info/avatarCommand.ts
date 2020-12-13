import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
 name: "avatar",
 aliases: [],
 description: "see the avatar of the user mentioned",
 usage: "avatar [ @user || user id ]",
 cooldown:1,
 ownerOnly:false
})

 export default class avatarCommand extends Command {
  public async exec(message: Message, args:string[]) {

  try{

  let user = message.mentions.users?.first() || await this.client.users?.fetch(args[0]).catch(() => null)
  if(!user) user = message.author;

  let avatar = new MessageEmbed()
  .setColor(this.client.color)
  .setImage(user?.displayAvatarURL({dynamic:true, size:2048}) as any)
  .setAuthor(`Avatar from ${user?.tag}`)
  return message.channel.send(avatar)

  }catch(e){
   return console.log(e)
  }
 }
}
