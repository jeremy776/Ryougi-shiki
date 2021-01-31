import type {
  Message
} from "discord.js";
import type {
  MessageEmbedOptions
} from "discord.js";
import {
  CommandConf
} from "../../decorators";
import Command from "../../handle/Command";

@CommandConf({
  name: "help",
  aliases: ["h"],
  description: "",
  usage: "",
  cooldown: 3,
  ownerOnly: false
})
export default class helpCommand extends Command {
  public async exec(msg: Message, args: string[]): Promise < void > {
    try {
      const embed: MessageEmbedOptions = {
        color: this.client.color,
        fields: []
      };

      const command = this.client.commands.get(args[0]);

      if (command) {
        Object.assign(embed, {
          author: {
            name: command.config.name,
            iconURL: this.client.user?.displayAvatarURL()
          },
          footer: {
            text: msg.author.username,
            iconURL: msg.author.displayAvatarURL({
              dynamic: true
            })
          },
          description: command.config.description,
          timestamp: Date.now()
        });

        embed.fields?.push({
          name: "Aliases",
          value: `\`${command.config.aliases!.join(", ") || "Not set"}\``
        },
          {
            name: "Usage",
            value: command.config.usage
          },
          {
            name: "Cooldown",
            value: command.config.cooldown
          });
      } else {
        embed.author = {
          name: `${this.client.user?.username} Command List`,
          iconURL: this.client.user?.displayAvatarURL()
        };
        embed.footer = {
          text: `Run ${this.client.config.prefix}help <command> for info about a command.`,
          iconURL: msg.author.displayAvatarURL({
            dynamic: true
          })
        };

        const categories = [...new Set(this.client.commands.map(x => x.config.category))];
        const emote = this.client.config.emoteCategory
        for (const category of categories) {
          const commands = this.client.commands.filter(x => x.config.category === category);
          embed.fields?.push({
            name: `${category} [\`${commands.map((x: any) => x.config.name).length}\`]`,
            value: commands.map((x: any) => `\`${x.config.name}\``).join(", ")
          });
        }
        embed.fields?.push({
          name: "LINKS",
          value: `**[\[INVITE\]](https://discord.com/oauth2/authorize?client_id=${this.client.user?.id}&scope=bot&permissions=8) | [\[SUPPORT SERVER\]](https://discord.gg/NFAVb7y3f4)**`
        });
      }

      await msg.channel.send({
        embed
      });
    } catch (e) {
      msg.channel.send(`An error occured \`${e}\` Try again later!`)
    }
  }
}