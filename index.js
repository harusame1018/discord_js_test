const { Client, GatewayIntentBits, Events, Collection, PresenceUpdateStatus, ActivityType } = require('discord.js');
const fs = require('node:fs');
const naninuneno = require("./commands/naninuneno.js")
const time = require("./commands/time.js")
//const require = createRequire(import.meta.url);
require("dotenv").config({ debug: true });
const path = require('node:path');
//const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'MESSAGE_CONTENT'] });
const client = new Client({
  intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b)
});
let word = ["すごい！あたり！","残念外れだ","ふつー"];
client.on('messageCreate', message => {
  
  if(message.author.bot) return; //BOTのメッセージには反応しない

  if(message.content === "hey") {
    let usernamee = message.author.username;
    message.channel.send(usernamee + "さんこんにちわ！");
    message.channel.send({ files: ["IMG_20241023_121952.jpg"] });
  }
  if(message.content === "くじ") {
    let ransu = Math.floor(Math.random() * word.length);
    message.channel.send(word[ransu]);
  }
  if(message.content === "くず") {
    message.reply("あ゙？？？");
  }
  if(message.content === "サイト教えて") {
    message.reply("https://harusame-rpg.glitch.me/");
  }
  let randomm = Math.floor(Math.random() * 100);
  if(randomm === 1 && message.content === 草) {
    message.channnel.send("大草原アマゾン森林草ｗｗｗｗ(笑)");
  }
});
function kido() {
  client.on("messageCreate", message => {
    message.channel.send("Botが起動したよ");
  });
  
}
client.once(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    
    if (interaction.commandName === naninuneno.data.name) {
        try {
            await naninuneno.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    } else if(interaction.commandName === time.data.name) {
		try {
            await time.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
	}
	else {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }

});

client.on('ready', () => {
  console.log('ボットが起動したよ');
  /*client.user.setPresence({
    activities: [{ name: 'はるさめおいしいよ', type: 'WATCHING' }],
    status: 'online',
  });*/
  client.user.setActivity({ 
    name: '学校なう',
    type: ActivityType.Custom
});
kido();
});
//client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
let discord_token = process.env.DISCORD_TOKEN;
client.login(discord_token);
//client.login("");
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`${filePath} に必要な "data" か "execute" がありません。`);
	}
}
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`${interaction.commandName} が見つかりません。`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
	}
});
