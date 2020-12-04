import { MessageEmbed } from "discord.js";
import * as os from 'os';
const Discord = require("discord.js");

export default {
  name: "stats",
  aliases: ["bot-stats", "bot-info"],
  cooldown: 3,
  guildOnly: true,
  description: "Get stats or information about bots",
  execute(message, args, client) {

  let botInfo = new MessageEmbed()
  .setAuthor(`${client.user.username} Stats`, client.user.displayAvatarURL())
  .addField(`Developer`,
`\`\`\`
- ${client.users.cache.get(client.config.owner.join(" ")).tag}
\`\`\``)
  .addField(`Bot Statsistic`,
`\`\`\`
- Channels     :: ${client.channels.cache.size.toLocaleString()}
- Servers      :: ${client.guilds.cache.size.toLocaleString()}
- Users        :: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
\`\`\``)
  .addField(`Bot System`,
`\`\`\`
- CPU         :: ${os.cpus().map(i => `${i.model}`)[0]}
- Bot Version :: v${require("../../../package.json").version}
- Platform    :: ${os.platform}
- Node        :: ${process.version}
- Mem Usage   :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} mb
- CPU usage   :: ${client.util.cpu()}
- Uptime      :: ${client.util.parseDur(client.uptime)}\`\`\``)
  .setFooter(`This bot is still under development`)
  .setTimestamp()
  .setColor(client.color)

  return message.channel.send(botInfo)

 }
}
