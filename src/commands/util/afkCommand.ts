import { MessageEmbed } from "discord.js";

export default {
  name: "afk",
  cooldown:1,
  description: "afk.",
  execute(msg, args, client) {
    
    const afk = client.afk.get(msg.author.id)

    const embedAFK = new MessageEmbed()
    .setColor(client.color)
    let k = args.join(" ")
    if(!k) k = "Not Set";
    
    if (!afk) {
      embedAFK.setDescription(`**${msg.author.tag}** now afk with reason: \`${k}\``)
      client.afk.set(msg.author.id, k);
    } else {
      embedAFK.setDescription("**You're no longer Afk**");
      client.afk.delete(msg.author.id);
    }
    
    return msg.channel.send(embedAFK)
    
  }
}
