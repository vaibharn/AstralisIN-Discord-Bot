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

client.on("message", async message => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;

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

  if(command === "whosnoob") {
    if(message.author.username==='ShaXd0w')
      message.channel.send("Everyone except you.");
    else
      message.channel.send("You are, " +message.author);
  }

  if(command === "about") {
    message.channel.send("WE ARE ASTRALIS INDIA");
  }

  if(command === 'hello' || command === 'hi' || command === 'yo' || command === 'hey'){
    message.channel.send('Hey ' + message.author + '!');
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
  
  //getSteamID
  function getSteam(auth){
    client.msgs = require("./SteamID.json");
      for(var i=0; i<6; i++) {
        if(client.msgs.users[i].name===auth) {
          message.channel.send("Steam ID: " +client.msgs.users[i].steam);
          return client.msgs.users[i].steam;
        }
      }
      message.channel.send("Only available for Astralis India Members.");
  }

  if(command==='steam'){
    var auth = message.author.username;
    getSteam(auth);
  }

  //getData
   function getData(auth){
    const http = require('http');
      const fs = require('fs');
      const file = fs.createWriteStream("./data.json");
      var url = "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=3E86C7FFBED78E0426C95C4351EC1B0E&steamid="+auth;
      const request = http.get(url, function(response) {
      response.pipe(file);
      
});

  }

  //getDataCall
   function getDataCall() {
    var auth = message.author.username;
    var send = getSteam(auth);
     getData(send);
    message.channel.send('Data retrieved');
    return 1;
  }

  //fact
   if(command === 'fact') {
       getDataCall();
      'use strict';
      if(getSteam(message.author.username)===""){
        message.channel.send("Only Available for Astralis India Members");
        return;
      }
      message.channel.send("Some stats about : " +message.author);
      const fs = require('fs');
      let rawData = fs.readFileSync('./data.json') ;
      //console.log(rawData);
      let proData=JSON.parse(rawData);
      client.msgs=proData;
      for(var i=0; i<2; i++) {
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
      const desc="Prefix is +\nping\nwhosgay\nwhospro\nabout\nlineup\nsay\nfacts\nmaps\nmatchs\nmatchv"
      const embed = new RichEmbed()
        .setTitle('AstralisIN Discord Bot Commands')
        .setColor(0xFF0000)
        .setDescription(desc)
      message.channel.send(embed);
  }
  
 
  });

client.login(config.token);
