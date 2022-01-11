// Util
const config = require(".././config");
const fs = require("fs");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
// Slash Commands
const slash = require("../util/slash");

module.exports = {
  event: "ready", // Name of the event
  oneTime: true, // If set to true the event will only be fired once until the client is restarted
  run: async (client) => {
    const commandFiles = fs
      .readdirSync("./src/commands")
      .filter((file) => file.endsWith(".js"));

    let commandsArray = [];
    commandFiles.forEach((file) => {
      const command = require(`../commands/${file}`);
      client.commands.set(command.data.name, command);

      commandsArray.push(command);
    });

    const finalArray = commandsArray.map((e) => e.data.toJSON());
    slash.register(client.user.id, finalArray);
    console.log(`${client.user.tag} Started`);

    // 24/7 call
    const channel = client.channels.cache.get("895113399430676530")
    const connection = joinVoiceChannel({
	channelId: channel.id,
	guildId: channel.guild.id,
	adapterCreator: channel.guild.voiceAdapterCreator,
});
    const player = createAudioPlayer();
    const resource = createAudioResource(process.env.stream_relay);
    connection.subscribe(player)
    player.play(resource);
  },
};
