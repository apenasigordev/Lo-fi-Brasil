const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const config = require(".././config");
const { Client, Collection } = require("discord.js");
const client = new Client({ intents: config.bot.intents });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Toca a rádio ao vivo"),
  run: async (interaction ) => {
const channel = interaction.member.voice.channel;
    if(!channel) return interaction.reply({content: "🎧 | Entre em um canal de voz"})
    const connection = joinVoiceChannel({
	channelId: channel.id,
	guildId: channel.guild.id,
	adapterCreator: channel.guild.voiceAdapterCreator,
});
    const player = createAudioPlayer();
    const resource = createAudioResource(process.env.stream_relay);
    connection.subscribe(player)
    player.play(resource);
    interaction.reply({content: "Tocando rádio Lo-Fi Brasil agora mesmo"});
  },
};
