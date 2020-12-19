import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "rewards",
  aliases: ["reward"],
  description: "see reward if you are active frequently",
  usage: "rewards",
  cooldown: 2,
  ownerOnly:true
})

 export default class rewardsCommand extends {
   public async exec(msg:Message, args:string[]) {

   let data = await this.client.db.get(`levelreward.${msg.guild?.id}`);
   if(!data) return msg.reply("**This server has not set the reward level**");

   let embed = new MessageEmbed()
   .setColor(this.client.color)
   .setTimestamp()
   .setAuthor(`Reward's for ${msg.guild?.name}`)
   .setDescription(data.map((x:any) => `Level **${x.theLevel}** :: ${msg.guild?.roles.cache.get(x.roleId)}`))
   return msg.channel.send(embed)
 }
}
