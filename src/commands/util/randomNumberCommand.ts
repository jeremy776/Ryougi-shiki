export default {
  name: "randomnumber",
  aliases: ["random-number", "number-generator"],
  description: "Get A Random Number\n• randomnumber [max]\n•default value: 50",
  execute(msg, args, client) {

  let max = args[0];
  if(!max) max = 50;

  if(isNaN(max)) return msg.reply("**Max Must Be A Number**")

  return msg.reply("I got the number\n"+client.util.randomNumber(1, max))
 }
}
