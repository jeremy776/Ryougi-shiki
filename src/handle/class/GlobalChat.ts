import { MessageEmbed } from "discord.js";
const server = require('../../models/Global').default

export default class Global {
 guild:any
  constructor(guild){
   this.guild = guild; 
  }
  
  async get(){
   const data = await server.findOne({
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
 
 async setChannel(ch){
  if(!ch)throw new Error('Can\'t find channel');
  if(isNaN(ch)) throw new Error('Channel must be a Number');
  
  const Data = await server.findOne({
   guild:this.guild
  });
  return data.updateOne({id:ch, guild:this.guild});
 }
  
}
