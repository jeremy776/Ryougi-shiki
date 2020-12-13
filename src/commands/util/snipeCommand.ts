import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "snipe",
  cooldown: 3,
  description: "Get messages that have been deleted before",
  ownerOnly:false,
  usage: "snipe [#channel]"
})

 export default class snipeCommand extends Command {
   public async exec(msg:Message, args:string[]) {

  let channel = msg.mentions.channels.first() || msg.channel
  let data = this.client.snipe.get(channel.id);
  let noData = new MessageEmbed()
  .setDescription("**There are no messages deleted on this channel**")
  .setColor(this.client.color)
  .setTimestamp()
  if(!data) return msg.channel.send(noData).then(x => x.delete({timeout:4000}));

  if(data.embeds[0]) {
   let embed = data.embeds[0];
   let embedMessage = new MessageEmbed()
   .setAuthor(data.author.tag, data.author.displayAvatarURL({dynamic:true}))
   if(embed.description) embedMessage.setDescription(embed.description)
   if(embed.color) embedMessage.setColor(embed.color)
   if(embed.image) embedMessage.setImage(embed.image.url)
   //if(embed.thumbnail) embedMessage.setThumbnail(embed.thumbnail)
   if(embed.fields.length > 0) {
      embed.fields.map((x:any) => embedMessage.addField(x.name, x.value))
   }
   return msg.channel.send(embedMessage)
  }

  let succes = new MessageEmbed()
  .setAuthor(data.author.tag, data.author.displayAvatarURL({dynamic:true}))
  .setColor(this.client.color)
  .setTimestamp()
  //if(Array.from(data?.attachments).length > 0) succes.setImage(Array.from(data?.attachments)[0][1].proxyURL)
  if(data.content) succes.setDescription(data.content)
  return msg.channel.send(succes);

 }
}
