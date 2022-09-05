const {Client, Collection} = require("discord.js");
const bot = new Client(
    {
        intents: 32767
    }
);

const prefix = "!"
global.prefix = prefix

["aliases", "commands"].forEach( x => bot[x] = new Collection())
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login("token Here")