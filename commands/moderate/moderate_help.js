const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: `${prefix}moderate`,
        aliases: [`${prefix}관리자`],
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: "이 명령을 수행할 권한이 없습니다." }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        let embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('Universe Bot (ADMIN)명령어')
            .setAuthor({ name: 'Universe Bot 도움말' })
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: `${prefix}ban [멘션/유저 id]`, value: '밴'},
                {name: `${prefix}kick [멘션/유저 id]`, value: '킥'},
                {name: `${prefix}mute [멘션/유저 id]`, value: '뮤트(Muted 역할이 없을때는 자동으로 생성됨)'},
                {name: `${prefix}clear [지울 메세지 수], ${prefix}청소[지울 메세지 수], ${prefix}purge [지울 메세지 수]`, value: '채팅지우기'},
                {name: `${prefix}unban [유저 닉네임/유저 id]`, value: '언밴'},
                {name: `${prefix}unmute [멘션/유저 id]`, value: '언뮤트'},
                {name: '\u200B', value: '\u200B'}
            )
            .setTimestamp()
            .setFooter({ text:'Developed by sG.wolf' })

        message.channel.send({ embeds: [embed] })
    }
}