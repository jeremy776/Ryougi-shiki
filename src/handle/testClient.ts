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

class testClient extends Client {
    public helps: Collection<string, string> = new Collection();
    public color: string = "BLUE";
    public commands: Collection<string, ICommand> = new Collection();
    public aliases: Collection<string, string> = new Collection();
    public util: typeof util = util;
    public config: typeof config = config;
}

export default testClient;
