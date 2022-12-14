const { EmbedBuilder, ChannelType } = require("discord.js");

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if (message.channel.type === ChannelType.DM) {
        let msgs = await message.channel.messages.fetch()
        if (msgs.reverse().first().id == message.id) {
            let embed = new EmbedBuilder()
                .setColor('#57F287')
                .setAuthor({ name :`π’ λ¬Έμμ μ£Όμμ¬ν­!` })
                .setDescription(`1. ν λ©μΈμ§μ λͺ¨λ  λ¬Έμ λ΄μ©μ λ΄μμ£ΌμΈμ. μ¬λ¬ λ©μΈμ§λ‘ λλ μ λ³΄λ΄μλ©΄ λ¬Έμ μ²λ¦¬κ° νλ€μ΄μ§λλ€.\n2. μ μ μ§μΌμ£ΌμΈμ. λ¬Έμμμ λλ€μμ΄ μλ² κ΄λ¦¬μλ€μκ² μ κ³΅λ©λλ€.\n3. μ΄ λ΄μκ² μ²μ λ©μΈμ§λ₯Ό λ³΄λΈ κ²½μ°, κ·Έ λ©μΈμ§λ λ¬΄μλ©λλ€. (λ°©κΈμ μ λ³΄λΈ λ©μΈμ§κ° λ¬΄μλμμΌλ©°, μμΌλ‘μ λ©μΈμ§λ λ¬΄μλμ§ μμ΅λλ€.)`)
                .setTimestamp()
                .setFooter({ text: 'Developed by sG.wolf' })
            return message.channel.send({embeds: [embed]});
        }
        let msg = `${message.author.tag}(${message.author}) : ${message.content}`
        try{
            bot.channels.cache.get("1016312997876084807").send(msg);
            message.reply("λ¬Έμκ° μ±κ³΅μ μΌλ‘ μλ£λμμ΅λλ€.")
        } catch(e) {
            message.reply("λ¬Έμμ μ€ν¨νμμ΅λλ€. λ€μ νλ² μλνμ¬μ£ΌμΈμ.")
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