import type { Guild } from "discord.js";
import { MessageEmbed } from "discord.js";
import Listener from "../handle/Listener";

export default class GuildDeleteEvent extends Listener {
  public name = "guildDelete";
  public async exec(guild:Guild) {

  this.client.db.delete(guild.id)
  let embed = new MessageEmbed()
  .setAuthor("👋 LEAVE GUILD", guild.iconURL({dynamic:true}) as any)
  .addField("📝 NAME", guild.name)
  .addField("🔬 OWNER", guild.owner.user?.tag)
  .addField("⚙️ MEMBER", guild.memberCount)
  .setColor(this.client.color)
  return this.client.channels.cache.get(this.client.config.logs).send(embed)
 }
}
