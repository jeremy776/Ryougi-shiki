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

  if(!myAge) {
    let invalid = new MessageEmbed()
    .setDescription(`**example: ${client.config.prefix}age 2007**`)
    .setColor(client.color)
    .setTimestamp()
    return msg.channel.send(invalid)
 }

  if(isNaN(myAge)) {
    let nAn = new MessageEmbed()
    .setDescription("**It's not a number**")
    .setColor(client.color)
    .setTimestamp()
    return msg.channel.send(nAn)
 }

  let checkAge = +maxAge - (+myAge)

  if(checkAge > 100) {
    let limitAge = new MessageEmbed()
    .setDescription(`**This has crossed the limit of 100 years. actual age is ${checkAge} years**`)
    .setColor(client.color)
    .setTimestamp()
    return msg.channel.send(limitAge)
  }

  if(checkAge.includes("-")) {
    let error = new MessageEmbed()
    .setDescription(`**Age cannot be under 1 year old (negative age)**`)
    .setColor(client.color)
    .setTimestamp()
    return msg.channel.send(error)
  }

  if(maxAge < myAge) {
    let limitAge = new MessageEmbed()
    .setDescription(`**The year you entered has passed the current year \`(${maxAge})\`**`)
    .setColor(client.color)
    .setTimestamp()
    return msg.channel.send(limitAge)
  }

  let succes = new MessageEmbed()
  .setDescription(`**You are ${checkAge} years old now**`)
  .setColor(client.color)
  return msg.channel.send(succes);


 /*function checkAge(age) {
  let data = moment(+new Date()).format("YYYY") - age
  return data
 }*/

 }
}
