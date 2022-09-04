const { default: axios } = require("axios");
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
    if (message.content.toLowerCase() == "!adastats") {
        axios.defaults.baseURL = 'https://api.binance.com';
        axios.get("/api/v3/ticker/24hr?symbol=ADAUSDT")
            .then(function (response) {
                let msg = `${response.data.symbol}
                Price Change - ${response.data.priceChange}
                Price Change Percent- ${response.data.priceChangePercent}
                Avg price - ${response.data.weightedAvgPrice}
                Prev Close Price - ${response.data.prevClosePrice}
                Last Price - ${response.data.lastPrice}
                High Price - ${response.data.highPrice}
                Low Price - ${response.data.lowPrice}
                `;
                message.reply(msg);
            });
    }
})


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
client.login(TOKEN);