import type {
  Message
} from "discord.js";
import {
  CommandConf
} from "../../decorators";
import {
  MessageEmbed
} from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
  name: "choose",
  usage: "choose [me | they | he ]",
  cooldown: 2,
  aliases: [],
  description: "the bot will select the random that was created, use | to make it into 2 choices",
  ownerOnly: false
})

export default class ChooseCommand extends Command {
  public async exec(message: Message, args: string[]) {

    let filtered = args.join(" ").replace(/@everyone/g, "everyone").replace(/@here/g, "here");
    let selection = filtered.split(" | ");
    if (!filtered) {
      return message.reply(`Try using it like this for an example:\n\`${this.client.config.prefix}choose buy android | buy a car | buy a motorbike\``);
    }

    let random1 = Math.floor(Math.random() * selection.length);
    let embed = new MessageEmbed()
    .setDescription(selection[random1])
    .setTitle("I choose")
    .setColor(this.client.color)
    return message.reply(embed)
  }
}