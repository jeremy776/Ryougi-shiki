import type { Guild } from "discord.js";
import { MessageEmbed } from "discord.js";
import Listener from "../handle/Listener";

export default class GuildDeleteEvent extends Listener {
  public name = "guildDelete";
  public async exec(guild:Guild) {

 }
}
