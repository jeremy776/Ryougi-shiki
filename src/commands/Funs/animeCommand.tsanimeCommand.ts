const animesf = require("axios");
import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: 'anime',
  aliases:[],
  description:'get random anime image',
  usage:'anime',
  cooldown:2,
  ownerOnly:false
})

export default class animeCommand extends Command {
  public async exec(msg: Message, args: string[]) {

  let res = await animesf.get("http://api.cutegirls.moe/json");
    if (res.data.status !== 200) {
      return msg.reply("An error occurred while processing this command.");
    }
    let animepicembed = new MessageEmbed()
      .setColor(this.client.color)
      .setTitle("Anime Picture")
      .setImage(res.data.data.image)
      .setTimestamp()
      return msg.channel.send(animepicembed);
 }
}
