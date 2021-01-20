import type { Guild, TextChannel } from "discord.js";
import { MessageEmbed } from "discord.js";
import Listener from "../handle/Listener";

export default class GuildDeleteEvent extends Listener {
  public name = "guildDelete";
  public async exec(guild:Guild) {

  /*LEVELING DATABASE
  this.client.db.delete(`levelreward.${guild.id}`)
  this.client.db.delete(`level-status.${guild.id}`)
  */

  //GENERAL DATABASE
  this.client.db.delete(`autorole.${guild.id}`)
  this.client.db.delete(`welcome.${guild.id}`)
  this.client.db.delete(`leave.${guild.id}`)
  this.client.db.delete(`warning${guild.id}`)


  let embed = new MessageEmbed()
  .setAuthor("👋 LEAVE GUILD", guild.iconURL({dynamic:true}) as any)
  .setThumbnail(guild.iconURL({dynamic:true}) as any)
  .setTimestamp()
  .setFooter("Now I am on "+ this.client.guilds.cache.size + " server's")
  .addField("📝 NAME", guild.name)
  .setImage("https://cdn.discordapp.com/attachments/784623203359653938/801494682626162718/20210120_235320.png")
  .addField("🔬 OWNER", guild.owner?.user.tag)
  .addField("⚙️ MEMBER", guild.memberCount)
  .setColor(this.client.color)
  let channel = this.client.channels.cache.get(this.client.config.logs) as TextChannel
  return channel.send(embed)
 }
}
