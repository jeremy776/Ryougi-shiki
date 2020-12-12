import { MessageEmbed } from 'discord.js';
import { CommandConf } from "../../decorators";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
  name: "ping",
  aliases: [],
  cooldown: 3,
  ownerOnly:false,
  description: "show bot ping",
  usage: ""
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
