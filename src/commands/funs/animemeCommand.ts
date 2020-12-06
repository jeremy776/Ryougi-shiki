import { MessageEmbed } from "discord.js";
conat randomPuppy = require("random-puppy");

export default {
  name: "animeme",
  aliases: ["animemes", "meme-anime", "anime-meme"],
  description: "maybe get anime meme 🤔",
  cooldown:2,
  guildOnly:true,
  execute(msg, args, client) {

  randomPuppy('animemes')
    .then(url => {
        const embed = new MessageEmbed()
        .setImage(url)
        .setTitle("ANIME MEME'S")
        .setColor(client.color)
        .setTimestamp()
     return message.channel.send({ embed })
    });

 }
}
