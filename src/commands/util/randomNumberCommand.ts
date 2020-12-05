export default {
  name: "randomnumber",
  aliases: ["random-number", "number-generator"],
  description: "random number",
  execute(msg, args, client) {

  let max = args[0];
  if(!max) max = 50;

  return msg.reply("I got the number\n"+client.util.randomNumber(1, max))
 }
}
