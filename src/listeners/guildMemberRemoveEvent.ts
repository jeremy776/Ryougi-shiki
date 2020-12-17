import Listener from "../handle/Listener";
import type { TextChannel } from "discord.js";

export default class GuildRemoveAdd extends Listener {
  public name = "guildRemoveAdd";
  public async exec(member: any) {

  this.client.db.delete(`warning${member.guild?.id}.${member.user?.id}`)

 }
}
