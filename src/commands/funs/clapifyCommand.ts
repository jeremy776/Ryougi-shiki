import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command form "../../handle/Command";

@CommandConf({
   name: 'clapify',
   aliases:[],
   description: '👏clapify👏text👏',
   usage: 'clapify text here',
   cooldown:2,
   ownerOnly:false
})

export default class clapifyCommand extends Command {
   public async exec(msg: Message, args: string[]) {
   try {
    args = args.join(" ") || "Input Text";
    args = args.replace(/ /g, "👏");
    args += "👏";
    return msg.channel.send(`👏${args}`);
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }
 }
}
