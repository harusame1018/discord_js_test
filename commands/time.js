let time = new Date();
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('現在時刻を教えてくれるよ'),
	execute: async function(interaction) {
		await interaction.reply('今の時間は' + time + "だよ");
	},
};