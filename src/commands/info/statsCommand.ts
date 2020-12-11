import { MessageEmbed } from "discord.js";
import * as os from 'os';
const Discord = require("discord.js");
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "stats",
  aliases: ["bot-stats", "bot-info"],
  description: "Get stats or information about bots",
  usage: "stats",
  cooldown: 1,
  ownerOnly:false
})

 export default class statsCommand extends Command {
   public async exec(msg:Message, args:[]) {

  let botInfo = new MessageEmbed()
  .setAuthor(`${this.client.user.username} Stats`, client.user.displayAvatarURL())
  .addField(`Developer`,
`\`\`\`
${this.client.config.owner.map(x => "• "+client.users.cache.get(x).tag)}
\`\`\``)
  .addField(`Bot Statsistic`,
`\`\`\`
• Commands     :: ${this.client.commands.size} Command's
• Channels     :: ${this.client.channels.cache.size.toLocaleString()}
• Servers      :: ${this.client.guilds.cache.size.toLocaleString()}
• Users        :: ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
\`\`\``)
  .addField(`Bot System`,
`\`\`\`
• Bot Version :: v${require("../../../package.json").version}
• Platform    :: ${os.platform}
• Node        :: ${process.version}
• Mem Usage   :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} mb
• CPU usage   :: ${this.client.util.cpu()}
• CPU         :: ${os.cpus().map(i => `${i.model}`)[0]}
• Uptime      :: ${this.client.util.parseDur(client.uptime)}\`\`\``)
  .setFooter(`This bot is still under development`)
  .setTimestamp()
  .setColor(client.color)
  return message.channel.send(botInfo)
 }
}
