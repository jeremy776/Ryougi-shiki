import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

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
    let kata = args.join(" ") || "Input Text";
    let katanya = args.replace(/ /g, "👏");
    katanya += "👏";
    return msg.channel.send(`👏${katanya}`);
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }
 }
}
