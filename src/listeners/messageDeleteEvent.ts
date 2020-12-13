import type { Message, TextChannel } from "discord.js";
import Listener from "../handle/Listener";

export default class MessageDeleteEvent extends Listener {
  public name: "messageDelete"
  public async exec(msg:Message) {
    let channel = msg.channel as TextChannel;
    this.client.snipe.set(channel.id, msg)
 }
}
