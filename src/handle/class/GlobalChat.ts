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
 
 async newServer(guild, data, models) {
  if(!guild) throw new Error('Guild not found');
  if(!data) throw new Error('Data not found');
  if(!models) throw new Error("Could Not Find Database Models!");
  const db = Object.assign({ _id: mongoose.Types.ObjectId()}, data)
  const Data = new models(db);
  return Data.save()
 }
  
}
