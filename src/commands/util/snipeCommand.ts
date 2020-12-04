import { MessageEmbed } from "discord.js";

export default {
  name: "snipe",
  cooldown: 3,
  description: "Get messages that have been deleted before",
  guildOnly:true,
  execute(msg, args, client) {

  let data = client.snipe.get(msg.channel.id);
  let noData = new MessageEmbed()
  .setDescription("**There are no messages deleted on this channel**")
  .setColor(client.color)
  .setTimestamp()
  if(!data) return msg.channel.send(noData).then(x => x.delete({timeout:4000}));

  let succes = new MessageEmbed()
  .setAuthor(data.author.tag, data.author.displayAvatarURL({dynamic:true}))
  .setColor(client.color)
  .setTimestamp()
  if(data.content) succes.setDescription(data.content)
  return msg.channel.send(succes);

 }
}
