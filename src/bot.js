// Util

const config = require("./config");
const fs = require("fs");

// Slash Commands
const { Client, Collection } = require("discord.js");
const slash = require("./util/slash");

// Checks
let finalIntents = [];
if (!Array.isArray(config.bot.intents)) {
  console.warn(
    "Intents in config file must be in an array, default intents will be used"
  );
} else {
  finalIntents = config.bot.intents;
  console.log("Loaded intents successfully from the config file");
}

const client = new Client({ intents: finalIntents });

// Commands
client.commands = new Collection();

const events = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));

events.forEach((event) => {
  const eventFile = require(`./events/${event}`);
  if (eventFile.oneTime) {
    client.once(eventFile.event, (...args) => eventFile.run(...args));
  } else {
    client.on(eventFile.event, (...args) => eventFile.run(...args));
  }
});

client.login(config.bot.token);
