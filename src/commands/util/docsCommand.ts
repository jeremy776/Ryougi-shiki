const fetch = require("node-superfetch");

export default {
   name: "docs",
   aliases: ["discord.js", "discordjs", "discord-js"],
   description: "docs",
   execute(message, args, client) {

  const search = args[0];
  if (!search) return message.channel.send('Not found :(');
  let version = args[1];
  if (!version) version = `stable`;
  
  fetch(`https://djsdocs.sorta.moe/v1/main/${version}/embed?q=${search}`)
  .then(res => res.json())
  .then(body => {
    if (body === null) return message.channel.send("Not found :(")
    message.channel.send({ embed: body });
  })

 }
}
