import { MessageEmbed } from "discord.js";

export default {
  name: "avatar",
  aliases: ["av"],
  cooldown: 2,
  description: "Get the user avatar that is mentioned",
  execute(message, args, client) {

  let user = message.mentions.users.first();
  if(!user) {
    let userFind = args[0];
    if(!userFind) userFind = message.author.id;

    if(typeof userFind == 'string') {
       user = client.users.cache.find(x => x.username == userFind)
    }
    if(typeof userFind === 'number') {
       user = client.users.cache.find(x => x.id == userFind)
    }
  }


  let avatar = new MessageEmbed()
  .setColor(client.color)
  .setImage(user.displayAvatarURL({dynamic:true}))
  .setAuthor(`Avatar from **\`${user.tag}\`**`)
  return message.channel.send(avatar)

  }
 }
