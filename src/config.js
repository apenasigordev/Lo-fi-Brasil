const { Intents } = require("discord.js");

const config = {
  bot: {
    token: process.env.token,
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    guildId: "",
  },
};

module.exports = config;
