var Discord = require('discord.js');
var bot = new Discord.Client();
var isReady = true;

bot.on('message', message => {
  if (isReady && message.content === '!tg')
  {
  isReady = false;
  let voiceChn = message.member.voiceChannel;
  var random = getRandomInt(5000);

  if(!voiceChn){ 
    isReady = true;
    return message.channel.send('Viens vocal !'); 
  }
  var voiceChannel = message.member.voiceChannel;
  voiceChannel.join().then(connection =>
  {
    sleep(random)
     const dispatcher = connection.playFile('./Audio/tg.mp3');
     dispatcher.on("end", end => {
       voiceChannel.leave();
       });
   }).catch(err => console.log(err));
   isReady = true;
  }
});

bot.on('message', message => {
  if (isReady && message.content === '!wt')
  {
  isReady = false;

  message.channel.send('https://www.watch2gether.com/rooms/rdty570jqx5twlm7yd?lang=fr'); 
  isReady = true;
  }
});


bot.login(process.env.token);
