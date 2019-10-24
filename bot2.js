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
    var keys = msg.guild.members.keyArray();
    msg.channel.send(`Server name: ${msg.guild.name} \nTotal members: ${msg.guild.memberCount}`);
    msg.channel.send(`All Users In ${msg.guild.name}: `);
    // msg.channel.send(user_and_id_1);
    // msg.channel.send(user_and_id_2);
    // console.log(msg.guild.members.get(msg.guild.members.firstKey()).user.username);
  } else if  (msg.content === `${prefix}update`) {
    /*var keys = msg.guild.members.keyArray();
    for(var i = 0; i < keys.length; i++) {
        user_and_id = user_and_id + msg.guild.members.get(keys[i]).user.username + " " + keys[i]+ "\n";
    }
*/    
}
});

client.login(auth.token);