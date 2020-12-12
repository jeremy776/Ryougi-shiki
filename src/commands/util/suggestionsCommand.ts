import { MessageEmbed } from "discord.js";
import type { Message, TextChannel } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "suggestions",
  aliases: ["suggestion", "suggest"],
  cooldown:60,
  description: "give me your suggestion for next update!",
  ownerOnly:false,
  usage: "suggestion [message]"
})

 export default class suggestionsCommand extends Command {
   public async exec(msg:Message, args:string[]) {

  let suggest = args.join(" ");
  let noMsg = new MessageEmbed()
  .setColor(this.client.color)
  .setDescription(`**give me your suggestion for next update!**`)
  if(!suggest) return msg.channel.send(noMsg)

  let embed = new MessageEmbed()
  .setAuthor("New Suggestion", msg.guild?.iconURL({dynamic:true}) as any)
  .setThumbnail(msg.author.displayAvatarURL({dynamic:true}) as any)
  .setColor(this.client.color)
  .addField("Guild Info", `
\`\`\`
• Name  :: ${msg.guild?.name}
• Id    :: ${msg.guild?.id}
\`\`\``)
   .addField("Suggestion", `
\`\`\`
• Author  :: ${msg.author.tag}
  - Id    :: ${msg.author.id}
• Message :: ${suggest}
\`\`\``)
   msg.channel.send({embed:{description:"**Thanks For Give Suggestion:)**", color: this.client.color}})
   let channel = this.client.channels.cache.get(this.client.config.suggestion) as TextChannel
   return channel.send(embed)
 }
}
