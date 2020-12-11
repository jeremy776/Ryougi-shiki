import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "nuke",
  aliases: ["clone"],
  description: "Nuke Channel!",
  cooldown:10,
  ownerOnly:false
})

 export default class nukeCommand extends Command {
   public async exec(msg:Message, args:[]) {

    if(!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send({embed:{description: "**You Must Have `MANAGE_CHANNELS` Permission**", color:client.color}})
    if(!msg.member.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send({embed:{description: "**I Have No Permission \`MANAGE CHANNELS\`**", color:client.color}})
    let channel = msg.channel
    channel.clone().then(x => {
      x.setPosition(channel.position)
      channel.delete()
      x.send({embed:{description:"**Channel Has been nuked**", color:client.color}}).then(y => y.delete({timeout: 7000}))
    })
    
  }
}
