import type { Message, TextChannel } from "discord.js";
import { MessageEmbed } from "discord.js";
import Listener from "../handle/Listener";

export default class MessageEvent extends Listener {
    public name = "message";
    private readonly prefix = this.client.config.prefix;
    public async exec(msg: Message): Promise<Message | void> {
        if (!msg.guild) return;
        if (msg.author.bot) return;


        //level
        let data = await this.client.db.get(`level-status.${msg.guild?.id}`)
        if(data) {
          if(data.status == true) {

            let channel = msg.guild?.channels.cache.get(data.channel) as TextChannel;
            let userData = await this.client.db.get(`level${msg.guild?.id}.${msg.author?.id}`);
            if(!userData) {
              await this.client.db.set(`level${msg.guild?.id}.${msg.author?.id}`, {
                level:1,
                xp:0,
                totalxp:0
              });
            }

           this.client.db.add(`level${msg.guild?.id}.${msg.author?.id}.xp`, 1)
           let nextLvl = Math.floor(0.150 * Math.sqrt(xp))
           let level = userData.level;

           if(nextLvl > level) {
             channel.send(`new level omg`)
           }

          }
        }

        let author = this.client.afk.get(msg.author?.id);
        let tag = msg.mentions.members?.first();
         if(tag) {
            let status = this.client.afk.get(tag.id);
            if(status) {
               let embed = new MessageEmbed()
               .setDescription(`**${tag.user?.tag} is afk: ${status}**`)
               .setColor(this.client.color)
               return msg.channel.send(embed).then((x:any) => x.delete({timeout:5000}))
             }
          }
         if(author) {
            msg.reply(`Welcome Back ;)`).then((x:any) => x.delete({timeout:5000}))
            this.client.afk.delete(msg.author?.id);
          }

        if (msg.content === `<@!${this.client.user!.id}>` || msg.content === `<@${this.client.user!.id}>`) {
            return msg.channel.send(`My prefix is: \`${this.client.config.prefix}\``);
        }
        if (!msg.content.startsWith(this.prefix)) return;

        const args = msg.content.slice(this.prefix.length).trim().split(/ +/g);
        const commandName = args.shift()!.toLowerCase();
        const command = this.client.commands.get(commandName.toLowerCase()) || this.client.commands.find(c => c.config.aliases!.includes(commandName.toLowerCase()));
        if (command) {
            if (command.config.ownerOnly && !msg.author.myDev) return;
            if (!msg.author.myDev) {
                const now = Date.now();
                const userCooldown = this.client.cooldowns.get(`${command.config.name}-${msg.author.id}`);
                const cooldownAmount = command.config.cooldown! * 1000;
                if (userCooldown) {
                    const expirationTime = userCooldown + cooldownAmount;
                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now) / 1000;
                        await msg.channel.send(`Hold on, you just need to wait for ${timeLeft.toFixed(1)} secs to use \`${command.config.name}\` again.`);
                        return;
                    }
                }
                this.client.cooldowns.set(`${command.config.name} - ${msg.author.id}`, now);
                setTimeout(() => this.client.cooldowns.delete(`${command.config.name}-${msg.author.id}`), cooldownAmount);
            }
            try {
                await command.exec(msg, args);
            } catch (e) {
                console.error(e);
            }
        }
    }
}
