import { MessageEmbed } from "discord.js";
const axios = require("axios");
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
 name: "mobile-legends",
 aliases: ["ml", "mobileLegends"],
 description: "See hero statistics on mobile legends",
 usage: "mobile-legends [hero name]",
 cooldown: 1,
 ownerOnly:false
})

export default class MobileLegendsCommand extends Command {
  public async exec(msg:Message, args:string[]) {
    
    let namaHero = args[0];
    if(!namaHero) {
      return msg.reply(`Invalid hero name.\n\`Example: ${this.client.config.prefix}mobile-legends Alpha\``)
    }
    
    /*if(!isNaN(namaHero)) {
      return msg.reply(`It seems that there is no hero name that only uses numbers`)
    }*/
    
    let data = await this.client.util.getHero(namaHero);
    
    let embed = new MessageEmbed()
    .setColor(this.client.color)
    .setAuthor("Mobile Legends Hero " + namaHero.toUpperCase(), msg.author?.displayAvatarURL({dynamic:true}) as any)
    .setThumbnail("https:"+data.key)
    .setTimestamp()
    return msg.channel.send(embed)
    
  }
}
