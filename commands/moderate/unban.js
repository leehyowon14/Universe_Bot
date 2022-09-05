const { EmbedBuilder } = require("discord.js")

module.exports = {
    config: {
        name: `${prefix}unban`,
        aliases: [`${prefix}언밴`],
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has(["BAN_MEMBERS"])) return message.reply({ content: "이 명령을 수행할 권한을 가지고 있지 않습니다." }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        var banlist = await message.channel.guild.bans.fetch()

        var bannedMember = banlist.find(x => x.user.username == args[0]) || banlist.find(x => x.user.id == args[0])

        if(!bannedMember) return message.channel.send({ content: "오류: 차단 해제 할 유저의 닉네임이나 id를 제공하지 않으셨습니다." }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "이유 제공되지 않음."

        if(!message.guild.me.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send({ content: "오류: 봇이 이 명령을 수행할 권한을 가지고 있지 않습니다." }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        try {
            message.guild.members.unban(bannedMember.user.id, reason)
            message.channel.send({ content: `${bannedMember.user}의 밴이 해제되었습니다.` }).then( (m) => {
                setTimeout(() => {
                    m.delete()
                }, 5000)
            })
        } catch(e) {
            console.log(e.message)
        }

        embed = new EmbedBuilder()
            .setColor("#ED4245")
            .setAuthor({ name: `${message.guild.name} Modlogs`, iconURL: message.guild.iconURL })
            .addFields(
                [
                    {name: "Moderation:", value: "unban"},
                    {name: "User:", value: bannedMember.user.username},
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