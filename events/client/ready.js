const EmbedBuilder = require("discord.js");
const moment = require('moment-timezone');

module.exports = bot => {
    bot.user.setActivity(`${prefix}help | 🌙 Universe`, {type: "PLAYING"})

    console.log(`'${bot.user.username}' is online!`)

    let embed = new EmbedBuilder()
        .setColor('#57F287')
        .setAuthor({ name :` ${bot.user.username} is now ONLINE!` })
        .setDescription(`${moment().tz('Asia/Seoul').locale('ko').format('ll dddd LTS')}`)
        .setTimestamp()
        .setFooter({ text: 'Developed by sG.wolf' })
    bot.channels.cache.get("1016311820354592788").send({embeds: [embed]});
}