const Canvas = require("canvas");
const { AttachmentBuilder } = require('discord.js');
const background = "https://i.imgur.com/FiTzRzo.jpg";

const dim = {
    height: 720,
    width: 1280,
    margin: 64,
    pad: 32,
}

const generateImage = async (msg) => {

    const canvas = Canvas.createCanvas(dim.width, dim.height);
    const ctx = canvas.getContext("2d");

    //background
    const backimg = await Canvas.loadImage(background);
    ctx.drawImage(backimg, 0, 0);

    // write text
    ctx.font = "64px Arial";
    ctx.textAlign = "left";

    ctx.fillStyle = (msg.DayChange.charAt(0) == "-") ? "red" : "green";
    ctx.fillText(`${msg.price} (${msg.DayChange})`, dim.width / 2 - dim.pad, dim.margin + dim.pad);

    ctx.fillStyle = "white";
    ctx.fillText(`${msg.symbol}`, dim.margin, dim.margin + dim.pad);
    ctx.fillText(`${msg.AvgPrice}\n${msg.DayHigh}\n${msg.DayLow}\n\n${msg.OpenPrice}\n${msg.ClosePrice}`, dim.margin, dim.margin + dim.pad * 6);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), "result.png");
    return attachment;
}

module.exports = generateImage;