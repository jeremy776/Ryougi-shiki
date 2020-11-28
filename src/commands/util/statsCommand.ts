import { MessageEmbed } from "discord.js";
import * as os from 'os';
const Discord = require("discord.js");

export default {
  name: "stats",
  aliases: ["bot-stats"],
  cooldown: 3,
  guildOnly: true,
  description: "Get stats or information about bots",
  execute(message, args, client) {

  let botInfo = new MessageEmbed()
  .setAuthor(`${client.user.username} Stats`, client.user.displayAvatarURL())
  .setDescription(`
**Developer**
\`\`\`
- ${client.users.cache.get(client.config.owner.join(" ")).tag}
\`\`\`
**Bot Statsistic**
\`\`\`
Channels     :: ${client.channels.cache.size.toLocaleString()}
Servers      :: ${client.guilds.cache.size.toLocaleString()}
Users        :: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
\`\`\`
**Bot System**
\`\`\`
CPU         :: ${os.cpus().map(i => `${i.model}`)[0]}
Discord.js  :: v${Discord.version}
Platform    :: ${os.platform}
Node        :: ${process.version}
Mem Usage   :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} mb
CPU usage   :: ${client.util.cpu()}
Uptime      :: ${client.util.parseDur(client.uptime)}\`\`\``)

  .setColor(client.color)

  return message.channel.send(botInfo)

 }
}
