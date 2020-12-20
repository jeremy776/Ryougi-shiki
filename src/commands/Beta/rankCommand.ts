import { MessageAttachment } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";
const canvacord = require("canvacord");

@CommandConf({
  name: "rank",
  aliases:[],
  description: "check rank",
  usage: "rank [@member",
  cooldown: 2,
  ownerOnly:false
})

 export default class rankCommand extends Command {
   public async exec(msg:Message, args:string[]) {

   let user = msg.mentions.users?.first() || msg.author;

   let canvas = new canvacord.Rank()
   .setUsername(user.username)
   .setDiscriminator(user.discriminator)
   .setRank("1")
   .setLevel("43")
   .setCurrentXP("300")
   .setRequiredXP("500")
   .setAvatar(user.displayAvatarURL({size:1024, format:"png"}) as any)

   const gambar = await canvas.build()
   return msg.channel.send(new MessageAttachment(gambar, "rankCard.png"))
 }
}
