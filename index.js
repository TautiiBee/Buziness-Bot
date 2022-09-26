const { default: axios } = require("axios");
const { GatewayIntentBits } = require("discord.js");
const Discord = require("discord.js");
const generateImage = require("./generateImage")
require("dotenv").config()

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
    if (message.channel.id == process.env.CHANNEL_ID) {
        let coinName = message.content.slice(6);
        if (message.content == `!stats${coinName}`) {
            axios.defaults.baseURL = 'https://api.binance.com';
            axios.get(`/api/v3/ticker/24hr?symbol=${coinName.toUpperCase()}USDT`)
                .then(async function (response) {
                    let msg = getBotMessage(response);
                    const img = await generateImage(msg);
                    message.channel.send({ files: [img] });
                }).catch(function (error) {
                    message.reply(`Kažkokia chuinia parašei (${error.response.status} ${error.response.statusText})`);
                });
        }
    }
})


function getBotMessage(response) {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    return {
        symbol: `${response.data.symbol}`,
        price: `$${dollarUSLocale.format(response.data.lastPrice)} `,
        DayChange: `${response.data.priceChangePercent}%`,
        AvgPrice:  `Avg Price:   $${dollarUSLocale.format(response.data.weightedAvgPrice)}`,
        DayHigh:   `24hHigh:     $${dollarUSLocale.format(response.data.highPrice)}`,
        DayLow:    `24h Low:     $${dollarUSLocale.format(response.data.lowPrice)}`,
        OpenPrice: `Open Price: $${dollarUSLocale.format(response.data.openPrice)}`,
        ClosePrice:`Close Price: $${dollarUSLocale.format(response.data.prevClosePrice)}`,
    };
}

client.login(process.env.TOKEN);