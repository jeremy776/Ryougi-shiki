import { MessageEmbed } from "discord.js";
const randomPuppy = require("random-puppy");
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
 name: "meme",
 aliases: [],
 description: "looking at memes to make you laugh 😀",
 usage: "meme",
 cooldown: 1,
 ownerOnly:false
})

 export default class memeCommand extends Command {
  public async exec(msg:Message, args:string[]) {

  const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
    .setImage(img)
    .setColor(client.color)
    .setURL(`https://reddit.com/r/${random}`)
    .setTimestamp();
    return msg.channel.send(embed)
 }
}
