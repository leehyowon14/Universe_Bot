const { BitField } = require("discord.js")

module.exports = {
    config: {
        name: `${prefix}unmute`,
        aliases: [`${prefix}언뮤트`],
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: "이 명령을 수행할 권한이 없습니다.", allowedMentions: {repliedUser: true} }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        let muteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!muteUser) return message.reply({content: "뮤트를 해제할 유저를 제공하지 않으셨습니다."}).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        });

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "이유 제공되지 않음."

        let muterole = message.channel.guild.roles.cache.find(r => r.name == "🧨뮤트")
        if (!muterole) return message.reply({ content: `Muted 역할이 존재하지 않습니다.` }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        });

        let isMuted = muteUser.roles.find(x => x == muterole.id);
        if (!isMuted) return message.reply({content: `실패: ${mutee.user}은(는) 뮤트된 유저가 아닙니다.`}).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        });
        
        muteUser.roles.remove(muterole.id).then(() => {
            message.channel.send({content: `${muteUser.user} 뮤트 해제됨.`}).then( (m) => {
                setTimeout(() => {
                    m.delete()
                }, 5000)
            })

            let embed = new EmbedBuilder()
                .setColor("#ED4245")
                .setAuthor({ name: `${message.guild.name} 에서 뮤트 해제되셨습니다.`, iconURL: message.guild.iconURL })
                .setDescription(`사유: ${reason}`)
                .setTimestamp()
                .setFooter({ text: 'Developed by sG.wolf' })

            muteUser.send({ embeds: [embed] })
        }).catch(e => {
            return message.reply({ content: `${muteUser.user} 뮤트 해제 실패 . (오류)`, allowedMentions: {repliedUser: true}}).then( (m) => {
                setTimeout(() => {
                    m.delete()
                }, 5000)
            })
        })

        embed = new EmbedBuilder()
            .setColor("#ED4245")
            .setAuthor({ name: `${message.guild.name} Modlogs`, iconURL: message.guild.iconURL })
            .addFields(
                [
                    {name: "Moderation:", value: "unmute"},
                    {name: "User:", value: muteUser.user.username},
                    {name: "Moderator:", value: message.author.username},
                    {name: "Reason:", value: reason},
                    {name: "Date:", value: message.createdAt.toLocaleString()}
                ]
            )
        try {
            bot.channels.cache.get("1016318887781994546").send({ embeds: [embed] })
        } catch (error) {
            message.reply({ embeds: [embed] })
        }
    }
}