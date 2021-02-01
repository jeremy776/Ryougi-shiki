const fetch = require("node-superfetch");
import {
  Client
} from "discord.js";
export default class Utility {
  public constructor(public readonly client: Client) {}
  public cpu() {
    let cpuUsage = process.cpuUsage();
    return (cpuUsage.user/cpuUsage.system).toFixed(2) + "%";
  }
  public parseDur(ms: number) {
    let S = ms / 1000;
    let D = parseInt((S / 86400).toString());
    S = S % 86400;
    let H = parseInt((S / 3600).toString());
    S = S % 3600;
    let M = parseInt((S / 60).toString());
    S = parseInt((S % 60).toString());
    if (S || M || H || D) return `${D}d ${H}h ${M}m ${S}s`;
  }
  public async hastebin(string: string) {
    const {
      body
    } = await fetch.post('https://paste.mod.gg/documents').send(string);
    return `https://paste.mod.gg/${body.key}.js`
  }
  public randomNumber(min: number, max: number): number {
    if (!min) throw new Error("Invalid Min Number")
    if (!max) throw new Error("Invalid Max Number")
    if (isNaN(min)) throw new Error("Value Must be A Number")
    if (isNaN(max)) throw new Error("Value Must be A Number")
    return Math.floor(Math.random() * max) + min;
  }
  public async getDataHero(id:number) {
    let heroData = "https://mapi.mobilelegends.com/hero/detail?id=";
    if(!id) throw new Error("Invalid ID");
    if(isNaN(id)) throw new Error("Not A Number");
    
    let axios = require("axios");
    let data = await axios.get(heroData+id);
    
    return data.data.data;
  }
  public async getHero(data:string) {
    let heroListApi = "https://mapi.mobilelegends.com/hero/list";
    if(!data) {
      throw new Error("Invalid Value");
    }
    let axios = require("axios");
    let dataHero = await axios.get(heroListApi)
    let filter = dataHero.data.data.filter((x:any) => x.name.toLowerCase() === data.toLowerCase())
    
    return filter[0]
  }
}