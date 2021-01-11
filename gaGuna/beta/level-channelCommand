import { CommandConf } from "../../decorators";
import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
  name: "level-channel",
  aliases: ["levelchannel", "channel-level"],
  description: "When level up, message from the bot will be sent to the channel that has been set",
  usage: "level-channel <#channel>",
  cooldown: 1,
  ownerOnly:true
})

 export default class LevelChannel extends Command {
   public async exec(msg:Message, args:string[]) {

   let channel = msg.mentions.channels?.first()
   if(!channel) return msg.reply("**You must mention the channel**");

   let embed = new MessageEmbed()
   .setColor(this.client.color)
   .setTimestamp()

   let data = await this.client.db.get(`level-status.${msg.guild?.id}`)
   if(!data) {
     embed.setDescription("**You have successfully set up the channel**")
     embed.setFooter("New Database Created")

     this.client.db.set(`level-status.${msg.guild?.id}`, {
       status: false,
       message: null,
       channel: channel.id
     });
    }

   if(data) {
     embed.setDescription("**You have succesfully set up the channel**")
     embed.setFooter("Database has been updated")

     this.client.db.set(`level-status.${msg.guild?.id}`, {
       status: data.status,
       message: data.message,
       channel: channel.id
      })
    }

   return msg.channel.send(embed)

 }
}
