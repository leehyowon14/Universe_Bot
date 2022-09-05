const {Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const bot = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildBans,
            GatewayIntentBits.GuildEmojisAndStickers,
            //GatewayIntentBits.GuildIntegrations,
            //GatewayIntentBits.GuildInvites,
            //GatewayIntentBits.GuildMessageReactions,
            //GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildPresences,
            //GatewayIntentBits.GuildScheduledEvents,
            //GatewayIntentBits.GuildVoiceStates,
            //GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.MessageContent
        ],
        partials: [
            Partials.Channel
        ]
    }
);

const prefix = "!"
global.prefix = prefix;

["aliases", "commands"].forEach( x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login("Token Here")