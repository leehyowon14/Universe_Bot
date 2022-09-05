const { BitField } = require("discord.js")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    config: {
        name: `${prefix}mute`,
        aliases: [`${prefix}뮤트`],
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: "이 명령을 수행할 권한이 없습니다.", allowedMentions: {repliedUser: true} }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        let muteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!muteUser) return message.channel.send({content: "뮤트할 유저를 제공하지 않으셨습니다."}).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        });

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "이유 제공되지 않음."

        let muterole = message.channel.guild.roles.cache.find(r => r.name == "🧨뮤트")
        if (!muterole) {
            try {
                muterole = await message.guild.roles.create({name: "🧨뮤트", color: "#000000", reason: reason})
                muterole.setPermissions(new BitField(0));
                
                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.permissionOverwrites.create(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    })
                })
            } catch (e) {
                console.log(e.stack);
            }
        }

        muteUser.roles.add(muterole.id).then(() => {
            message.channel.send({content: `${muteUser.user} 뮤트됨.`}).then( (m) => {
                setTimeout(() => {
                    m.delete()
                }, 5000)
            })

            let embed = new EmbedBuilder()
                .setColor("#ED4245")
                .setAuthor({ name: `${message.guild.name} 에서 뮤트되셨습니다.`, iconURL: message.guild.iconURL })
                .setDescription(`사유: ${reason}`)
                .setTimestamp()
                .setFooter({ text: 'Developed by sG.wolf' })

            muteUser.send({ embeds: [embed] })
        }).catch(e => {
            return message.reply({ content: `${muteUser.user} 뮤트실패 . (오류)`, allowedMentions: {repliedUser: true}}).then( (m) => {
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
                    {name: "Moderation:", value: "mute"},
                    {name: "User:", value: muteUser.user.username},
                    {name: "Moderator:", value: message.author.username},
                    {name: "Reason:", value: reason},
                    {name: "Date:", value: message.createdAt.toLocaleString()}
                ]
            )
        try {
            bot.channels.cache.get("1016318887781994546").send({ embeds: [embed] })
        } catch (error) {
            message.channel.send({ embeds: [embed] })
        }
    }
}