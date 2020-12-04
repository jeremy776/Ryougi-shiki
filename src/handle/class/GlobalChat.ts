import { MessageEmbed } from "discord.js";
const server = require('../../models/Global').default

export default class Global {
 guild:any
  constructor(guild){
   this.guild = guild; 
  }
  
  async get(){
   const data = server.findOne({
     guild:this.guild
   })
   return data;
  }
  
}
