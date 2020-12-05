import { MessageEmbed } from "discord.js";

export default {
  name: "suggestions",
  aliases: ["suggestion", "suggest"],
  cooldown:60,
  description: "give me your suggestion for next update!",
  execute(msg, args, client) {

  let suggest = args.join(" ");
  let noMsg = new MessageEmbed()
  .setColor(client.color)
  .setDescription(`**${this.description}**`)
  if(!suggest) return msg.channel.send(noMsg)

  let embed = new MessageEmbed()
  .setAuthor("New Suggestion", msg.guild.iconURL({dynamic:true}))
  .setThumbnail(msg.author.displayAvatarURL({dynamic:true}))
  .setColor(client.color)
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
   msg.channel.send({embed:{description:"**Thanks For Give Suggestion:)**", color: client.color}})
   return client.channels.cache.get(client.config.suggestion).send(embed)
 }
}
