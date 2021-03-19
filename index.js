var Discord = require('discord.js');
var fetch = require('node-fetch');

var bot = new Discord.Client();
var isReady = true;

bot.on('message', message => {
  if (isReady && message.content === '!tg')
  {
  isReady = false;
  let voiceChn = message.member.voiceChannel;

  if(!voiceChn){ 
    isReady = true;
    return message.channel.send('Viens vocal !'); 
  }
  var voiceChannel = message.member.voiceChannel;
  voiceChannel.join().then(connection =>
  {
     const dispatcher = connection.playFile('./Audio/tg.mp3');
     dispatcher.on("end", end => {
       voiceChannel.leave();
       });
   }).catch(err => console.log(err));
   isReady = true;
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
        "w2g_api_key": "4thd7mz1jflun254l4i18dsp9s5wif9rqwkcbh3u051vj0dr02jxvylc4gdcjihm",
        "share": "" + args,
        "bg_color": "#00ff00",
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

bot.login("NjM2NzQwNjE2NjM3OTA2OTcx.XbHRrw.VxLOZUa-4PQntqw3Sesz8OZLx4Y");
