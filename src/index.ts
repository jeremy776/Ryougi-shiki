import RyougiClient from './handle/RyougiClient';
import express from "express";
const app = express();
const axios = require("axios");

const urls = ["https://ts-bot-1.herokuapp.com/"]
setInterval(function() {
            urls.forEach(url => {
            axios.get(url).then(console.log("Pong at " + Date.now())).catch(() => {});
        })
    }, 60 * 1000);

const Discord = require("discord.js");
const client = new RyougiClient({disableMentions: 'everyone', fetchAllMembers:true});

app.use(express.static("src/public"));
app.set("views", "src/views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index.ejs", {
   bot: client
  });
});

app.get("/image", function(req, res) {
  res.sendFile(__dirname + "/img_forest.jpg");
});

app.listen(process.env.PORT);
client.run();
