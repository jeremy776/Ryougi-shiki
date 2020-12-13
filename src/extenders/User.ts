import { Structures } from "discord.js";

class User extends Structures.get("User") {
    public get isDev(): boolean {
        return this.client.config.owner.includes(this.id);
    }
}

declare module "discord.js" {
    export interface User {
        isDev: boolean;
    }
}

Structures.extend("User", () => User);
