import { MessageEmbed } from "discord.js";

export default {
  name: "avatar",
  aliases: ["av"],
  cooldown: 2,
  description: "Get the user avatar that is mentioned",
  execute(message, args, client) {

  let nameUser = args[0];
  let user = message.mentions.users.first();
  if(!user) user = nameUser;
  
  if(typeof nameUser == 'string') {
   let username = client.users.cache.find(x => x.name == nameUser)

   let wrongUserName = new MessageEmbed()
   .setColor(client.color)
   .setDescription(`**The name of the person you wrote is wrong**`)
   if(!user) return message.channel.send(wrongUserName)

   user = username;
  }


  let avatar = new MessageEmbed()
  .setColor(client.color)
  .setImage(user.displayAvatarURL({dynamic:true}))
  .setAuthor(`Avatar from **\`${user.tag}\`**`)
  return message.channel.send(avatar)

  }
 }
