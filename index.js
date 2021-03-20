var Discord = require('discord.js');
var fetch = require('node-fetch');

var bot = new Discord.Client();
var isReady = true;

var timeNuke;
var nukeUsed;
var useNuke;

bot.on('message', message => {
  if (isReady && message.content === '!tg')
  {
  isReady = false;
  let voiceChn = message.member.voice.channel;
  if(!voiceChn){ 
    isReady = true;
    return message.channel.send('Viens vocal !'); 
  }
  voiceChn.join().then(connection =>
  {
     const dispatcher = connection.play('./Audio/tg.mp3');
     dispatcher.on("finish", end => {
      connection.disconnect();
       });
   }).catch(err => console.log(err));
   isReady = true;
  }
});

bot.on('message', message => {
  if (isReady && message.content === '!nuke')
  {
  isReady = false;
  let voiceChn = message.member.voice.channel;

  // TODO : HashMap nukeUsed pour chaque serveur.

  if(!voiceChn){ 
    isReady = true; 
    return 0; 
  }
  
  
  if (timeNuke === undefined){
    timeNuke = Date.now();
    nukeUsed = timeNuke - 1;
  } else {
    timeNuke = Date.now();
  }

  if (nukeUsed < timeNuke){
    useNuke = true;
    nukeUsed = timeNuke + 36000000;
  } else {
    message.channel.send("Prochaine nuke dispo dans : " + ((nukeUsed - timeNuke) /1000) + " secondes.");
  }

  
  

  if (useNuke){
    useNuke = false;
    voiceChn.join().then(connection =>
      {
         const dispatcher = connection.play('./Audio/nuke.mp3');
         dispatcher.on("finish", end => {

          voiceChn.members.forEach(member => {
            member.voice.setChannel(null);
          });

          connection.disconnect();
           });
       }).catch(err => console.log(err));
       isReady = true;
      } else {
        isReady = true;
      }
  }
  
  


});

bot.on('message', async message => {
  if (message.author.bot) return;
  if (isReady && message.content.indexOf("!wt") === 0){
  isReady = false;
  const args = "" + message.content.slice(3).trim().split(/ +/g);
  fetch("https://w2g.tv/rooms/create.json", {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "w2g_api_key": process.env.tokenW2G,
        "share": "" + args,
        "bg_color": "#000000",
        "bg_opacity": "50"
    })
})
.then(response => response.json())
.then(function (data) {
  message.channel.send("Yep! \n https://w2g.tv/rooms/" + data.streamkey);
});   
  isReady = true;

  }
});

bot.login(process.env.token);
