import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "autorole",
  aliases: ["auto-role"],
  description: "assign roles to members who have just come to the server",
  usage: "autorole set [@role || name role]\nautorole [on || off]",
  cooldown: 1,
  ownerOnly:false
})

 export default class autoroleCommand extends Command {
   public async exec(msg:Message, args:string[]) {

   if(!["on", "off", "set"].includes(args[0])) return msg.reply(`Invalid options, please use \`${this.client.config.prefix}help autorole\` for info`)

   if(args[0].toLowerCase() == "on") {
     let status = this.client.db.get(`autorole.${msg.guild.id}`)
     if(!status) return msg.reply("**You must set a role first**");
     if(status.status == true) return msg.reply("**autorole is already active**");
     if(status.status == false) {
         let on = new MessageEmbed()
         .setDescription("**You have turned on autorole**")
         .setColor(this.client.color)

         this.client.db.set(`autorole.${msg.guild?.id}`, {
          id:status.id,
          status:true
         });

         return msg.channel.send(on)
     }
   }


   if(args[0].toLowerCase() == "off") {
     let status = this.client.db.get(`autorole.${msg.guild.id}`)
     if(!status) return msg.reply("**You must set a role first**");
     if(status.status == false) return msg.reply("**autorole is not active**");
     if(status.status == true) {
         let off = new MessageEmbed()
         .setDescription("**you have disabled the autorole command**")
         .setColor(this.client.color)

         this.client.db.set(`autorole.${msg.guild?.id}`, {
          id:status.id,
          status:false
         });

         return msg.channel.send(off)
     }
   }


   if(args[0].toLowerCase() == "set") {
      let role = msg.mentions.roles?.first() || msg.guild?.roles.cache.find((x:any) => x.name == args[1]);
      if(!role) {
         let embed = new MessageEmbed()
         .setDescription("**Role not found**")
         .setColor(this.client.color)
         return msg.channel.send(embed)
      }
       if(role == undefined) return msg.reply("**Role Not Found**")
       let succes = new MessageEmbed()
       .setDescription(`**You have successfully set a role [\`${role.name}\`] for autorole**`)
       .setColor(this.client.color)
       this.client.db.set(`autorole.${msg.guild?.id}`, {
          id: role.id,
          status:false
        })
       return msg.channel.send(succes)
    }

 }
}
