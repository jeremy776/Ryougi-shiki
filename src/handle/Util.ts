import * as axios from "axios";

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
   const { body } = await axios.post('https://hasteb.in/documents').send(string);
   return `https://hasteb.in/${body.key}.js`
 }
}
