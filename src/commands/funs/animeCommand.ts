const animesf = require("axios");
import { MessageEmbed } from "discord.js";

export default {
  name: "anime",
  description: "get random anime maybe?",
  cooldown: 2,
  guildOnly:true,
  async execute(msg, args, client) {

  let res = await animesf.get("http://api.cutegirls.moe/json");
    if (res.data.status !== 200) {
      return msg.reply("An error occurred while processing this command.");
    }
    let animepicembed = new MessageEmbed()
      .setColor(client.color)
      .setTitle("Anime Picture")
      .setImage(res.data.data.image)
      .setTimestamp()
      return msg.channel.send(animepicembed);
 }
}
