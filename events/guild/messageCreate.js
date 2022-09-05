const { EmbedBuilder, ChannelType } = require("discord.js");

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if (message.channel.type === ChannelType.DM) {
        let msgs = await message.channel.messages.fetch()
        if (msgs.reverse().first().id == message.id) {
            let embed = new EmbedBuilder()
                .setColor('#57F287')
                .setAuthor({ name :`📢 문의시 주의사항!` })
                .setDescription(`1. 한 메세지에 모든 문의 내용을 담아주세요. 여러 메세지로 나눠서 보내시면 문의 처리가 힘들어집니다.\n2. 선을 지켜주세요. 문의자의 닉네임이 서버 관리자들에게 제공됩니다.\n3. 이 봇에게 처음 메세지를 보낸 경우, 그 메세지는 무시됩니다. (방금전에 보낸 메세지가 무시되었으며, 앞으로의 메세지는 무시되지 않습니다.)`)
                .setTimestamp()
                .setFooter({ text: 'Developed by sG.wolf' })
            return message.channel.send({embeds: [embed]});
        }
        let msg = `${message.author.tag}(${message.author}) : ${message.content}`
        try{
            bot.channels.cache.get("1016312997876084807").send(msg);
            message.reply("문의가 성공적으로 완료되었습니다.")
        } catch(e) {
            message.reply("문의에 실패하였습니다. 다시 한번 시도하여주세요.")
        }


        return;
    }

    let args = message.content.trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let commandFile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if (commandFile) {
        commandFile.run(bot, message, args)
    }
}