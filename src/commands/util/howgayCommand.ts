import { MessageEmbed } from "discord.js";
import { CommandConf } from "../../decorators";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
    name: "howgay",
    aliases: [],
    description: "fuck you gay",
    usage: "howgay @user",
    cooldown: 3,
    ownerOnly: false
})

 export default class howgayCommand extends Command {
   public async exec(msg:Message, args:string[]) {

  let user = msg.mentions.users.first() || msg.author;
  if(user.id == this.client.user?.id) return msg.reply("I'll never be gay!")
  let embed = new MessageEmbed()
  .setColor(this.client.color)
  .setAuthor(user.tag + " is gay?", user.displayAvatarURL({dynamic:true}))
  .setDescription(this.client.util.randomNumber(1, 100)+"%")
  .setTimestamp()
  return msg.channel.send(embed)

 }
}
