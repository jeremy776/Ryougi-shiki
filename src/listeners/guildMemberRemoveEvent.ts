import Listener from "../handle/Listener";
import type { TextChannel } from "discord.js";
import { MessageAttachment } from "discord.js";

export default class GuildRemove extends Listener {
  public name = "guildRemove";
  public async exec(member: any) {

  let leave = await this.client.db.get(`leave.${member.guild.id}`);
  if(!leave) return;

  if(member.guild.id == leave.serverId) {
  if(leave.status == false) return;
  let pesan = leave.message
  let pessan = pesan.replace(/{member}/g, member).replace(/{member.tag}/g, member.user.tag).replace(/{member.id}/g, member.user.id).replace(/{member.name}/g, member.user.username).replace(/{server.name}/g, member.guild.name).replace(/{memberCount}/g, member.guild.memberCount).replace(/{server.id}/g, member.guild.id)
  if(leave.status == true) {
    let channel = member.guild?.channels.cache.get(leave.id) as TextChannel
    const canvas = require("discord-canvas"),
       leaveCanvas = new canvas.Goodbye();

      let image = await leaveCanvas
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.user.memberCount)
        .setGuildName(member.user.name)
        .setAvatar(member.user.displayAvatarURL({ format: "png", size: 2048 }) as any)
        .setColor("border", "white")
        .setColor("username-box", "black")
        .setColor("discriminator-box", "black")
        .setColor("message-box", "black")
        .setColor("title", "white")
        .setColor("avatar", "white")
        .setBackground(leave.bg)
        .toAttachment();

        let attachment = new MessageAttachment(image.toBuffer(), "welcome-image.png");
        channel.send(pessan, attachment);
  }
 }

 }
}
