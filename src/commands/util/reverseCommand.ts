import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
    name: "reverse",
    aliases: [],
    description: "reverse the text you type",
    usage: "reverse <text>",
    cooldown: 3,
    ownerOnly: false
})

 export default class reverseCommand extends Command {
   public async exec(msg:Message, args:string[]) {
   try {
    let kata = args.join(" ") || "None";
    let reversed = "";
    for (let i = kata.length - 1; i >= 0; i--) {
      reversed += kata[i];
    }
    return msg.channel.send(reversed);
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }
 }
}
