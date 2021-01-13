import Listener from "../handle/Listener";
import type { TextChannel } from "discord.js";
import { MessageAttachment } from "discord.js";

export default class GuildMemberAdd extends Listener {
  public name = "guildMemberAdd";
  public async exec(member: any) {

  let data = await this.client.db.get(`autorole.${member.guild?.id}`)
  let welcome = await this.client.db.get(`welcome.${member.guild?.id}`)

  if(!welcome) return;
  if(!data) return;

 if(member.guild.id == welcome.serverId) {
  if(welcome.status == false) return;
  let pesan = welcome.message.replace(/{member}/g, member).replace(/{member.tag}/g, member.user.tag).replace(/{member.id}/g, member.user.id).replace(/{member.name}/g, member.user.username).replace(/{server.name}/g, member.guild.name).replace(/{memberCount}/g, member.guild.memberCount).replace(/{server.id}/g, member.guild.id)
  if(welcome.status == true) {
    let channel = member.guild?.channels.cache.get(welcome.id) as TextChannel

    const canvas = require("discord-canvas"),
       welcomeCanvas = new canvas.Welcome();

      let image = await welcomeCanvas
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({ format: "png", size: 2048 }) as any)
        .setColor("border", "white")
        .setColor("username-box", "black")
        .setColor("discriminator-box", "black")
        .setColor("message-box", "black")
        .setColor("title", "white")
        .setColor("avatar", "white")
        .setBackground(welcome.bg)
        .toAttachment();

        let attachment = new MessageAttachment(image.toBuffer(), "welcome-image.png");
        channel.send(pesan, attachment);
  }
 }

 if(member.guild.id == data.serverId) {
  if(data.status == false) return;
  if(data.status == true) {
    let role = member.guild?.roles.cache.get(data.id)
    member.roles.add(role)
  }
 }

 }
}
