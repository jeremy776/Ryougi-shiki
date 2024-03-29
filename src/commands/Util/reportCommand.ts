import { MessageEmbed } from "discord.js";
import { CommandConf } from "../../decorators";
import type { Message, TextChannel } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
    name: "report",
    aliases: ["bug"],
    description: "if you found bug",
    usage: "report [message]",
    cooldown: 60,
    ownerOnly: false
})

 export default class reportCommand extends Command {
   public async exec(msg:Message, args:string[]) {

  let pesan = args.join(" ")
  let msgChannel = msg.channel as TextChannel;

  let invalidMsg = new MessageEmbed()
  .setDescription("**Enter any bugs you find in our bots**")
  .setColor(this.client.color)
  .setTimestamp()
  .setFooter(`ex: ${this.client.config.prefix}report [bug]`)
  if(!pesan) return msg.channel.send(invalidMsg)

  /*if(typeof pesan !== "string") {
    let notAstring = new MessageEmbed()
    .setDescription("**the message you enter must be a string**")
    .setColor(this.client.color)
    .setTimestamp()
    return msg.channel.send(notAstring)
  }

  if(pesan.length < 5) {
    let shortMessage = new MessageEmbed()
    .setDescription("**Your message is too short**")
    .setColor(this.client.color)
    .setTimestamp()
    return msg.channel.send(shortMessage)
  }*/

  let Succes = new MessageEmbed()
  .setDescription("**Your report has been successfully sent to our developer**")
  .setColor(this.client.color)
  .setTimestamp()
  msg.channel.send(Succes)

  let reportChannels = new MessageEmbed()
  .setAuthor(`New Report by ${msg.author?.tag}`, msg.guild?.iconURL({dynamic:true}) as any)
  .setThumbnail(msg.author.displayAvatarURL({dynamic:true}) as any)
  .setColor(this.client.color)
  .setTimestamp()
  .addField("Author", `\`\`\`
Name          :: ${msg.author?.username}
Id            :: ${msg.author?.id}
Discriminator :: #${msg.author?.discriminator}
\`\`\``)
   .addField("Bug Info", `\`\`\`
Server     :: ${msg.guild?.name}
Server Id  :: ${msg.guild?.id}
Channel    :: ${msgChannel.name}

Bug Report :: ${pesan}
\`\`\``)

    if(msg.attachments.first()) reportChannels.setImage(msg.attachments.first()?.proxyURL as any);

   let channel = this.client.channels.cache.get(this.client.config.reportChannel) as TextChannel;
   return channel.send(reportChannels)

 }
}
