import { MessageEmbed } from 'discord.js';

export default {
  name: "ping",
  aliases: [],
  cooldown: 3,
  guildOnly: false,
  description: "show bot ping",
  execute(message, args, client) {
    const embed = new MessageEmbed()
        .addField("Pong!",  Math.round(client.ws.ping) + "ms", true)
        .setColor(client.color)
        .setTimestamp()
     message.channel.send(embed)
  }
};
