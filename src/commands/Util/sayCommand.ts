import {
  MessageEmbed
} from "discord.js";
import type {
  Message
} from "discord.js";
import {
  CommandConf
} from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "say",
  aliases: [],
  description: "say something",
  usage: "say <text>",
  cooldown: 3,
  ownerOnly: false
})

export default class sayCommand extends Command {
  public async exec(msg: Message, args: string[]) {

    let text = args.join(" ");
    if (!text) return msg.channel.send("well, you have to write something down")
    msg.delete()
    let embed = new MessageEmbed()
    .setDescription(text)
    .setColor(this.client.color)
    .setFooter("by " + msg.author?.tag, msg.author?.displayAvatarURL({
      dynamic: true, size: 2048, format: "png"
    }) as any)
    return msg.channel.send(embed)
  }
}