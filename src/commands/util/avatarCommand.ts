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
    if(!userFind) userFind = message.author.username;

    if(typeof userFind == 'string') {
       let a = client.users.cache.find(x => x.username == userFind)
       let wrongUsername = new MessageEmbed()
       .setDescription(`**The name you wrote was not detected**`)
       .setColor(client.color)
       if(a == undefined || isNaN(userFind)) return message.channel.send(wrongUsername)
       user = a;
    }
    if(!isNaN(userFind)) {
       let b = client.users.cache.find(x => x.id == userFind)
       let wrongId = new MessageEmbed()
       .setDescription(`**The user id that you wrote is invalid or not detected by me**`)
       .setColor(client.color)
       if(b == undefined) return message.channel.send(wrongId)
       user = b;
    }
  }


  let avatar = new MessageEmbed()
  .setColor(client.color)
  .setImage(user.displayAvatarURL({dynamic:true, size:2048}))
  .setAuthor(`Avatar from ${user.tag}`)
  return message.channel.send(avatar)

  }
 }
