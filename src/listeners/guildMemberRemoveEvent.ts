import Listener from "../handle/Listener";
import type { TextChannel } from "discord.js";

export default class GuildRemoveAdd extends Listener {
  public name = "guildRemoveAdd";
  public async exec(member: any) {

  let leave = await this.client.db.get(`leave.${member.guild.id}`);
  if(!leave) return;

  if(member.guild.id == leave.serverId) {
  if(leave.status == false) return;
  let pesan = leave.message.replace(/{member}/g, member).replace(/{member.tag}/g, member.user.tag).replace(/{member.id}/g, member.user.id).replace(/{member.name}/g, member.user.username).replace(/{server.name}/g, member.guild.name).replace(/{memberCount}/g, member.guild.memberCount).replace(/{server.id}/g, member.guild.id)
  if(leave.status == true) {
    let channel = member.guild?.channels.cache.get(leave.id) as TextChannel
    channel.send(pesan)
  }
 }

 }
}
