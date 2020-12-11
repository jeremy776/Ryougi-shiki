import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: 'clyde',
  aliases: [],
  description: "clyde message",
  usage: "clyde [text]",
  cooldown: 2,
  ownerOnly:false
 })

  export default class clydeCommand extends Command {
    public async exec(msg: Message, args:string[]) {

  let kata = args.join(" ")
  if(!kata) kata = "Connecting....";

  let embed = new MessageEmbed()
  .setImage(`https://ctk-api.herokuapp.com/clyde/${kata}`)
  .setColor(client.color)
  .setFooter("Reply "+ msg.author.tag)
  .setTimestamp()
  return msg.channel.send(embed)

 }
}
