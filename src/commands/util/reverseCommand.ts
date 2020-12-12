import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
   name: "reverse",
   aliases: ["reversed"],
   cooldown:1,
   description: "just reverse the writing",
   usage: "reverse [text]",
   ownerOnly:false
})

 export default class reverseCommand extends Command {
   public async exec(msg:Message, args:string[] || null) {
   try {
    args = args.join(" ") || "None";
    let reversed = "";
    for (let i = args.length - 1; i >= 0; i--) {
      reversed += args[i];
    }
    return msg.channel.send(reversed);
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }
 }
}
