const { EmbedBuilder } = require("discord.js")

module.exports = {
    config: {
        name: `${prefix}ban`,
        aliases: [`${prefix}밴`],
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has(["BAN_MEMBERS"])) return message.reply({ content: "이 명령을 수행할 권한을 가지고 있지 않습니다." }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        if(!banMember) return message.channel.send({ content: "오류: 차단 할 유저를 멘션하거나 id를 제공하지 않으셨습니다." }).then( (m) => {
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

        let embed = new EmbedBuilder()
            .setColor("#ED4245")
            .setAuthor({ name: `${message.guild.name} 에서 차단되셨습니다.`, iconURL: message.guild.iconURL()})
            .setDescription(`사유: ${reason}`)
            .setTimestamp()
            .setFooter({ text: 'Developed by sG.wolf' })

        banMember.send({ embeds: [embed] }).then(() => 
        banMember.ban({ deleteMessageDays: 0, reason: reason })).catch(err => console.log(err))
        // message.guild.members.cache.ban(banMember, { days: 0, reason: reason})).catch(err => console.log(err))

        message.channel.send({content: `**${banMember.user.tag}** has been banned`}).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        embed = new EmbedBuilder()
            .setColor("#ED4245")
            .setAuthor({ name: `${message.guild.name} Modlogs`, iconURL: message.guild.iconURL()})
            .addFields(
                [
                    {name: "Moderation:", value: "ban"},
                    {name: "User:", value: banMember.user.username},
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