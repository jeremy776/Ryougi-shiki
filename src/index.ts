import RyougiClient from './handle/RyougiClient';
import express from "express";
const app = express();

const Discord = require("discord.js");
const client = new RyougiClient({disableMentions: 'everyone', fetchAllMembers:true});

app.get("/", function(req, res) {
  res.send("Hello World");
})

app.listen(process.env.PORT);
client.run();
