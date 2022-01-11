const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ajuda")
    .setDescription("Todos os comandos do bot"),
  run: async (interaction) => {
    interaction.reply({ content: `Comandos atuais:\n/ajuda\n/play\n/ping` });
  },
};
