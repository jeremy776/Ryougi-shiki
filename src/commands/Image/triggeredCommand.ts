import { CommandConf } from "../handle/CommandConf";
import Command from "../../decorators";
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

export default TriggeredCommand extends Command {
  async exec(
