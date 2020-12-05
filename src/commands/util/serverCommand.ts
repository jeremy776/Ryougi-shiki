import { MessageEmbed } from "discord.js";

export default {
   name: "server",
   aliases: ["server-info", "info-server"],
   description: "hmmmm?",
   execute(msg, args, client) {

   let embed = new MessageEmbed()
   .setAuthor(msg.guild.name + " Info", msg.author.displayAvatarURL({dynamic:true}))
   .setColor(client.color)
   .setTimestamp()
   .setFooter("Reply "+ msg.author.tag)
   .addField("Owner", `
\`\`\`
• Name :: ${client.users.cache.get(msg.guild.ownerID).tag}
• Id   :: ${msg.guild.ownerID}
\`\`\``)
    .addField("Server", `
\`\`\`
• Name   :: ${msg.guild.name}
• Id     :: ${msg.guild.id}
• Member :: ${msg.guild.memberCount}
 • Bot   :: ${msg.guild.members.cache.filter(x => x.user.bot).size}
 • User  :: ${msg.guild.members.cache.filter(x => !x.user.bot).size}
\`\`\``)
    .addField(`Roles [\`${msg.guild.roles.cache.size}\`]`), `\`\`\`${msg.guild.roles.cache.map(x => x.name).join(" | ")}\`\`\``)
    return msg.channel.send(embed)
 }
}
