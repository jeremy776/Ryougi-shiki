import { MessageEmbed } from "discord.js";
import * as moment from "moment";

export default {
  name: "age",
  aliases: ["myage", "checkage"],
  description: "check your age",
  cooldown: 3,
  execute(msg, args, client) {

  let maxAge = moment(Date.now()).format("YYYY")
  let myAge = args[0]

  if(maxAge < myAge) {
    let limitAge = new MessageEmbed()
    .setDescription(`**The year you entered has passed the current year \`(${maxAge})\`**`)
    .setColor(client.color)
    return msg.channel.send(limitAge)
  }

  let succes = new MessageEmbed()
  .setDescription(`**You are ${checkAge(myAge)} years old now**`)
  .setColor(client.color)
  return msg.channel.send(succes);


 function checkAge(age) {
  let data = moment(Date.now()) - age
  return data
 }

 }
}
