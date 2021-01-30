import { MessageEmbed, MessageAttachment } from "discord.js";
import type { Message, TextChannel } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "leave",
  aliases: [],
  description: "gives a message when a member leave the server",
  usage: `leave channel <#channel>\nleave message <message>\nleave [on || off]\nbg url ( \`.png\` \`.jpg\` \`.jpeg\`)\n\nOptions for Messages\n{member} = @user\n{member.name} = username\n{member.tag} = username#discriminator\n{member.id} = 1234576891023456789\n\n{server.name} = Nameserver\n{memberCount} = total member server\n{server.id} = server id`,
  cooldown:1,
  ownerOnly:false
})

 export default class leaveCommand extends Command {
   public async exec(msg:Message, args:string[]) {

    let noPerms = new MessageEmbed()
    .setDescription("**You must have \`MANAGE SERVER\` permission to use this command**")
    .setColor(this.client.color)
    if(!msg.member?.hasPermission("MANAGE_GUILD")) return msg.channel.send(noPerms);

   if(!["channel", "message", "on", "bg", "test", "off"].includes(args[0])) return msg.reply("You entered the wrong value, type "+`\`${this.client.config.prefix}help leave\` for more help`)

   if(args[0].toLowerCase() == "channel") {

   let data = await this.client.db.get(`leave.${msg.guild?.id}`)
   let noMention = new MessageEmbed()
   .setDescription(`**you did not mention the channel**`)
   .setColor(this.client.color)

   let channel = msg.mentions.channels?.first() as TextChannel || msg.guild?.channels?.cache.find((x:any) => x.name == args[1]) as TextChannel;
   if(!channel) return msg.channel.send(noMention)

    if(!data) {
      let succes = new MessageEmbed()
      .setDescription(`**You have successfully set up the channel [\`${channel.name}\`]**`)
      .setColor(this.client.color)
      msg.channel.send(succes)

      return this.client.db.set(`leave.${msg.guild?.id}`, {
        id: channel.id,
        serverId: msg.guild?.id,
        message: "goodbye **{member}**",
        status: false,
        bg: null
       });
     }else{
      let update = new MessageEmbed()
      .setDescription(`**You have succesfully update the channel [\`${channel.name}\`]**`)
      .setColor(this.client.color)
      msg.channel.send(update)
      return this.client.db.set(`leave.${msg.guild?.id}`, {
         id: channel.id,
         serverId: msg.guild?.id,
         message: data.message,
         status: data.status,
         bg: data.bg
      });
     }
   }

    if(args[0].toLowerCase() == "message") {
      let data = await this.client.db.get(`leave.${msg.guild?.id}`)
      let noData = new MessageEmbed()
      .setDescription(`**You have to set the channel first\n\`${this.client.config.prefix}leave channel #channel\`**`)
      .setColor(this.client.color)
      if(!data) return msg.channel.send(noData)

      let pesan = args.slice(1).join(" ");
      if(!pesan) return msg.reply("You forgot to enter the message");

      let succes = new MessageEmbed()
      .setAuthor(`Leave Message`)
      .setColor(this.client.color)
      .setDescription(pesan)
      msg.channel.send(succes)

      if(data.status == false) {
         return this.client.db.set(`leave.${msg.guild?.id}`, {
           id: data.id,
           serverId: msg.guild?.id,
           message: pesan,
           status: false,
           bg: data.bg
         });
      }else{
         return this.client.db.set(`leave.${msg.guild?.id}`, {
           id: data.id,
           serverId: msg.guild?.id,
           message: pesan,
           status: true,
           bg: data.bg
         });
      }
    }

    if(args[0].toLowerCase() == "on") {
      let db = await this.client.db.get(`leave.${msg.guild?.id}`)
     // if(db.message == null) return msg.reply(`**You cannot activate the leave message without a message\n\`${this.client.config.prefix}leave message [message]\`**`)
      if(!db) return msg.reply(`**The database is not registered yet, please set the channel to create a new database\n\`${this.client.config.prefix}leave channel #channel\`**`)
      let alreadyOn = new MessageEmbed()
      .setDescription(`**leave Message already active**`)
      .setColor(this.client.color)
      if(db.status == true) return msg.channel.send(alreadyOn)

      if(db.status == false) {
        let succes = new MessageEmbed()
        .setDescription(`**You have successfully activated the welcome message**`)
        .setColor(this.client.color)
        msg.channel.send(succes)
        return this.client.db.set(`leave.${msg.guild?.id}`, {
             id: db.id,
             serverId: msg.guild?.id,
             message: db.message,
             status: true,
             bg: db.bg
        })
      }
    }

    if(args[0].toLowerCase() == "off") {
      let data = await this.client.db.get(`leave.${msg.guild?.id}`)
      if(!data) return msg.reply(`**The database is not registered yet, please set the channel to create a new database\n\`${this.client.config.prefix}leave channel #channel\`**`)
      let notOn = new MessageEmbed()
      .setDescription(`**The leave message is no longer active**`)
      .setColor(this.client.color)
      if(data.status == false) return msg.channel.send(notOn)

      if(data.status == true) {
        let berhasil = new MessageEmbed()
        .setDescription(`**You have successfully disabled the leave message**`)
        .setColor(this.client.color)
        msg.channel.send(berhasil)
        return this.client.db.set(`leave.${msg.guild?.id}`, {
           id:data.id,
           serverId: msg.guild?.id,
           message: data.message,
           status: false,
           bg: data.bg
        })
      }
    }

    if(args[0] == "bg") {
       let db = await this.client.db.get(`leave.${msg.guild?.id}`)
       if(!db) return msg.reply("**The database has not been registered, please set the channel first**");
       let img = args[1] || Array.from(msg?.attachments)[0][1]?.proxyURL
       if(!img) return msg.reply("You must include an image");

         let succes = new MessageEmbed()
         .setColor(this.client.color)
         .setDescription(`**[\`${msg.author?.tag}\`] successfully set the background**`)

         msg.channel.send(succes);
         return this.client.db.set(`leave.${msg.guild?.id}`, {
            id: db.id,
            serverId: msg.guild?.id,
            message: db.message,
            status: db.status,
            bg: img
         });
     }

     if(args[0] == "test") {
       let db = await this.client.db.get(`leave.${msg.guild?.id}`)
       if(!db) return msg.reply("There is no database");
       let bg = db.bg;
       let pesan1 = db.message;
       let pesan = pesan1.replace(/{member}/g, msg.author).replace(/{member.tag}/g, msg.author?.tag).replace(/{member.id}/g, msg.author?.id).replace(/{member.name}/g, msg.author?.username).replace(/{server.name}/g, msg.guild?.name).replace(/{memberCount}/g, msg.guild?.memberCount).replace(/{server.id}/g, msg.guild?.id)
       if(bg == null) bg = msg.guild?.iconURL({ format: "png" });

       const canvas = require("discord-canvas"),
       leaveCanvas = new canvas.Goodbye();

      let image = await leaveCanvas
        .setUsername(msg.author?.username)
        .setDiscriminator(msg.author?.discriminator)
        .setMemberCount(msg.guild?.memberCount)
        .setGuildName(msg.guild?.name)
        .setAvatar(msg.author.displayAvatarURL({ format: "png", size: 2048 }))
        .setColor("border", "white")
        .setColor("username-box", "black")
        .setColor("discriminator-box", "black")
        .setColor("message-box", "black")
        .setColor("title", "white")
        .setColor("avatar", "white")
        .setBackground(bg)
        .toAttachment();

        let attachment = new MessageAttachment(image.toBuffer(), "welcome-image.png");
        return msg.channel.send(pesan, attachment);
    }

 }
}
