import { MessageEmbed } from "discord.js";
import { CommandConf } from "../../decorators";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
  name: "howgay",
  description: "you gay!",
  cooldown: 3,
  usage: "howgay @user",
  ownerOnly:false
})

 export default class howgayCommand extends Command {
   public async exec(msg:Message, args:string[]) {

  let user = msg.mentions.users.first() || msg.author;
  if(user.id == client.user.id) return msg.reply("I'll never be gay!")
  let embed = new MessageEmbed()
  .setColor(this.client.color)
  .setAuthor(user.tag + " is gay?", user.displayAvatarURL({dynamic:true}))
  .setDescription(thus.client.util.randomNumber(1, 100)+"%")
  .setTimestamp()
  return msg.channel.send(embed)

 }
}
