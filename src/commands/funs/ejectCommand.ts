import { MessageEmbed } from "discord.js";

export default {
  name: "eject",
  cooldown: 2,
  descritpion: "who is the impostor?",
  guildOnly:true,
  execute(msg, args, client) {

  let user = msg.mentions.users.first()
  let noUser = new MessageEmbed()
  .setDescription("**User not found**")
  .setColor(client.color)
  if(!user) return msg.channel.send(noUser);

  let isImpostors = "true false ".repeat(100);
  let impostor = isImpostors.split(" ");

  let random = Math.floor(Math.random() * impostor.length);
  let a = impostor[random];

  let color = ["black", "blue", "brown", "cyan", "darkgreen", "lime", "orange", "pink", "purple", "red", "white", "yellow"];
  let randomColor = Math.floor(Math.random() * color.length);
  let colorRandom = color[randomColor];

  let embed = new MessageEmbed()
  .setImage(`https://vacefron.nl/api/ejected?name=${user.username}&impostor=true&crewmate=blue`)
  .setColor(client.color)
  .setTimestamp()
  .setFooter(`${msg.author.username} has voted ${user.username}`)
  return msg.channel.send(embed);
 }
}
