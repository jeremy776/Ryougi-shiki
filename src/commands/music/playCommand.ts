import { MessageEmbed } from "discord.js";

export default {
  name: "play",
  aliases: ["p"],
  cooldown:3,
  guildOnly:true,
  description: "playing music maybe?",
  execute(msg, args, client) {

  let noInVoice = new MessageEmbed()
  .setDescription("**You must be on a voice channel**")
  .setColor(client.color)
  .setTimetsamp()
  if(!msg.member.voice.channel) return msg.channel.send(noInVoice);

  let noResult = new MessageEmbed()
  .setDescription("**Provide the name or url of the video to be played**")
  .setColor(client.color)
  .setTimetsamp()
  if(!args) return msg.channel.send(noResult)

  client.player.play(msg, args.join(" "))
 }
}
