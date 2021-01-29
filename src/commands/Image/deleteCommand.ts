import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";
import { MessageEmbed, MessageAttachment } from "discord.js";
import type { Message } from "discord.js";

@CommandConf({
 name: "delete",
 aliases: [],
 description: "None",
 usage: "delete [ @user || user id ]",
 cooldown:3,
 ownerOnly:false
})

export default class DeleteCommand extends Command {
  public async exec(message: Message, args:string[]) {

  let user = message.mentions.users?.first() || this.client.users.cache?.get(args[0]);
  if(!user) {
    user = message.author;
  }

  let img = await new this.client.image.Delete().getImage(user.displayAvatarURL({ format: "png", size: 2048 }));
  let image = new MessageAttachment(img, "delete.png");
  let embed = new MessageEmbed()
  return message.channel.send(image);

 }
}
