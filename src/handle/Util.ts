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

 static async randomNumber(min, max) {
   if(!min) min = 0;
   if(!max) throw new Error("Invalid Max Number")
   if(!isNaN(min)) throw new Error("Value Must be A Number")
   if(!isNaN(max)) throw new Error("Value Must be A Number")

   return Math.floor(Math.random() * max) + min;
}
