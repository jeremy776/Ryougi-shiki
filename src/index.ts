import RyougiClient from './handle/RyougiClient';
import express from "express";
const app = express();

const Discord = require("discord.js");
const client = new RyougiClient({disableMentions: 'everyone', fetchAllMembers:true});

app.set("views", "src/views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index.ejs", {
   bot: client
  });
});

app.listen(process.env.PORT);
client.run();
