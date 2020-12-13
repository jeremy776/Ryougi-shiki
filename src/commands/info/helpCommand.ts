import { MessageEmbed } from 'discord.js';
import type { Message } from "discord.js";
import { CommandConf } from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "help",
  aliases: ["h"],
  cooldown: 3,
  ownerOnly:false,
  description: "Display all commands and descriptions",
})

 export default class HelpCommand extends Command {
   public async exec(message:Message, args:string[]) {

    let msg = message
    try {
    if (args.length < 1) {
   let module = this.client.helps.array(); 
  const embed = new MessageEmbed()
        .setColor(this.client.color)
        .setAuthor(this.client.user?.username+" Commands", this.client.user?.displayAvatarURL())
        .setFooter(`Type: ${this.client.config.prefix}help [command] | ${this.client.commands.size} Commands`);
      for (const mod of module) {
        embed.addField(`${mod.emot} | ${mod.name.slice(0,1).toUpperCase()}${mod.name.slice(1, mod.name.length)} [\`${mod.cmds.map((x:any) => x).length}\`]`, mod.cmds.map((x:any) => `\`${x}\``).join(", "));
      }
        embed.addField("Links", `**[Support Server](https://discord.gg/uQch8Yyqvs) | [Invite ${this.client.user.username}](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)**`)
      
    return message.channel.send(embed);
    }

    let cmd;
    if (thus.client.commands.has(args[0])) {
      cmd = this.client.commands.get(args[0]);
    }
    if (this.client.aliases.has(args[0])) {
      cmd = this.client.commands.get(this.client.aliases.get(args[0]));
    }
    if (!cmd) {
      const embed = new MessageEmbed()
        .setColor(this.client.color)
        .setTitle("I don't have that command");
      const search = this.client.commands.keyArray().filter((x:any) => x.includes(args[0])).map(x => `▫ __**${x}**__`);
      search.length > 0 ? embed.setDescription(`**Maybe you mean this:**\n${search.join("\n")}`) : undefined;
      return msg.channel.send(embed);
    }

   let cooldown = cmd.cooldown+"s";
   if(cmd.cooldown == undefined) cooldown = "None";
   if(!cooldown) cooldown = "None";

   let alias;
   if(cmd.aliases) {
     alias = cmd.aliases.map((x:any) => `${x}`).join(", ");
   }else{
     alias = "None";
   }

    const embed = new MessageEmbed()
      .setColor(this.client.color)
      .setTitle(`Info Command: ${cmd.name.slice(0,1).toUpperCase()}${cmd.name.slice(1, cmd.name.length)}`)
      .addField(`Description`, `${cmd.description}`)
      .addField(`Cooldown`, `${cooldown}`)
      .addField("Aliases", alias)
      .setFooter("Don't include <> or [], it's mean <> is required and [] is optional");
    return msg.channel.send(embed);
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }
 }
}
