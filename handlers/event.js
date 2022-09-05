const { readdirSync } = require("fs")

module.exports = (bot) => {
    const load = dirs => {
        let dir_path = `./events/${dirs}/`;
        const events = readdirSync(dir_path).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const event = require(`../events/${dirs}/${file}`);
            let eventName = file.split('.')[0];
            bot.on(eventName, event.bind(null, bot));
        };
    };
    ["client", "guild"].forEach(x => load(x));
};