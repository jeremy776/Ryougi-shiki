import { Client, Collection, Message } from 'discord.js';
import * as config from '../config.json';
interface ICommand {
    name: string;
    aliases: string[];
    cooldown: number;
    guildOnly: boolean;
    description: string;
    usage: string[];
    execute: (message: Message, args: string[], client: Client) => unknown; 
 }

class Client extends Client {
    public helps: Collection<string, string> = new Collection();
    public color: string = "DARK_BUT_NOT_BLACK";
    public commands: Collection<string, ICommand> = new Collection();
    public aliases: Collection<string, string> = new Collection();
    public config: typeof config = config;
}

export default Client;
