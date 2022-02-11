const Discord = require('discord.js');
var auth = require('./auth.json');
var words = require('./accepted_words.json');

const prefix = '.'

function isAlpha(str) {
  for (var i = 0; i < str.length; i++) {
    var character = str.charCodeAt(i);
    if (!(character > 64 && character < 89) && // upper alpha (A-x)
        !(character > 96 && character < 121)) { // lower alpha (a-x)
      return false;
    }
  }
  return true;
};

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
  } else if  (msg.content.includes(`${prefix}blindfold`) && !client.user.tag.includes(msg.author.tag)) {
    const text = msg.content;
    const theString = text.split(`${prefix}blindfold `);
    console.log(theString);
    console.log(client.user.tag);
    console.log(msg.author.tag);
    if(theString.length > 1) {
      const blindfoldText = theString[1].split(' ');
      var edgeMessage = "";
      var cornerMessage = "";
      if(blindfoldText.length == 2 && isAlpha(blindfoldText[0]) && isAlpha(blindfoldText[1])) {
        if(blindfoldText[0].length % 2 != blindfoldText[1].length % 2) {
          msg.channel.send(`Edge Length mod 2 != Corner Length mod 2, redo blindfold position checks.`);
        } else {
          for(var j = 0; j < blindfoldText[0].length - 1; j+=2) {
            TwoChars = blindfoldText[0].charAt(j) + "" + blindfoldText[0].charAt(j + 1)
            if(TwoChars in words) {
              edgeMessage += words[TwoChars] + " ";
            } else {
              edgeMessage += TwoChars + " ";
            }
          }
          if(blindfoldText[0].length % 2 == 1) {
            edgeMessage += blindfoldText[0].charAt(blindfoldText[0].length - 1)
          }
          msg.channel.send(`Edge Sentence: ${edgeMessage}`);
  
          for(var j = 0; j < blindfoldText[1].length - 1; j+=2) {
            TwoChars = blindfoldText[1].charAt(j) + "" + blindfoldText[1].charAt(j + 1)
            if(TwoChars in words) {
              cornerMessage += words[TwoChars] + " ";
            } else {
              cornerMessage += TwoChars + " ";
            }
          }
          if(blindfoldText[1].length % 2 == 1) {
            cornerMessage += blindfoldText[1].charAt(blindfoldText[1].length - 1)
          }
          msg.channel.send(`Corner Sentence: ${cornerMessage}`);
  
          if(blindfoldText[0].length % 2 == 0) {
            msg.channel.send(`Even Parity: No parity algo required.`);
          } else {
            msg.channel.send(`Odd Parity: Parity algo required.`);
          }
        }

        

      } else {
        msg.channel.send(`Input only two valid alphabetical strings without Y or Z characters.`);
        msg.channel.send(`Example Input: .blindfold auxifjwmsk auxifjwmsk`);
      }
    }

    /*var keys = msg.guild.members.keyArray();
    for(var i = 0; i < keys.length; i++) {
        user_and_id = user_and_id + msg.guild.members.get(keys[i]).user.username + " " + keys[i]+ "\n";
    }
*/    
}
});

client.login(auth.token);