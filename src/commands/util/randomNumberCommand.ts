import { CommandConf } from "../../decorators";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
  name: "randomnumber",
  aliases: ["random-number", "number-generator"],
  description: "Get A Random Number\n• randomnumber [max]\n•default value: 50",
  usage: "randomnumber[max number (default is 50)",
  ownerOnly:false
})

 export default class randomNumber extends Command {
   public async exec(msg:Message, args:string[]) {

  let max = args[0];
  if(!max) max = (50).toString;
  if(isNaN(max)) {
     return msg.reply("**Max Must Be A Number**");
  }
  return msg.reply("I got the number\n"+this.client.util.randomNumber(1, max))
 }
}
