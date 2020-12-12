import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "unlock",
  aliases: ["unlockdown"],
  cooldown: 5,
  ownerOnly:false,
  description: "Unlock a locked channel",
  usage: "unlock"
})

 export default class unlockCommand extends Command {
   public async exec(message:Message, args:string[]) {

   let noPerms = new MessageEmbed()
   .setColor(this.client.color)
   .setDescription(`**You must have the \`MANAGE_CHANNELS\` permission**`);
   if(!message.member?.hasPermission("MANAGE_CHANNELS")) return message.channel.send(noPerms);
   let clientNoPerms = new MessageEmbed()
   .setColor(this.client.color)
   .setDescription(`**I need to have the \`MANAGE_CHANNELS\` permission**`);
   if(!message.guild?.me?.hasPermission("MANAGE_CHANNELS")) return message.channel.send(clientNoPerms);
   message.channel.overwritePermissions([{
        id: message.guild?.id,
        null: ['SEND_MESSAGES'],
     },
    ],
   );

   let Succes = new MessageEmbed()
   .setColor(this.client.color)
   .setDescription(`**\`${message.author?.tag}\` has unlocked the channel**`)
   return message.channel.send(Succes)
 }
}
