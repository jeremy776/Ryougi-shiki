import { MessageEmbed } from "discord.js";
import data from '../../handle/class/GlobalChat';
import server from '../../handle/models/Global';
import DataID from '../../handle/data/GloblaChat';

export default {
  name: "global",
  aliases: ["global-channel", "global-set"],
  cooldown: 3,
  description: "set channel for connect to global chat with all guild who use this",
  guildOnly:true,
  async execute(msg, args, client) {
    if(!client.config.owner.includes(msg.author.id)) return msg.reply("**This command is still under development**")
    
    const dataGuild = new data(msg.guild.id);
    const dataID = await dataGuild.findOne({
      guild:msg.guild.id
    });
   
    let channel = msg.mentions.channels.first();
    let noMention = new MessageEmbed()
    .setDescription("**You must mention channel first**")
    .setColor(client.color)
    .setTimestamp()
    if(!channel) return msg.channel.send(noMention);

    if(!dataID) {
      let Succes = new MessageEmbed()
      .setDescription(`**You have successfully set global-chat to ${channel} channel**`)
      .setColor(client.color)
      .setTimestamp()
      msg.channel.send(Succes)
      dataGuild.newServer(msg.guild, DataID.globalChat(msg), server)
      return dataGUild.setGlobal(msg.channel.id)
    }
    
    if(dataID) {
      let Succes = new MessageEmbed()
      .setDescription(`**You have successfully set global-chat to ${channel} channel**`)
      .setColor(client.color)
      .setTimestamp()
      msg.channel.send(Succes)
      return dataGUild.setGlobal(msg.channel.id)
    }
    
 }
}
