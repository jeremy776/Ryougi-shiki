import { MessageEmbed } from "discord.js";
import { CommandConf } from "../../decorators";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
    name: "invite",
    aliases: [],
    description: "invite me pls :(",
    usage: "invite",
    cooldown: 1,
    ownerOnly: false
})

 export default class inviteCommand extends Command {
   public async exec(msg:Message, args:string[]) {

  let embed = new MessageEmbed()
  .setDescription("**Thank you for using our bot, and below is a link to invite me:)**")
  .setColor(this.client.color)
  .setTimestamp()
  .addField("🗒️ | Invite", `[Click Here](https://discordapp.com/api/oauth2/authorize?client_id=${this.client.user?.id}&permissions=8&scope=bot)`)
  return msg.channel.send(embed);
 }
}
