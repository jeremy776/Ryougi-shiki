import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "autorole",
  aliases: ["auto-role"],
  description: "assign roles to members who have just come to the server",
  usage: "autorole set [@role or name role]\nautorole [on or off]",
  cooldown: 1,
  ownerOnly:false
})

 export default class autoroleCommand extends Command {
   public async exec(msg:Message, args:string[]) {

  let noPerms = new MessageEmbed()
  .setDescription("**You must have \`MANAGE SERVER\` permission to use this command**")
  .setColor(this.client.color)

  if(!msg.member?.hasPermission("MANAGE_GUILD")) return msg.channel.send(noPerms);
  if(!msg.guild?.me?.hasPermission("MANAGE_ROLES")) return msg.channel.send({embed:{description: "**Give me \`MANAGE_ROLES\` permission if you want to run this command**", color:this.client.color}});


   if(!["on", "off", "set"].includes(args[0])) return msg.reply(`Invalid options, please use \`${this.client.config.prefix}help autorole\` for info`)

   if(args[0].toLowerCase() == "set") {

      let role = msg.mentions.roles?.first() || msg.guild?.roles.cache.find((x:any) => x.name == args[1]);
      if(!role) {
         let embed = new MessageEmbed()
         .setDescription("**Role not found**")
         .setColor(this.client.color)
         return msg.channel.send(embed)
      }
       if(role == undefined) return msg.reply("**Role Not Found**")

       let status = await this.client.db.get(`autorole.${msg.guild?.id}`)
       if(!status) {
       let succes = new MessageEmbed()
       .setDescription(`**You have successfully set a role [\`${role.name}\`] for autorole**`)
       .setColor(this.client.color)
       this.client.db.set(`autorole.${msg.guild?.id}`, {
          id: role.id,
          serverId: msg.guild?.id,
          status:false
        })
       return msg.channel.send(succes)
      }else{
       let success = new MessageEmbed()
       .setDescription(`**You have successfully update autorole: [\`${role.name}\`]**`)
       .setColor(this.client.color)
       this.client.db.set(`autorole.${msg.guild?.id}`, {
          id: role.id,
          serverId: msg.guild?.id,
          status:true
        })
       return msg.channel.send(success)
      }
    }

    if(args[0].toLowerCase() == "on") {
     let status = await this.client.db.get(`autorole.${msg.guild?.id}`)
     //if(status == undefined) return msg.reply("**You must set a role first**");
     if(!status) return msg.reply("**You must set a role first**");
     if(status.status == true) return msg.reply("**autorole is already active**");
     if(status.status == false) {
      let on = new MessageEmbed()
      .setDescription("**you have enable the autorole**")
      .setColor(this.client.color)
      this.client.db.set(`autorole.${msg.guild?.id}`, {
        id:status.id,
        serverId: msg.guild?.id,
        status:true
       });
      return msg.channel.send(on)
     }
   }

   if(args[0].toLowerCase() == "off") {
     let status = await this.client.db.get(`autorole.${msg.guild?.id}`)
     //if(status == undefined) return msg.reply("**You must set a role first**");
     if(!status) return msg.reply("**You must set a role first**");
     if(status.status == false) return msg.reply("**autorole is not active**");
     if(status.status == true) {
      let off = new MessageEmbed()
      .setDescription("**You have successfully disabled autorole**")
      .setColor(this.client.color)
      this.client.db.set(`autorole.${msg.guild?.id}`, {
        id:status.id,
        serverId: msg.guild?.id,
        status:false
       });
      return msg.channel.send(off)
     }
   }

 }
}
