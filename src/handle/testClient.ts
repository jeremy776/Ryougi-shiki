import { Client, Collection, Message } from 'discord.js';
import * as config from '../config.json';
import { Util } from './Util';

interface ICommand {
    name: string;
    aliases: string[];
    cooldown: number;
    guildOnly: boolean;
    description: string;
    usage: string[];
    execute: (message: Message, args: string[], client: testClient) => unknown; 
 }

interface Snipe {
    content: string;
    author: string;
    image: string;
}

class testClient extends Client {
    public helps: Collection<string, string> = new Collection();
    public color: string = "DARK_BLUE";
    public commands: Collection<string, ICommand> = new Collection();
    public aliases: Collection<string, string> = new Collection();
    public snipe: Map<string, Snipe> = new Map();
    public util: typeof Util = Util;
    public config: typeof config = config;
}

export default testClient;
