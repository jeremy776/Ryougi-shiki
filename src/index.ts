import RyougiClient from './handle/RyougiClient';

const Discord = require("discord.js");
const client = new RyougiClient({disableMentions: 'everyone', fetchAllMembers:true});

client.run();
