import { MessageEmbed } from "discord.js";

export default {
  name: "avatar",
  aliases: ["av"],
  cooldown: 2,
  description: "Get the user avatar that is mentioned",
  execute: async(message, args, client) => {

  let user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null)

  if(!user) {
    let userFind = args[0];
    if(!userFind) userFind = message.author.username;

       let a = client.users.cache.find(x => x.username == userFind)

       if(a == undefined) {

        let test = message.guild.members.cache.filter(x => client.users.cache.get(x.id).username.toLowerCase().includes(userFind.toLowerCase())).keyArray();

        let wrongUsername = new MessageEmbed()
        .setDescription(`\`The name you wrote was not detected\nOr is this what you mean?\`\n\n**${test.map(x => "• "+client.users.cache.get(x).tag).join("\n")}**`)
        .setColor(client.color)
        return message.channel.send(wrongUsername)
       }
       user = a;
  }


  let avatar = new MessageEmbed()
  .setColor(client.color)
  .setImage(user.displayAvatarURL({dynamic:true, size:2048}))
  .setAuthor(`Avatar from ${user.tag}`)
  return message.channel.send(avatar)

  }
 }
