module.exports = {
    config: {
        name: `${prefix}ping`,
        aliases: [`${prefix}핑`],
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (args[0]) {
            return;
        }
        message.channel.send({ content: `🏓 Ping!` }).then(m => {
            // m.edit(`🏓 Pong! (💙: ${m.createdTimestamp - message.createdTimestamp}ms. :purple_heart:: ${Math.round(bot.ws.ping)}ms.)`);
            m.edit(`🏓 Pong! (💙: ${m.createdTimestamp - message.createdTimestamp}ms.)`);
        });
    }
}