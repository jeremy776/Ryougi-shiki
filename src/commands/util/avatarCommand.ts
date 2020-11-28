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
        .setDescription(`\`The name you wrote was not detected\nOr is this what you mean?\`\n\n**${test.map(x => "• "+client.users.cache.get(x).tag).join("\n")}**`)
        .setColor(client.color)
        return message.channel.send(wrongUsername).then(x => {
        test.map((a, i) => x.react(emote[i])
        });

      const filter = (reaction, user) => user.id !== client.user.id;
      let collector = m.createReactionCollector(filter)  
      collector.on("collect", (reaction, user) => {


      switch(reaction.emoji.name){
       case "1️⃣":
         return message.channel.send({embed:{color:client.color,image:user.displayAvatarURL(),author:user.username}});
       break;
         }
        }
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
