import { MessageEmbed } from "discord.js";

export default {
  name: "stats",
  aliases: ["bot-stats"],
  cooldown: 3,
  guildOnly: true,
  description: "Get stats or information about bots",
  execute(message, args, client) {

  let botInfo = new MessageEmbed()
  .setAuthor(`${client.user.username} Stats`, client.user.displayAvatarURL())
  .addField("Developer", `**- \`${client.users.cache.get(client.config.owner.join(" ")).tag}\`**`)
  .addField("Statistic Bot", `**- \`Users\`: ${client.users.cache.size}**`)
  .setColor(client.color)

  return message.channel.send(botInfo)

 }
}
