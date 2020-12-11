import { MessageEmbed } from "discord.js";
const randomPuppy = require("random-puppy");
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: 'animeme',
  aliases:['animemes', 'meme-anime', 'anime-meme'],
  description: 'maybe get anime meme :/',
  usage: 'animememe',
  cooldown:2,
  ownerOnly:false
})

export default class animemeCommand extends Command {
  public async exec(msg: Message, args: string[]) {

randomPuppy('animemes')
  .then(url => {
      const embed = new MessageEmbed()
      .setImage(url)
      .setTitle("ANIME MEME'S")
      .setColor(this.client.color)
      .setTimestamp()
   return msg.channel.send({ embed })
  });
 }
}
