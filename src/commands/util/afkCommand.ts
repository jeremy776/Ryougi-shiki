import { MessageEmbed } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";
import type { Message } from "discord.js";

@CommandConf({
    name: "afk",
    aliases: [],
    description: "if you want to afk",
    usage: "afk [reason]",
    cooldown: 1,
    ownerOnly: false
})

 export default class afkCommand extends Command {
   public async exec(msg:Message, args:string[]) {
    
    const afk = this.client.afk.get(msg.author.id)

    const embedAFK = new MessageEmbed()
    .setColor(this.client.color)
    let k = args.join(" ")
    if(!k) k = "Not Set";
    
    if (!afk) {
      embedAFK.setDescription(`**${msg.author.tag}** now afk with reason: \`${k}\``)
      this.client.afk.set(msg.author.id, k as any);
    } else {
      embedAFK.setDescription("**You're no longer Afk**");
      this.client.afk.delete(msg.author.id);
    }
    
    return msg.channel.send(embedAFK)
    
  }
}
