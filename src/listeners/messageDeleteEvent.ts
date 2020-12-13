import type { Message } from "discord.js";
import Listener from "../structures/Listener";

export default class MessageDeleteEvent extends Listener {
  public name: "messageDelete"
  public async exec(msg:Message) {
    this.client.snipe.set(msg.channel.id, msg)
 }
}
