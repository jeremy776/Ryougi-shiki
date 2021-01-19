import { Client, ClientOptions, Collection, Message } from 'discord.js'
import config from "../config";
const color = "#303136";
const { Database } = require("quickmongo")
const db = new Database("mongodb+srv://jeremy:jeremykusuma@cluster0.d0mjj.mongodb.net/jeremy?retryWrites=true&w=majority")
import type Command from "./Command";
import Utility from "./Util";
import Giveaway from "./Giveaway";
import type Listener from "./Listener";
const { readdir } = require("fs").promises;
import { join } from "path";
import "../extenders";

export default class RyougiClient extends Client {
    public constructor(opt?: ClientOptions){
        super({
            disableMentions: "everyone",
            fetchAllMembers: true,
        })
    }

    /*public giveaway: Giveaway = new Giveaway(this, {
      storage: false,
      updateCountdownEvery: 5000,
      default: {
        botsCanWin: false,
        exemptPermissions: [ 'MANAGE_MESSAGES', 'ADMINISTRATOR' ],
        embedColor: this.color,
        reaction: '🎉'
      }
    })*/
    public config: typeof config = config
    public util: Utility = new Utility(this)
    public color: typeof color = color
    public db: typeof db = db
    public afk: Collection<string, string> = new Collection()
    public snipe: Map<string, Message> = new Map()
    public commands: Collection<string, Command> = new Collection()
    public cooldowns: Collection<string, number> = new Collection()
    public run(): void{
        void this.loadCommands();
        void this.loadEvent();
        void this.login(this.config.token);
    }
    public async loadCommands(): Promise<void> {
        const categories = await readdir(join(__dirname, "..", "commands"));
        for (const category of categories) {
            const commands = await readdir(join(__dirname, "..", "commands", category));
            for (const commandFile of commands) {
                const commandClass = require(`../commands/${category}/${commandFile}`).default;
                const command: Command = new commandClass(this);
                command.config.category = category;
                this.commands.set(command.config.name, command);
            }
        }
    }
    public async loadEvent(): Promise<void> {
        const listeners = await readdir(join(__dirname, "..", "listeners"));
        for (const listenerFile of listeners) {
            const listenerClass = require(`../listeners/${listenerFile}`).default;
            const listener: Listener = new listenerClass(this);
            this.on(listener.name, listener.exec.bind(listener));
        }
    }
}

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, Command>;
        config: typeof config;
        util: Utility;
        snipe: Map<string, Message>;
        color: "#303136";
        db: typeof db;
        afk: Collection<string, string>;
        cooldowns: Collection<string, number>;
        loadCommands(): Promise<void>;
        loadEventListeners(): Promise<void>;
    }
}
