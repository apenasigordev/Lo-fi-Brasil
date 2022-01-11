const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Latência do bot"),
  run: async (interaction) => {
    interaction.reply({ content: `Pong! ${interaction.client.ws.ping} ms` });
  },
};
