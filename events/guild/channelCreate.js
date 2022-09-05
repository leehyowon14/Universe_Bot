const { EmbedBuilder } = require("discord.js");
module.exports = async (bot, channel) => {
    let embed = new EmbedBuilder()
        .setColor('#57F287')
        .setTitle('Channel Log')
        .addFields(
            [
                {name: 'Log-Type', value: 'Channel Create'},
                {name: 'Channel Name', value: channel.name},
                {name: 'Channel Type', value: channel.type.toString()}
            ]
        )
        .setTimestamp()
    bot.channels.cache.get("1016318887781994546").send({ embeds: [embed] })

    let muterole = message.channel.guild.roles.cache.find(r => r.name == "🧨뮤트")
    if (muterole) {
        try {
            channel.permissionOverwrites.create(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false,
            })
        } catch (e) {
            console.log(e.stack);
        }
    }
}