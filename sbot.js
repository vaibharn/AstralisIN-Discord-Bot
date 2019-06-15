// Load up the discord.js library
const { Client, RichEmbed } = require('discord.js');
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Under Development`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  guild.channel.send("Greetings from AstralisIN. Thanks for adding our Bot to your server!")
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
/*
client.on('message', async message => {
  // If the message is "how to embed"
  if (message.content === 'lineup') {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
    const desc="Mansehej \'ShaXd0w\' Singh (Captain)\nAbhay \'The Darkness\' Kaul\nVaibhav \'Vaibharn\' Sharan\nS. M. \'kamiJack\' Aadithya\nRahul \'W1ldcraft\' Subramanyam"
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle('Lineup')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(desc)
      //.setDescription('Mansehej \'ShaXd0w\' Singh\nAbhay \'The Darkness\' Kaul\nVaibhav '\vaibharn\' Sharan\nS. M. \'kamiJack\' Aadithya\nRahul \'W1ldcraft\' Subramanyam\nAyush \'Nexus\' Sharma');
    // Send the embed to the same channel as the message
    message.channel.send(embed);

    if()
  }
});
*/

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  if(command === "whosgay") {
    message.channel.send("Mik");
  }
  if(command === 'thanks') {
    message.channel.send("My pleasure");
  }
  if(command === 'thank you') {
    message.channel.send("You're welcome");
  }
  if(command === "whospro") {
    message.channel.send("AstralisIN");
  }
  if(command === "about") {
    message.channel.send("WE ARE ASTRALIS INDIA");
  }
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }

  if (command === 'lineup') {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
    const desc="Mansehej \'ShaXd0w\' Singh (Captain)\nDeveshwar \'Gho$t'\ Manral\nAbhay \'The Darkness\' Kaul\nVaibhav \'vaibharn\' Sharan\nS. M. \'kamiJack\' Aadithya\nRahul \'W1ldcraft\' Subramanyam"
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle('Lineup')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(desc)
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  }
  
 

    //fact
    if(command === 'facts') {
      'use strict';
      message.channel.send("Some stats about ShaXd0w: ");
      const fs = require('fs');
      client.msgs = require("./data.json");
        for(var i=0; i<10; i++) {
        let _namev = client.msgs.playerstats.stats[i].name;
        let _message = client.msgs.playerstats.stats[i].value;
        message.channel.send(_namev +" : " + _message);
      } 
    }

    function matchv() {
      'use strict';
      message.channel.send("Last match data of Vaibharn");
      const fs = require('fs');
      client.msgs = require("./Match/CSvaibharn.json");

      for(var i=0; i<1; i++) {
        let _map = client.msgs.matches[i].map;
        let _t1s = client.msgs.matches[i].teams.team1.score;
        let _t2s = client.msgs.matches[i].teams.team2.score;
        let _result = client.msgs.matches[i].result;
        message.channel.send("Map : " +_map);
        message.channel.send("Score : " +_t1s +"-" +_t2s);

        message.channel.send("Playing 5:");
        for(var j=0; j<5; j++) {
          let _player = client.msgs.matches[i].teams.team1.players[j].name;
          //if(_player==='vaibharn')
          //  continue;
          let _kills = client.msgs.matches[i].teams.team1.players[j].kills;
          let _deaths = client.msgs.matches[i].teams.team1.players[j].deaths;
          let _mvps = client.msgs.matches[i].teams.team1.players[j].mvps;
          message.channel.send("\n--->   " +_player +" (K:" +_kills + " D: " +_deaths +")");
        }
        message.channel.send("Result : " +_result);
      } 
    }

    
    function matchs() {
      'use strict';
      message.channel.send("Last match data of ShaXd0w");
      const fs = require('fs');
      client.msgs = require("./Match/CSmansehej.json");

      for(var i=0; i<1; i++) {
        let _map = client.msgs.matches[i].map;
        let _t1s = client.msgs.matches[i].teams.team1.score;
        let _t2s = client.msgs.matches[i].teams.team2.score;
        let _result = client.msgs.matches[i].result;
        message.channel.send("Map : " +_map);
        message.channel.send("Score : " +_t1s +"-" +_t2s);

        message.channel.send("Playing 5:");
        for(var j=0; j<5; j++) {
          let _player = client.msgs.matches[i].teams.team1.players[j].name;
          //if(_player==='vaibharn')
          //  continue;
          let _kills = client.msgs.matches[i].teams.team1.players[j].kills;
          let _deaths = client.msgs.matches[i].teams.team1.players[j].deaths;
          let _mvps = client.msgs.matches[i].teams.team1.players[j].mvps;
          message.channel.send("\n--->   " +_player +" (K:" +_kills + " D: " +_deaths +")");
        }
        message.channel.send("Result : " +_result);
      } 
    }

    if(command === 'matchs') {
      matchs();
    }

    if(command === 'matchv') {
        matchv();
    }

    if(command === 'maps') {
      'use strict';
       message.channel.send("Map data of ShaXd0w (Last 1000 matches)");
      const fs = require('fs');
      client.msgs = require("./Match/CSmansehej.json");
      var w_mirage=0, l_mirage=0, p_mirage=0;
      var w_cache=0, l_cache=0, p_cache=0;
      var w_overpass=0, l_overpass=0, p_overpass=0;
      var w_dust2=0, l_dust2=0, p_dust2=0;
      var w_inferno=0, l_inferno=0, p_inferno=0;
      var w_train=0, l_train=0, p_train=0;
      var w_nuke=0, l_nuke=0, p_nuke=0;
      var w_office=0, l_office=0, p_office=0;
      var w_vertigo=0, l_vertigo=0, p_vertigo=0;
      var w_cobblestone=0, l_cobblestone=0;
      for(var i=0; i<1000; i++) {
        let _map = client.msgs.matches[i].map;
        //Mirage
        if(_map==='Competitive Mirage') {
          p_mirage++;
          let _result = client.msgs.matches[i].result;
          if(_result === 'Loss') {
            l_mirage++; 
          }
          else if(_result === 'Win') {
            w_mirage++;
          }
        }
        //Cache
        if(_map==='Competitive Cache') {
          p_cache++;
          let _result = client.msgs.matches[i].result;
          if(_result === 'Loss') {
            l_cache++; 
          }
          else if(_result === 'Win') {
            w_cache++;
          }
        }
        //Overpass
        if(_map==='Competitive Overpass') {
          p_overpass++;
          let _result = client.msgs.matches[i].result;
          if(_result === 'Loss') {
            l_overpass++; 
          }
          else if(_result === 'Win') {
            w_overpass++;
          }
        }
      }
      message.channel.send("MIRAGE");
      message.channel.send("Matches played: "+p_mirage);
      message.channel.send("Matches won: " +w_mirage);
      message.channel.send("Matches lost: " +l_mirage);
      message.channel.send("Matches tied: " +(p_mirage-(w_mirage+l_mirage)));

      message.channel.send("CACHE");
      message.channel.send("Matches played: "+p_cache);
      message.channel.send("Matches won: " +w_cache);
      message.channel.send("Matches lost: " +l_cache);
      message.channel.send("Matches tied: " +(p_cache-(w_cache+l_cache)));

      message.channel.send("OVERPASS");
      message.channel.send("Matches played: "+p_overpass);
      message.channel.send("Matches won: " +w_overpass);
      message.channel.send("Matches lost: " +l_overpass);
      message.channel.send("Matches tied: " +(p_overpass-(w_overpass+l_overpass)));

    }
              
    if (command === 'help') {
      const desc="Prefix is +\nping\nwhosgay\nwhospro\nabout\nlineup\nsay\nfacts"
      const embed = new RichEmbed()
        .setTitle('AstralisIN Discord Bot Commands')
        .setColor(0xFF0000)
        .setDescription(desc)
      message.channel.send(embed);

      
  /*
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
*/
  }
  
 /* if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  */
  /*if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }*/
  });

client.login(config.token);
