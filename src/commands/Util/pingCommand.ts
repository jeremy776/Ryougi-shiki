import { MessageEmbed } from 'discord.js';
import { CommandConf } from "../../decorators";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
    name: "ping",
    aliases: [],
    description: "bot ping",
    usage: "ping",
    cooldown: 2,
    ownerOnly: false
})

 export default class pingCommand extends Command {
   public async exec(message:Message, args:string[]) {

    const embed = new MessageEmbed()
        .addField("Pong!",  Math.round(this.client.ws.ping) + "ms", true)
        .setColor(this.client.color)
        .setTimestamp()
     message.channel.send(embed)
  }
};
