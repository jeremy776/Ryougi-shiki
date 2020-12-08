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
• Name     :: ${msg.guild.name}
• Id       :: ${msg.guild.id}
• Region   :: ${msg.guild.region}
• Members  :: ${msg.guild.memberCount} Members
  • Bot's  :: ${msg.guild.members.cache.filter(x => x.user.bot).size} Bots
  • User's :: ${msg.guild.members.cache.filter(x => !x.user.bot).size} Users
• Channels :: ${msg.guild.channels.cache.size} Channel's
\`\`\``)
    .addField(`Roles [\`${msg.guild.roles.cache.size}\`]`, `${msg.guild.roles.cache.map(x => x.name).join(" | ")}`)
    return msg.channel.send(embed)
 }
}
