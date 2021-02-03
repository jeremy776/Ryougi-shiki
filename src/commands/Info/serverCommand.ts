import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
   name: "server",
   aliases: ["server-info", "info-server"],
   description: "hmmmm?",
   usage: "server",
   cooldown:1,
   ownerOnly:false
})

 export default class serverCommand extends Command {
   public async exec(msg:Message, args:string[]) {

   let more;
   if(msg.guild?.roles.cache?.size > 15) {
     more = " [```" + msg.guild?.roles.cache?.size - 15 + " More....```]";
   }

   let embed = new MessageEmbed()
   .setAuthor(msg.guild?.name + " Info", msg.author.displayAvatarURL({dynamic:true}))
   .setColor(this.client.color)
   .setTimestamp()
   .setThumbnail(msg.guild?.iconURL({ dynamic:true }) as any)
   .setFooter("Reply "+ msg.author.tag)
   .addField("Owner", `${msg.guild?.owner?.user} | ${msg.guild?.owner?.user.tag}`)
   .addField("Owner ID", `${msg.guild?.owner?.user.id}`)
   .addField("Server Name", `${msg.guild?.name}`)
   .addField("Server ID", `${msg.guild?.id}`)
   .addField("Region", `${msg.guild?.region}`)
   .addField("Member's", `\`\`\`
• ${msg.guild?.memberCount} Members
  • ${msg.guild?.members.cache.filter(x => x.user.bot).size} Bots
  • ${msg.guild?.members.cache.filter(x => !x.user.bot).size} Users\`\`\``)
   .addField("Channel's", `${msg.guild?.channels.cache.size} Channel's`)
    .addField(`Roles [\`${msg.guild?.roles.cache?.size}\`]`, `${msg.guild?.roles.cache?.map((x:any) => x).slice(0,15).join(" | ")${more}}`)
    return msg.channel.send(embed)
 }
}
