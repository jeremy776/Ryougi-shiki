import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
 name: "wasted",
 aliases: [],
 description: "Wasted....",
 usage: "wasted @user",
 cooldown: 1,
 ownerOnly:false
})

 export default class wastedCommand extends Command {
  public async exec(msg: Message, args:string[]) {
   let user = msg.mentions.users.first() || msg.author;
   let embed = new MessageEmbed()
   .setColor(this.client.color)
   .setImage(`https://some-random-api.ml/canvas/wasted?avatar=${user.displayAvatarURL({format:"png"})}`)
   .setTimestamp()
   return msg.channel.send(embed)
 }
}
