const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: `${prefix}help`,
        aliases: [`${prefix}도움말`],
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        let embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('Universe Bot 명령어')
            .setAuthor({ name:'Universe Bot 도움말'})
            .addFields(
                {name: '\u200B', value:'\u200B'},
                {name: '!ping/핑', value:'이쒸'},
                {name: '!아바타/!avatar/!av [멘션]', value:'아바타 보기.'},
                {name: '\u200B', value:'\u200B'},
                {name: `${prefix}moderate/${prefix}관리자`, value:'관리자 명령어'},
            )
            .setTimestamp()
            .setFooter({ text: 'Developed by sG.wolf'})

        message.channel.send({ embeds: [embed] })
    }
}