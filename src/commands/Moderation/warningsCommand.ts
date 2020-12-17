import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "warnings",
  aliases: ["checkwarn"],
  description: "check user warnings",
  usage: "warnings [@user]",
  cooldown: 1,
  ownerOnly:false
})

 export default class warningsCommand extends Command {
   public async exec(msg:Message, args:string[]) {

    let user = msg.mentions.users.first() || msg.author
    let data = await this.client.db.get(`warning.${msg.guild?.id}.${user.id}`)
    if(!data) return msg.reply(`**${user.tag}** Has no warning`)

    let embed = new MessageEmbed()
    .setAuthor("🔔 Check Warns", msg.author.displayAvatarURL({dynamic:true}) as any)
    .setColor(this.client.color)
    .setTimestamp()
    .setDescription(`**${user.tag} have ${data.length} warn's**`)
    .addField("**Last 10 Warns**", data.slice(0,10).map((x:any) => `**${x.reason}** • ${require("moment")(x.timestamp).fromNow()}`))
    return msg.channel.send(embed);
 }
}
