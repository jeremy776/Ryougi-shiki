import { MessageEmbed } from "discord.js";
const axios = require("axios");

export default {
  name: "gtstats",
  aliases: ["statsgt", "gt-stats", "growtopia-stats"],
  description: "stats about growtopia",
  cooldown: 1,
  guildOnly:true,
  async execute(msg, args, client) {

  let baseURL = "https://www.growtopiagame.com/detail";
  let res = await axios.get(baseURL);
  let wotd = res.data.world_day_images.fullsize //.replace("https:\/\/www.growtopiagame.com\/worlds\/", "").replace(".png", "");

  let embed = new MessageEmbed()
  .setTitle("Growtopia Statistic")
  .addField("Online User's", res.data.online_user + " users")
  .addField("World Of The Day", wotd)
  .setImage(res.data.world_day_images.fullsize)
  .setColor(client.color);
  return msg.channel.send(embed)
 }
}
