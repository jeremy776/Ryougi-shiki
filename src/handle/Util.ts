class Util {

 static cpu() {
  let cpuUsage = process.cpuUsage();
  return (cpuUsage.user/cpuUsage.system).toFixed(2) + "%";
 }

 static parseDur(ms) {
   let S = ms / 1000;
 
  let D = parseInt(S / 86400);
  S = S % 86400;
 
  let H = parseInt(S / 3600);
  S = S % 3600;
 
  let M = parseInt(S / 60);
  S = parseInt(S % 60);
 
  if (S || M || H || D) return `${D}D ${H}H ${M}M ${S}S`;
 }
}

module.exports = Util;
