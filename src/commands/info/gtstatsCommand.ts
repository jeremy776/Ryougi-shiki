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
  let res = axios.get(baseURL).then(x => x.data)
  let wotd = res.world_day_images.fullsize //.replace("https:\/\/www.growtopiagame.com\/worlds\/", "").replace(".png", "");

  let embed = new MessageEmbed()
  .setTitle("Growtopia Statistic")
  .addField("Online User's", res.online_user + " users")
  .addField("World Of The Day", wotd)
  .setImage(res.world_day_images.fullsize)
  .setColor(client.color);
  return msg.channel.send(embed)
 }
}
