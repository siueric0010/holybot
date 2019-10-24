const Discord = require('discord.js');
var auth = require('./auth.json');
const prefix = '.'

// Initialize Discord Bot
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Connected');
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === `${prefix}server`) {
    msg.channel.send(`Server name: ${msg.guild.name} \nTotal members: ${msg.guild.memberCount}`);
  }
});

client.login(auth.token);