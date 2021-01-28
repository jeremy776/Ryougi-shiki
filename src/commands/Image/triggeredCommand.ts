import Command from "../handle/command";
import { CommandConf } from "../../decorators";
import { MessageEmbed, MessageAttachment } from "discord.js";
import type { Message } from "discord.js";

@CommandConf({
 name: "triggered",
 aliases: [],
 description: "None",
 usage: "triggered [ @user || user id ]",
 cooldown:3,
 ownerOnly:false
})

export default class TriggeredCommand extends Command {
  public async exec(message: Message, args:string[]) {

  let user = message.mentions?.users.first() || this.client.users.cache.get(args[0]).catch(() => null);
  if(!user) {
    user = message.author;
  }

  let img = await this.client


 }
}