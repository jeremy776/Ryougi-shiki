import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "say",
  cooldown:2,
  ownerOnly:false,
  description: "say something!",
  usage: "say [text]"
})

 export default class sayCommand extends Command {
   public async exec(msg:Message, args:string[]) {
    
    let text = args.join(" ");
    if(!text) return msg.channel.send(".... :(")
    msg.delete()
    return msg.channel.send(text, { disableMentions:'everyone' })
  }
}
