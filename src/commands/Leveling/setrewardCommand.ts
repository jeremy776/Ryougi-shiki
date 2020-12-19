import { CommandConf } from "../../decorators";
import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
  name: "setreward",
  aliases: [],
  description: "Set reward when the member gets the level that has been set and will get a role",
  usage: "setreward <level> <roles>",
  cooldown: 3,
  ownerOnly:true
})

 export default class setrewardCommand extends Command {
   public async exec(msg:Message, args:string[]) {


 }
}
