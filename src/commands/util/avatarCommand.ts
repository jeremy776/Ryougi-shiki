import { MessageEmbed } from "discord.js";
const emote = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]

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
        .setDescription(`\`The name you wrote was not detected\nOr is this what you mean?\`\n\n**${test.slice(0, 6).map(x => "• "+client.users.cache.get(x).tag).join("\n")}**`)
        .setColor(client.color)
        let x = await message.channel.send(wrongUsername);

        test.map((a, i) => x.react(emote[i]))

      const filter = (reaction, user) => user.id !== client.user.id;
      let collector = x.createReactionCollector(filter, {
         time: 5000
       })  
      collector.on("collect", (reaction, users) => {

      switch(reaction.emoji.name){
       case "1️⃣":
         reaction.users.remove(users);

         let userNya1 = test[0];
         let userNya = client.users.cache.get(userNya1);
         let test1 = new MessageEmbed()
         .setColor(client.color)
         .setImage(userNya.displayAvatarURL({dynamic:true, size:2048}))
         .setAuthor(`Avatar from ${userNya.tag}`)
         return message.channel.send(test1);
       break;
       case "2️⃣":
         reaction.users.remove(users);

         let userNya1 = test[1];
         let userNya = client.users.cache.get(userNya1);
         let test1 = new MessageEmbed()
         .setColor(client.color)
         .setImage(userNya.displayAvatarURL({dynamic:true, size:2048}))
         .setAuthor(`Avatar from ${userNya.tag}`)
         return message.channel.send(test1);
       break;
       case "3️⃣":
         reaction.users.remove(users);

         let userNya1 = test[2];
         let userNya = client.users.cache.get(userNya1);
         let test1 = new MessageEmbed()
         .setColor(client.color)
         .setImage(userNya.displayAvatarURL({dynamic:true, size:2048}))
         .setAuthor(`Avatar from ${userNya.tag}`)
         return message.channel.send(test1);
       break;
       case "4️⃣":
         reaction.users.remove(users);

         let userNya1 = test[3];
         let userNya = client.users.cache.get(userNya1);
         let test1 = new MessageEmbed()
         .setColor(client.color)
         .setImage(userNya.displayAvatarURL({dynamic:true, size:2048}))
         .setAuthor(`Avatar from ${userNya.tag}`)
         return message.channel.send(test1);
       break;
       case "5️⃣":
         reaction.users.remove(users);

         let userNya1 = test[4];
         let userNya = client.users.cache.get(userNya1);
         let test1 = new MessageEmbed()
         .setColor(client.color)
         .setImage(userNya.displayAvatarURL({dynamic:true, size:2048}))
         .setAuthor(`Avatar from ${userNya.tag}`)
         return message.channel.send(test1);
       break;
         }
        })
       };
       user = a;
  }


  let avatar = new MessageEmbed()
  .setColor(client.color)
  .setImage(user.displayAvatarURL({dynamic:true, size:2048}))
  .setAuthor(`Avatar from ${user.tag}`)
  return message.channel.send(avatar)

  }
 }
