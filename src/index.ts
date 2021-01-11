import RyougiClient from './handle/RyougiClient';
import express from "express";
import type { Message, TextChannel } from "discord.js";
const app = express();
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const passport = require("passport");
const axios = require("axios");
const Discord = require("discord.js");
const client = new RyougiClient({disableMentions: 'everyone', fetchAllMembers:true});

/*const urls = ["https://ts-bot-1.herokuapp.com/"]
setInterval(function() {
            urls.forEach(url => {
            axios.get(url).then(console.log("Pong at " + Date.now())).catch(() => {});
        })
    }, 60 * 1000);*/

passport.serializeUser(function(user: any, done: any) {
  done(null, user);
});
passport.deserializeUser(function(obj: any, done: any) {
  done(null, obj);
});

var scopes = ['identify'];
var prompt = 'consent'

passport.use(new Strategy({
    clientID: '654991873861222431',
    clientSecret: 'ilQ-0Y0PBIcLu5qyNGWcuzky1p1k1xEj',
    callbackURL: 'http://35.222.107.117/callback',
    scope: scopes,
    prompt: prompt
}, function(accessToken: any, refreshToken: any, profile: any, done: any) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("src/public"));
app.set("views", "src/views");
app.set("view engine", "ejs");
app.get('/login', passport.authenticate('discord', { scope: scopes, prompt: prompt }), function(req, res) {});
app.get('/callback',
    passport.authenticate('discord', {
      failureRedirect: '/'
    }), 
    async function(req:any, res:any) { 
      if (req.session.backURL) {
        res.redirect(req.session.backURL);
        req.session.backURL = null;
      } else {
        res.redirect('/')
      }
      let logs = client.channels?.cache.get(client.config.loginLogs) as TextChannel;
      let datanya = await client.db.get(`uang.${req.user.id}`);
      /*if(datanya) {
        logs.send(`**${req.user.username}#${req.user.discriminator}** is logged in to the dashboard`);
      }else
      if(!datanya) {
        client.db.set(`uang.${req.user.id}`, 5)
        logs.send(`**${req.user.username}#${req.user.discriminator}** is logged in to the dashboard - I have given **$5** for new users`)
      }*/
    }
);
app.get('/logout', function(req: any, res: any) {
    req.logout();
    res.redirect('/');
});

app.get("/", function(req: any, res: any) {
  res.render("index.ejs", {
   bot:client,
   user:req.user
  });
});

app.get("/userinfo", checkAuth, function(req: any, res: any) {
  res.send(req.user)
});

app.get("/me", checkAuth, function(req: any, res: any) {
  res.render("profile.ejs", {
    bot:client,
    user:req.user
  });
});

function checkAuth(req: any, res: any, next: any) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

app.listen(process.env.PORT);
client.run();
