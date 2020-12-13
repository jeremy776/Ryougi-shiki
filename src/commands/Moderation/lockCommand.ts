/*import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";
import type { Message } from "discord.js";

@CommandConf({
  name: "lock",
  aliases: ["lockdown"],
  cooldown: 5,
  ownerOnly:false,
  description: "Lock channel"
})

 export default class lockCommand extends Command {
   public async exec(message:Message, args:string[]) {

  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed:{description: "**You do not have permission \`MANAGE_CHANNELS\` to lock this channel**", color:this.client.color}});
  if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed:{description: "**Give me \`MANAGE_CHANNELS\` permission if you want to run this command**", color:this.client.color}});
  message.channel.overwritePermissions([{
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],
   );
  return message.channel.send({embed:{description:`**\`${message.author.tag}\` has locked this channel**`, color:this.client.color}});
 }
}*/
