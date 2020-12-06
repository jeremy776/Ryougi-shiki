const animesf = require("sneckfetch");
import { MessageEmbed } from "discord.js";

export default {
  name: "anime",
  description: "get anime info maybe?",
  cooldown: 2,
  guildOnly:true,
  async execute(msg, args, client) {

  let res = await animesf.get("http://api.cutegirls.moe/json");
    if (res.body.status !== 200) {
      return message.channel.send("An error occurred while processing this command.");
    }
    let animepicembed = new MessageEmbed()
      .setColor(client.color)
      .setTitle("Anime Picture")
      .setImage(res.body.data.image)
      .setTimestamp()
      return msg.channel.send(animepicembed);
 }
}
