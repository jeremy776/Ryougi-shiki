const fetch = require("node-superfetch");

export class Util {

 static cpu() {
  let cpuUsage = process.cpuUsage();
  return (cpuUsage.user/cpuUsage.system).toFixed(2) + "%";
 }

 static parseDur(ms) {
   let S = ms / 1000;
 
  let D = parseInt((S / 86400).toString());
  S = S % 86400;
 
  let H = parseInt((S / 3600).toString());
  S = S % 3600;
 
  let M = parseInt((S / 60).toString());
  S = parseInt((S % 60).toString());
 
  if (S || M || H || D) return `${D}D ${H}H ${M}M ${S}S`;
 }
 
 static async hastebin(string) {
   const { body } = await fetch.post('https://hasteb.in/documents').send(string);
   return `https://hasteb.in/${body.key}.js`
 }

 static async invite(id, perms) {
   if(!id) throw new Error("Invalid Value");
   if(!perms) throw new Error("Invalid Value");
   if(!isNaN(id)) throw new Error("Id must be a Number");
   if(!isNaN(perms)) throw new Error("Permission must be a Number");
   return `https://discordapp.com/api/oauth2/authorize?client_id=${id}&permissions=${perms}&scope=bot
 }
}
