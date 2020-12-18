import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "partner",
  aliases: [],
  description: "who is my partner?",
  usage: "partner",
  cooldown: 3,
  ownerOnly:false
})

 export default class PartnerCommand extends Command {
   public async exec(msg:Message, args:string[]) {

   let embed = new MessageEmbed()
   .setColor(this.client.color)
   .setAuthor(this.client.user.username + " Partners", this.client.user.displayAvatarURL() as any)
   .addField("Partner's", `[${this.client.fetchInvite("https://discord.gg/pXzknDy7vv").then(x => x.guild.name)}](https://discord.gg/pXzknDy7vv)`)
   .setTimestamp()
   return msg.channel.send(embed)

 }
}
