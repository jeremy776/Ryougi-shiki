import { MessageEmbed } from "discord.js";
const axios = require("axios");
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
 name: "gtstats",
 aliases: ["gt-info", "stats-gt", "growtopia"],
 description: "see the stats of the growtopia game",
 usage: "gtstats",
 cooldown: 1,
 ownerOnly:false
})

 export default class gtstatsCommand extends Command {
  public async exec(msg:Message, args:string[]) {

  let baseURL = "https://www.growtopiagame.com/detail";
  let res = axios.get(baseURL).then((x:any) => {
  let wotd = x.data.world_day_images.full_size.replace("https:\/\/www.growtopiagame.com\/worlds\/", "").replace(".png", "");
  let embed = new MessageEmbed()
  .setTitle("Growtopia Statistic")
  .addField("Online User's", x.data.online_user + " users")
  .addField("World Of The Day", wotd.toUpperCase())
  .setImage(x.data.world_day_images.full_size)
  .setColor(this.client.color)
  .setTimestamp();
  return msg.channel.send(embed)
  });
 };
};
