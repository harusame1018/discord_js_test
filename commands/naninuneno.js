const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('naninuneno')
		.setDescription('なんか言われる'),
	execute: async function(interaction) {
		await interaction.reply('なんだてめえ');
	},
};