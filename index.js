const { default: axios } = require("axios");
const { GatewayIntentBits } = require("discord.js");
const Discord = require("discord.js");
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

    let coinName = message.content.slice(6);
    if (message.content == `!stats${coinName}`) {
        axios.defaults.baseURL = 'https://api.binance.com';
        axios.get(`/api/v3/ticker/24hr?symbol=${coinName.toUpperCase()}USDT`)
            .then(function (response) {
                let msg = getBotMessage(response);
                message.reply(msg);
            }).catch(function (error) {
                message.reply(`Kažkokia chuinia parašei (${error.response.status} ${error.response.statusText})`);
            });
    }
})


function getBotMessage(response) {
    let dollarUSLocale = Intl.NumberFormat('en-US');

    return `
    ${response.data.symbol}
    Price: ${dollarUSLocale.format(response.data.lastPrice)}$ 
    Price Change Percent: ${response.data.priceChangePercent}%
    Avg price: ${dollarUSLocale.format(response.data.weightedAvgPrice)}$
    Previous Close Price: ${dollarUSLocale.format(response.data.prevClosePrice)}$
    Day High Price: ${dollarUSLocale.format(response.data.highPrice)}$
    Day Low Price: ${dollarUSLocale.format(response.data.lowPrice)}$
    `;
}

// function getBotMessage(response) {
//     return `
//     ${response.data.symbol}
//     Price - ${response.data.lastPrice}
//     Day High Price - ${response.data.highPrice}
//     Day Low Price - ${response.data.lowPrice}
//     `;
// }

// {
//     symbol: 'ADAUSDT',
//     priceChange: '0.02260000',
//     priceChangePercent: '4.707',
//     weightedAvgPrice: '0.49280593',
//     prevClosePrice: '0.48000000',
//     lastPrice: '0.50270000',
//     lastQty: '270.30000000',
//     bidPrice: '0.50270000',
//     bidQty: '28778.50000000',
//     askPrice: '0.50280000',
//     askQty: '10091.20000000',
//     openPrice: '0.48010000',
//     highPrice: '0.51000000',
//     lowPrice: '0.47560000',
//     volume: '214725561.00000000',
//     quoteVolume: '105818029.43030000',
//     openTime: 1662225881604,
//     closeTime: 1662312281604,
//     firstId: 406214884,
//     lastId: 406438642,
//     count: 223759
//   }
client.login(process.env.TOKEN);