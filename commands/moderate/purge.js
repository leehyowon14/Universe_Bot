const { EmbedBuilder } = require("discord.js")

module.exports = {
    config: {
        name: `${prefix}purge`,
        aliases: [`${prefix}청소`, `${prefix}clear`],
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: "이 명령을 수행할 권한을 가지고 있지 않습니다." }).then( (m) => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        const amount = parseInt(args[0]) || 1;

        if (amount != 1) {
            if (amount < 100) {
                message.channel.bulkDelete(amount + 1, true);
            } else {
                for (let i = 0; amount < 100; i++) {
                    message.channel.bulkDelete(100, true);
                    amount = amount - 100
                }
                message.channel.bulkDelete(amount + 1, true);
            }
        }

        embed = new EmbedBuilder()
            .setColor("#ED4245")
            .setAuthor({ name: `${message.guild.name} Modlogs`, iconURL: message.guild.iconURL })
            .addFields(
                [
                    {name: "Moderation:", value: "purge"},
                    {name: "Moderator:", value: message.author.username},
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