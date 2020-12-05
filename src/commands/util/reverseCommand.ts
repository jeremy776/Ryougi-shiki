import { MessageEmbed } from "discord.js";

export default {
   name: "reverse",
   aliases: ["reversed"],
   cooldown:1,
   description: "just reverse the writing",
   execute(msg, args, client) {

   try {
    args = args.join(" ") || "None";
    let reversed = "";
    for (let i = args.length - 1; i >= 0; i--) {
      reversed += args[i];
    }
    return msg.channel.send(reversed);
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }

 }
}
