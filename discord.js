const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client(
  { intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
    ]
  }
);

client.on('messageCreate', message => {
  if(message.author.bot) return; //BOTのメッセージには反応しない

  if(message.content === "こんにちわ") {
    message.channel.send("こんにちわ！");
    message.channel.send("message",{ file: { attachment: "IMG_20241023_121952.jpg"} });
  }
});

client.on('ready', () => {
  console.log('ボットが起動したよ');
});
client.login("");