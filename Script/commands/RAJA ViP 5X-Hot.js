const axios = require("axios");
const fs = require("fs");
const request = require("request");

const link = [
 "https://i.imgur.com/0l5UhmS.mp4",
"https://i.imgur.com/O3rar4t.mp4",
"https://i.imgur.com/ef28GQa.mp4",
"https://i.imgur.com/IhbvVXY.mp4",
"https://i.imgur.com/sttfCpY.mp4",
"https://i.imgur.com/Fz6MY3p.mp4",
"https://i.imgur.com/hqcPTYa.mp4",
"https://i.imgur.com/Q6NCh9l.mp4",
"https://i.imgur.com/LL699S0.mp4",
"https://i.imgur.com/VnP3rNL.mp4",
"https://i.imgur.com/gtUOcys.mp4",
"https://i.imgur.com/QQXBDqX.mp4",
"https://i.imgur.com/FUaM2vb.mp4",
"https://i.imgur.com/DE6DOAu.mp4",
"https://i.imgur.com/hPC7lCB.mp4",
"https://i.imgur.com/W3iA7JK.mp4",
"https://i.imgur.com/YNQjOUz.mp4",
"https://i.imgur.com/ZkRsBm9.mp4",
"https://i.imgur.com/VPnGC51.mp4",
"https://i.imgur.com/XA1hjYn.mp4",
"https://i.imgur.com/R7CWS6I.mp4",
"https://i.imgur.com/tFEJvku.mp4",
"https://i.imgur.com/qA6N92o.mp4",
"https://i.imgur.com/yxFA0j8.mp4",
"https://i.imgur.com/O8eVk6V.mp4",
"https://i.imgur.com/R0sXUMC.mp4",
"https://i.imgur.com/AY0egd1.mp4",
"https://i.imgur.com/maqUqQr.mp4",
"https://i.imgur.com/dZUaLxs.mp4",
"https://i.imgur.com/NsGQ6DN.mp4",
"https://i.imgur.com/OBbOS03.mp4",

];

module.exports.config = {
 name: "/hot",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "RAJA ViP 5X",
 description: "auto reply to salam",
 commandCategory: "noprefix",
 usages: "/hot",
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
 if (body.startsWith("/hot")) {
 const rahad = [
 "╭•┄┅════❁🌺❁════┅┄•╮\n\n𝘙𝘈𝘑𝘈 𝘝𝘪𝘗 5𝘟 𝘏𝘖𝘛 𝘝𝘪𝘋𝘌𝘖\n\n╰•┄┅════❁🌺❁════┅┄•╯",
 "╭•┄┅════❁🌺❁════┅┄•╮\n\n 𝘙𝘈𝘑𝘈 𝘝𝘪𝘗 5𝘟 𝘏𝘖𝘛 𝘝𝘪𝘋𝘌𝘖\n\n╰•┄┅════❁🌺❁════┅┄•╯"

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
 if (typeof data["/hot"] === "undefined" || data["/hot"]) data["/hot"] = false;
 else data["/hot"] = true;
 await Threads.setData(threadID, { data });
 global.data.threadData.set(threadID, data);
 api.sendMessage(`${(data["/hot"]) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
