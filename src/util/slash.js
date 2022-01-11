const config = require("../config");
const empty = require("is-empty");

const slash = {
  register: async (client, commands) => {
    console.log("Loading slash commands")

    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v9");

    const rest = new REST({ version: "9" }).setToken(config?.bot?.token);

    try {
      const guildId = config.bot?.guildId;
      if (!empty(guildId) ?? !isNaN(guildId)) {
        await rest
          .put(Routes.applicationGuildCommands("930117271802773514",guildId), {
            body: commands,
          })
          .then(() => {
            return console.log(`Loaded Guild Slash Commands`);
          });
      } else {
        await rest
          .put(Routes.applicationCommands("930117271802773514"), { body: commands })
          .then(() => {
            console.log(`Loaded global Slash Commands`);
          });
      }
    } catch (error) {
      console.warn(`Could not load Slash Commands: \n ${error}`);
      //console.log(error.stack)
    }
  },
};

module.exports = slash;
