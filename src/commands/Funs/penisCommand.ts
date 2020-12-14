import { MessageEmbed } from "discord.js";
import { CommandConf } from "../../decorators";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
    name: "penis",
    aliases: [],
    description: "how long your penis? :u",
    usage: "penis [@user]",
    cooldown: 3,
    ownerOnly: false
})

 export default class penisCommand extends Command {
   public async exec(msg:Message, args:string[]) {

  let user = msg.mentions.users.first() || msg.author;
  if(user.id == this.client.user?.id) return msg.reply("Error. Too long ;)");
  let embed = new MessageEmbed()
  .setColor(this.client.color)
  .setAuthor(`${user.username} Penis`)
  .setDescription(`8`+`=`.repeat(this.client.util.randomNumber(1, 30))+`D`)
  .setTimestamp()
  return msg.channel.send(embed)
 }
}
