import { MessageEmbed } from "discord.js";

export default {
  name: "report",
  aliases: ["bug"],
  guildOnly: true,
  cooldown: 10,
  description: "if you find a bug, you can use the report to our staff",
  execute(msg, args, client) {

  let pesan = args[0].join(" ")
  let invalid-msg = new MessageEmbed()
  .setDescription("**Enter any bugs you find in our bots**")
  .setColor(client.color)
  .setTimestamp()
  .setFooter(`ex: ${client.config.prefix}report [bug]`)
  if(!pesan) return msg.channel.send(invalid-msg)

  if(typeof pesan !== "string") {
    let notAstring = new MessageEmbed()
    .setDescription("**the message you enter must be a string**")
    .setColor(client.color)
    .setTimestamp()
    return msg.channel.send(notAstring)
  }

  if(pesan.length < 5) {
    let shortMessage = new MessageEmbed()
    .setDescription("**Your message is too short**")
    .setColor(client.color)
    .setTimestamp()
    return msg.channel.send(shortMessage)
  }

  let Succes = new MessageEmbed()
  .setDescription("**Your report has been successfully sent to our developer**")
  .setColor(client.color)
  .setTimestamp()
  return msg.channel.send(Succes)

  let reportChannel = new MessageEmbed()
  .setAuthor(`New Report by ${msg.author.tag}`, msg.guild.iconURL({dynamic:true}))
  .setThumbnail(msg.author.displayAvatarURL({dynamic:true}))
  .setColor(client.color)
  .setTimestamp()
  .addField("Author", `\`\`\`
Name          :: ${msg.author.username}
Id            :: ${msg.author.id}
Discriminator :: #${msg.author.discriminator}
\`\`\``)
   .addField("Bug Info", `\`\`\`
Server     :: ${msg.guild.name}
Server Id  :: ${msg.guild.id}
Channel    :: ${msg.channel.name}

Bug Report :: ${pesan}
\`\`\``)
   client.channels.cache.get(client.config.channel-report).send(reportChannel)

 }
}
