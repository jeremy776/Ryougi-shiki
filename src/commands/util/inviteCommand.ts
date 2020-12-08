import { MessageEmbed } from "discord.js";

export default {
  name: "invite",
  cooldown:1,
  description: "invite me pls :)",
  execute(msg, args, client) {

  let embed = new MessageEmbed()
  .setDescription("**Thank you for using our bot, and below is a link to invite me:)**")
  .setColor(client.color)
  .setTimestamp()
  .addField("🗒️ | Invite", `[Click Here](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
  return msg.channel.send(embed);
 }
}
