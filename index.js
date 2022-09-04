const { GatewayIntentBits } = require("discord.js");
const Discord = require("discord.js");

const TOKEN = "MTAxNTUyMjc2NTU0NzI0NTcyOA.GIFU5z.VQ7pc1ol_VBLm0dE0WA9dlfezIcFSYPp2By2ow";

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})


client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() == "hi"){
        message.reply(`Hello World`);
    }
})


client.login(TOKEN);