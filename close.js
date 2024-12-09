const { Client, GatewayIntentBits, Events, Collection, PresenceUpdateStatus, ActivityType } = require('discord.js');
const fs = require('node:fs');
//const require = createRequire(import.meta.url);
require("dotenv").config({ debug: true });
const path = require('node:path');
//const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'MESSAGE_CONTENT'] });
const client = new Client({
  intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b)
});

function tojiru() {
  client.on("messageCreate", message => {
    message.channel.send("BOTをシャットダウン");
  });
  
}

client.on('ready', () => {
  console.log('ボットが起動したよ');
  /*client.user.setPresence({
    activities: [{ name: 'はるさめおいしいよ', type: 'WATCHING' }],
    status: 'online',
  });*/
  
tojiru();
});
//client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
let discord_token = process.env.DISCORD_TOKEN;
client.login(discord_token);
//client.login("");
