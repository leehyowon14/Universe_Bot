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
            .setTitle('울프봇 명령어')
            .setAuthor({ name:'울프봇 도움말', url: img })
            .addFields(
                {name: '\u200B', value:'\u200B'},
                {name: '!ping/핑', value:'이쒸'},
                {name: '!아바타 [멘션]', value:'아바타 보기.'},
                {name: '\u200B', value:'\u200B'},
                {name: `${prefix}moderate/${prefix}관리자`, value:'관리자 명령어'},
            )
            .setTimestamp()
            .setFooter({ text: 'Developed by sG.wolf'})

        message.channel.send({ embeds: [embed] })
    }
}