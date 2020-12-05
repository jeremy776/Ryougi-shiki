export default {
  name: "nuke",
  aliases: ["clone"],
  description: "Nuke Channel!",
  guildOnly:true,
  cooldown:10,
  execute(msg, args, client){
    
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
