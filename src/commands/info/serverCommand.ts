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

   let embed = new MessageEmbed()
   .setAuthor(msg.guild.name + " Info", msg.author.displayAvatarURL({dynamic:true}))
   .setColor(this.client.color)
   .setTimestamp()
   .setFooter("Reply "+ msg.author.tag)
   .addField("Owner", `
\`\`\`
• Name :: ${this.client.users.cache.get(msg.guild.ownerID).tag}
• Id   :: ${msg.guild.ownerID}
\`\`\``)
    .addField("Server", `
\`\`\`
• Name     :: ${msg.guild?.name}
• Id       :: ${msg.guild?.id}
• Region   :: ${msg.guild?.region}
• Members  :: ${msg.guild?.memberCount} Members
  • Bot's  :: ${msg.guild?.members.cache.filter(x => x.user.bot).size} Bots
  • User's :: ${msg.guild?.members.cache.filter(x => !x.user.bot).size} Users
• Channels :: ${msg.guild?.channels.cache.size} Channel's
\`\`\``)
    //.addField(`Roles [\`${msg.guild.roles.cache.size}\`]`, `${msg.guild.roles.cache.map(x => x).join(" | ")}`)
    return msg.channel.send(embed)
 }
}
