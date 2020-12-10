import { MessageEmbed } from "discord.js";

export default {
  name: "clyde",
  cooldown:2,
  description: "cLyDe",
  guildOnly:true,
  execute(msg, args, client) {

  let kata = args.join(" ")
  if(!kata) kata = "Connecting....";

  let embed = new MessageEmbed()
  .setImage(`https://ctk-api.herokuapp.com/clyde/${kata}`)
  .setColor(client.color)
  .setFooter("Reply "+ msg.author.tag)
  .setTimestamp()
  return msg.channel.send(embed)

 }
}
