const axios = require("axios");
const fs = require("fs");
const request = require("request");

const link = [
 "https://i.imgur.com/tZ5yJks.mp4",

];

module.exports.config = {
 name: "@কা্ঁরে্ঁন্ট্ঁ সু্ঁন্দ্ঁর্ঁ",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "Islamick Chat",
 description: "auto reply to salam",
 commandCategory: "noprefix",
 usages: "@কা্ঁরে্ঁন্ট্ঁ সু্ঁন্দ্ঁর্ঁ",
 cooldowns: 5,
 dependencies: {
 "request":"",
 "fs-extra":"",
 "axios":""
 }
};

module.exports.handleEvent = async ({ api, event, Threads }) => {
 const content = event.body ? event.body : '';
 const body = content.toLowerCase();
 if (body.startsWith("@কা্ঁরে্ঁন্ট্ঁ সু্ঁন্দ্ঁর্ঁ")) {
 const rahad = [
 "╭•┄┅════❁🌺❁════┅┄•╮\n \n রাজা বস বিজি আছে যা বলবে আমাকে বলো-!!\n\n╰•┄┅════❁🌺❁════┅┄•╯",
 "╭•┄┅════❁🌺❁════┅┄•╮\n\n  রাজা বস বিজি আছে যা বলবে আমাকে বলো-!!\n\n╰•┄┅════❁🌺❁════┅┄•╯"

 ];
 const rahad2 = rahad[Math.floor(Math.random() * rahad.length)];

 const callback = () => api.sendMessage({
 body: `${rahad2}`,
 attachment: fs.createReadStream(__dirname + "/cache/2024.mp4")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2024.mp4"), event.messageID);

 const requestStream = request(encodeURI(link[Math.floor(Math.random() * link.length)]));
 requestStream.pipe(fs.createWriteStream(__dirname + "/cache/2024.mp4")).on("close", () => callback());
 return requestStream;
 }
};

module.exports.languages = {
 "vi": {
 "on": "Dùng sai cách rồi lêu lêu",
 "off": "sv ngu, đã bão dùng sai cách",
 "successText": `🧠`,
 },
 "en": {
 "on": "on",
 "off": "off",
 "successText": "success!",
 }
};

module.exports.run = async ({ api, event, Threads, getText }) => {
 const { threadID, messageID } = event;
 let data = (await Threads.getData(threadID)).data;
 if (typeof data["@কা্ঁরে্ঁন্ট্ঁ সু্ঁন্দ্ঁর্ঁ"] === "undefined" || data["@কা্ঁরে্ঁন্ট্ঁ সু্ঁন্দ্ঁর্ঁ"]) data["@কা্ঁরে্ঁন্ট্ঁ সু্ঁন্দ্ঁর্ঁ"] = false;
 else data["@কা্ঁরে্ঁন্ট্ঁ সু্ঁন্দ্ঁর্ঁ"] = true;
 await Threads.setData(threadID, { data });
 global.data.threadData.set(threadID, data);
 api.sendMessage(`${(data["@কা্ঁরে্ঁন্ট্ঁ সু্ঁন্দ্ঁর্ঁ"]) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
