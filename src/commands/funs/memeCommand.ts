import { MessageEmbed } from "discord.js";
const randomPuppy = require("random-puppy");

export default {
  name: "meme",
  aliases: ["memes"],
  description: "maybe meme?",
  cooldown: 1,
  async execute(msg, args, client) => {

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
