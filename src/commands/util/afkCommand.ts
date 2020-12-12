import { MessageEmbed } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";
import type { Message } from "discord.js";

@CommandConf({
  name: "afk",
  cooldown:1,
  description: "afk.",
  usage: "afk [reason]",
  ownerOnly:false
})

 export default class afkCommand extends Command {
   public async exec(msg:Message, args:string[]) {
    
    const afk = client.afk.get(msg.author.id)

    const embedAFK = new MessageEmbed()
    .setColor(client.color)
    let k = args.join(" ")
    if(!k) k = "Not Set";
    
    if (!afk) {
      embedAFK.setDescription(`**${msg.author.tag}** now afk with reason: \`${k}\``)
      client.afk.set(msg.author.id, k as any);
    } else {
      embedAFK.setDescription("**You're no longer Afk**");
      client.afk.delete(msg.author.id);
    }
    
    return msg.channel.send(embedAFK)
    
  }
}
