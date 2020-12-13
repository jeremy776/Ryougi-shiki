import { MessageEmbed } from "discord.js";
import moment from "moment";
import { CommandConf } from "../../decorators";
import type { Message } from "discord.js";
import Command from "../../handle/Command";

@CommandConf({
    name: "age",
    aliases: [],
    description: "check age",
    usage: "age 2007",
    cooldown: 3,
    ownerOnly: false
})

 export default class ageCommand extends Command {
   public async exec(msg:Message, args:string[]) {

  let maxAge = moment(Date.now()).format("YYYY")
  let myAge = args[0]

  if(!myAge) {
    let invalid = new MessageEmbed()
    .setDescription(`**example: ${this.client.config.prefix}age 2007**`)
    .setColor(this.client.color)
    .setTimestamp()
    return msg.channel.send(invalid)
 }

  if(isNaN(myAge as any)) {
    let nAn = new MessageEmbed()
    .setDescription("**It's not a number**")
    .setColor(this.client.color)
    .setTimestamp()
    return msg.channel.send(nAn)
 }

  let checkAge = +maxAge - (+myAge)

  if(checkAge > 100) {
    let limitAge = new MessageEmbed()
    .setDescription(`**This has crossed the limit of 100 years.**`)
    .setColor(this.client.color)
    .setTimestamp()
    return msg.channel.send(limitAge)
  }

  if(checkAge < 1) {
    let error = new MessageEmbed()
    .setDescription(`**Age cannot be under 1 year old (negative age)**`)
    .setColor(this.client.color)
    .setTimestamp()
    return msg.channel.send(error)
  }

  if(myAge > maxAge) {
    let limitAge = new MessageEmbed()
    .setDescription(`**The year you entered has passed the current year \`(${maxAge})\`**`)
    .setColor(this.client.color)
    .setTimestamp()
    return msg.channel.send(limitAge)
  }

  let succes = new MessageEmbed()
  .setDescription(`**You are ${checkAge} years old now**`)
  .setColor(this.client.color)
  return msg.channel.send(succes);


 /*function checkAge(age) {
  let data = moment(+new Date()).format("YYYY") - age
  return data
 }*/

 }
}
