import RyougiClient from './handle/RyougiClient';
import app from "express";

const Discord = require("discord.js");
const client = new RyougiClient({disableMentions: 'everyone', fetchAllMembers:true});

app.get("/", function(req, res) {
 res.send("Hello World!");
})


client.run();
