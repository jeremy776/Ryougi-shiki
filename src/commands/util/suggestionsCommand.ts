import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
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
  .setDescription(`**${this.description}**`)
  if(!suggest) return msg.channel.send(noMsg)

  let embed = new MessageEmbed()
  .setAuthor("New Suggestion", msg.guild.iconURL({dynamic:true}))
  .setThumbnail(msg.author.displayAvatarURL({dynamic:true}))
  .setColor(this.client.color)
  .addField("Guild Info", `
\`\`\`
• Name  :: ${msg.guild.name}
• Id    :: ${msg.guild.id}
\`\`\``)
   .addField("Suggestion", `
\`\`\`
• Author  :: ${msg.author.tag}
  - Id    :: ${msg.author.id}
• Message :: ${suggest}
\`\`\``)
   msg.channel.send({embed:{description:"**Thanks For Give Suggestion:)**", color: this.client.color}})
   return this.client.channels.cache.get(client.config.suggestion).send(embed)
 }
}
