const { MessageEmbed } = require("discord.js")

export default {
  name: "say",
  cooldown:3,
  guildOnly:true,
  description: "say something!",
  execute(msg, args, client) {
    
    let text = args.join(" ");
    if(!text) return msg.channel.send(".... :(")
   
    return msg.channel.send(text, { disableMentions:'everyone' })
    
  }
}
