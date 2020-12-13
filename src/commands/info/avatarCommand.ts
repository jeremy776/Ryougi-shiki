import { MessageEmbed } from "discord.js";
const emote = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "🚫"]
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
 name: "avatar",
 aliases: [],
 description: "see the avatar of the user mentioned",
 usage: "avatar [ @user || username || username#tag ]",
 cooldown:1,
 ownerOnly:false
})

 export default class avatarCommand extends Command {
  public async exec(message: Message, args:string[]) {

  try{

  let user = message.mentions.users?.first() || await this.client.users?.fetch(args[0]).catch(() => null)

  if(!user) {
    let userFind = args[0];
    if(!userFind) userFind = message.author?.username;

       let a = this.client.users?.cache.find(x => x.username == userFind) || this.client.users?.cache.find(x => x.tag.toLowerCase() == userFind.toLowerCase())

       if(a == undefined) {

        let test = message.guild?.members?.cache.filter(x => this.client.users?.cache.get(x.id).tag.toLowerCase().includes(userFind.toLowerCase())).keyArray();
        let testy = test.slice(0, 5).map(n => n);

        let wrongUsername = new MessageEmbed()
        .setDescription(`\`The name you wrote was not detected\nOr is this what you mean?\`\n\n**${test.slice(0, 5).map(x => "• "+this.client.users.cache.get(x).tag).join("\n")}**`)
        .setColor(this.client.color)
        let x = await message.channel.send(wrongUsername);

        testy.map((a, i) => x.react(emote[i]))
        x.react(emote[5])

      const filter = (reaction, user) => user.id == message.author.id;
      let collector = x.createReactionCollector(filter, {
         time: 20000,
         max:1
       })  
      collector.on("collect", (reaction, users) => {

      switch(reaction.emoji.name){
       case "1️⃣":

         let userNya1 = test[0];
         let userNya = this.client.users?.cache.get(userNya1);
         let test1 = new MessageEmbed()
         .setColor(this.client.color)
         .setImage(userNya.displayAvatarURL({dynamic:true, size:2048}) as any)
         .setAuthor(`Avatar from ${userNya.tag}`)
         return message.channel.send(test1);
       break;
       case "2️⃣":

         let dua = test[1];
         let dua2 = this.client.users?.cache.get(dua);
         let test2 = new MessageEmbed()
         .setColor(this.client.color)
         .setImage(dua2.displayAvatarURL({dynamic:true, size:2048}) as any)
         .setAuthor(`Avatar from ${dua2.tag}`)
         return message.channel.send(test2);
       break;
       case "3️⃣":

         let tiga = test[2];
         let tiga3 = this.client.users.cache?.get(tiga);
         let test3 = new MessageEmbed()
         .setColor(this.client.color)
         .setImage(tiga3.displayAvatarURL({dynamic:true, size:2048}) as any)
         .setAuthor(`Avatar from ${tiga3.tag}`)
         return message.channel.send(test3);
       break;
       case "4️⃣":

         let empat = test[3];
         let empat4 = this.client.users?.cache.get(empat);
         let test4 = new MessageEmbed()
         .setColor(this.client.color)
         .setImage(empat4.displayAvatarURL({dynamic:true, size:2048}) as any)
         .setAuthor(`Avatar from ${empat4.tag}`)
         return message.channel.send(test4);
       break;
       case "5️⃣":

         let lima = test[4];
         let lima5 = this.client.users?.cache.get(lima);
         let test5 = new MessageEmbed()
         .setColor(this.client.color)
         .setImage(lima5.displayAvatarURL({dynamic:true, size:2048}) as any)
         .setAuthor(`Avatar from ${lima5.tag}`)
         return message.channel.send(test5);
       break;
       case "🚫":
         x.delete()
       break;
         }
        })
       };
       user = a;
  }


  let avatar = new MessageEmbed()
  .setColor(this.client.color)
  .setImage(user.displayAvatarURL({dynamic:true, size:2048}) as any)
  .setAuthor(`Avatar from ${user.tag}`)
  return message.channel.send(avatar)

  }catch(e){
   return console.log(e)
  }
 }
}
