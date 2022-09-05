const { EmbedBuilder } = require("discord.js")

module.exports = {
    config: {
        name: `${prefix}kick`,
        aliases: [`${prefix}킥`],
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has(["KICK_MEMBERS"])) return message.reply({ content: "이 명령을 수행할 권한을 가지고 있지 않습니다." }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        if(!kickMember) return message.channel.send({ content: "오류: 추방 할 유저를 멘션하거나 id를 제공하지 않으셨습니다." }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "이유 제공되지 않음."

        if(!message.guild.me.permissions.has(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send({ content: "오류: 봇이 이 명령을 수행할 권한을 가지고 있지 않습니다." }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        let embed = new EmbedBuilder()
            .setColor("#ED4245")
            .setAuthor({ name: `${message.guild.name} 에서 추방되셨습니다. (서버 재입장 가능)`, iconURL: message.guild.iconURL })
            .setDescription(`사유: ${reason}`)
            .setTimestamp()
            .setFooter({ text: 'Developed by sG.wolf' })

        kickMember.send({ embeds: [embed] })
        kickMember.send("https://discord.gg/hzn33H2KxN").then(() => 
        kickMember.kick()).catch(err => console.log(err))

        message.channel.send({content: `**${kickMember.user.tag}** has been kicked`}).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        embed = new EmbedBuilder()
            .setColor("#ED4245")
            .setAuthor({ name: `${message.guild.name} Modlogs`, iconURL: message.guild.iconURL })
            .addFields(
                [
                    {name: "Moderation:", value: "kick"},
                    {name: "User:", value: kickMember.user.username},
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