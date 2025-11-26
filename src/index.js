// 1. Create your bot client

// This initializes the Discord bot.

// 2. Load commands

// It reads all files from src/commands/** and adds them to the bot.

// 3. Load events

// It reads all event files from src/events/** and runs them.

// 4. Login using your bot token

// (Stored in .env file)


const {Client,GatewayIntentBits,Collection}=require('discord.js');
const fs=require('fs');
const path=require('path');
require('dotenv').config();

const connectDB = require('./database/connect');
// 1)
const client=new Client({
    intents:[GatewayIntentBits.Guilds]
});

client.commands=new Collection();

//2)
const commandsFolder=path.join(__dirname,'commands');
const commandsCategories=fs.readdirSync(commandsFolder);


for(const folder of commandsCategories){
    const folderPath=path.join(commandsFolder,folder);
    const  commandsFiles=fs.readdirSync(folderPath).filter(file=>file.endsWith('.js'));

    for(const file of commandsFiles){
        const command=path.join(folderPath,file);
        client.commands.set(command.data.name,command);
    }

}

//3)
const eventsPath=path.join(__dirname,'events');
const eventFolders=fs.readdirSync(eventsPath);
const eventFiles=fs.readdirSync(eventsPath).filter(file=>file.endsWith('.js'));


for (const folder of eventFolders) {
    const folderPath = path.join(eventsPath, folder);
    const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

    for (const file of eventFiles) {
        const event = require(path.join(folderPath, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

//4)
(async () => {
    await connectDB();
    client.login(process.env.TOKEN);
})();