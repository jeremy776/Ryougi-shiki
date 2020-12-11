export default {
   name: "clapify",
   cooldown:2,
   description: "👏clapify👏text👏",
   execute(msg, args, client) {

   try {
    args = args.join("") || "Input Text";
    args = args.replace(//g, "👏");
    args += "👏";
    return msg.channel.send(`👏${args}`);
  } catch (e) {
    return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
  }

 }
}
