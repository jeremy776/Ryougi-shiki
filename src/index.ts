import RyougiClient from './handle/RyougiClient';
import express from "express";
const app = express();
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const passport = require("passport");
const axios = require("axios");

const urls = ["https://ts-bot-1.herokuapp.com/"]
setInterval(function() {
            urls.forEach(url => {
            axios.get(url).then(console.log("Pong at " + Date.now())).catch(() => {});
        })
    }, 60 * 1000);

const Discord = require("discord.js");
const client = new RyougiClient({disableMentions: 'everyone', fetchAllMembers:true});

passport.serializeUser(function(user as any, done as any) {
  done(null, user);
});
passport.deserializeUser(function(obj as any, done as any) {
  done(null, obj);
});

var scopes = ['identify'];
var prompt = 'consent'

passport.use(new Strategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:5000/callback',
    scope: scopes,
    prompt: prompt
}, function(accessToken as any, refreshToken as any, profile as any, done as any) {
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
app.get('/', passport.authenticate('discord', { scope: scopes, prompt: prompt }), function(req, res) {});
app.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/info') } // auth success
);
app.get('/logout', function(req as any, res as any) {
    req.logout();
    res.redirect('/');
});

app.get("/", function(req as any, res as any) {
  res.render("index.ejs", {
   bot: client,
   user:req.user
  });
});

function checkAuth(req as any, res as any, next as any) {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
}

app.listen(process.env.PORT);
client.run();
