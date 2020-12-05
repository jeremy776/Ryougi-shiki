import { MessageEmbed } from 'discord.js';

export default {
  name: "help",
  aliases: ["h"],
  cooldown: 3,
  guildOnly: false,
  description: "Display all commands and descriptions",
  execute(message, args, client) {
    let msg = message
    try {
    if (args.length < 1) {
   let module = client.helps.array(); 
  const embed = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username+" Commands", client.user.displayAvatarURL())
        .setFooter(`Type: ${client.config.prefix}help [command] | ${client.commands.size} Commands`);
      for (const mod of module) {
        embed.addField(`${mod.emot} | ${mod.name.slice(0,1).toUpperCase()}${mod.name.slice(1, mod.name.length)} (${mod.cmds.map(x => x).length})`, mod.cmds.map(x => `\`${x}\``).join(", "));
      }
        embed.addField("Links", `[Support Server](https://discord.gg/uQch8Yyqvs) | [Invite ${client.user.username}](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
      
    return message.channel.send(embed);
    }

    let cmd;
    if (client.commands.has(args[0])) {
      cmd = client.commands.get(args[0]);
    }
    if (client.aliases.has(args[0])) {
      cmd = client.commands.get(client.aliases.get(args[0]));
    }
    if (!cmd) {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setTitle("I don't have that command");
      const search = client.commands.keyArray().filter(x => x.includes(args[0])).map(x => `▫ __**${x}**__`);
      search.length > 0 ? embed.setDescription(`**Maybe you mean this:**\n${search.join("\n")}`) : undefined;
      return msg.channel.send(embed);
    }

   let cooldown = cmd.cooldown+"s";
   if(cmd.cooldown == undefined) cooldown = "None";
   if(!cooldown) cooldown = "None";

    const embed = new MessageEmbed()
      .setColor(client.color)
      .setTitle(`Info Command: ${cmd.name.slice(0,1).toUpperCase()}${cmd.name.slice(1, cmd.name.length)}`)
      .addField(`Description`, `${cmd.description}`)
      .addField(`Cooldown`, `${cooldown}`)
      .addField("Aliases", cmd.aliases.length > 0 ? cmd.aliases.map(x => `${x}`).join(", ") : "None")
      .setFooter("Don't include <> or [], it's mean <> is required and [] is optional");
    return msg.channel.send(embed);
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }
  
}
}
