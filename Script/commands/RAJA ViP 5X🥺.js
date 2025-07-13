const axios = require("axios");
const fs = require("fs");
const request = require("request");

const link = [
"https://i.imgur.com/JxSYk0b.mp4",
"https://i.imgur.com/6LHAb4R.mp4",
"https://i.imgur.com/Vnuam22.mp4",
"https://i.imgur.com/h1TEgbn.mp4",
"https://i.imgur.com/iC5t8Xd.mp4",
"https://i.imgur.com/jRCtMZM.mp4",
"https://i.imgur.com/flgABWM.mp4",
"https://i.imgur.com/fTobCMI.mp4",
"https://i.imgur.com/4nWaJed.mp4",
"https://i.imgur.com/r2bzwnt.mp4",
"https://i.imgur.com/m1WJX4L.mp4",
"https://i.imgur.com/U3vUCU4.mp4",
"https://i.imgur.com/eCy6iyu.mp4",
"https://i.imgur.com/i0vXz4A.mp4",
"https://i.imgur.com/BNIR463.mp4",
"https://i.imgur.com/azfa064.mp4",
"https://i.imgur.com/NVkqTV3.mp4",
"https://i.imgur.com/oP4RHOZ.mp4",
"https://i.imgur.com/oTgxKfg.mp4",
"https://i.imgur.com/efpHAn8.mp4",
"https://i.imgur.com/MLtfe0L.mp4",
"https://i.imgur.com/s1HpoDU.mp4",
"https://i.imgur.com/X3FdGKj.mp4",
"https://i.imgur.com/cxxJ9mK.mp4",
"https://i.imgur.com/Yn4aJO2.mp4",
"https://i.imgur.com/qKX9s2j.mp4",
"https://i.imgur.com/Vnuam22.mp4",
"https://i.imgur.com/h1TEgbn.mp4",
"https://i.imgur.com/iC5t8Xd.mp4",
"https://i.imgur.com/jRCtMZM.mp4",
"https://i.imgur.com/flgABWM.mp4",
"https://i.imgur.com/fTobCMI.mp4",
"https://i.imgur.com/4nWaJed.mp4",
"https://i.imgur.com/r2bzwnt.mp4",
"https://i.imgur.com/m1WJX4L.mp4",
"https://i.imgur.com/U3vUCU4.mp4",
"https://i.imgur.com/eCy6iyu.mp4",
"https://i.imgur.com/i0vXz4A.mp4",
"https://i.imgur.com/BNIR463.mp4",
"https://i.imgur.com/azfa064.mp4",
"https://i.imgur.com/NVkqTV3.mp4",
"https://i.imgur.com/oP4RHOZ.mp4",
"https://i.imgur.com/oTgxKfg.mp4",
"https://i.imgur.com/efpHAn8.mp4",
"https://i.imgur.com/MLtfe0L.mp4",
"https://i.imgur.com/s1HpoDU.mp4",
"https://i.imgur.com/X3FdGKj.mp4",
"https://i.imgur.com/cxxJ9mK.mp4",
"https://i.imgur.com/Yn4aJO2.mp4",
"https://i.imgur.com/qKX9s2j.mp4",

];

module.exports.config = {
 name: "🥺",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "Islamick Chat",
 description: "auto reply to salam",
 commandCategory: "noprefix",
 usages: "🥺",
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
 if (body.startsWith("🥺")) {
 const rahad = [
 "╭•┄┅════❁🌺❁════┅┄•╮\n \n আমার গল্পের শেষ পাতায় লেখা থাকবে আমি কারো প্রিয় হতে পারিনি।\n\n╰•┄┅════❁🌺❁════┅┄•╯",
 "╭•┄┅════❁🌺❁════┅┄•╮\n\n আমার গল্পের শেষ পাতায় লেখা থাকবে আমি কারো প্রিয় হতে পারিনি\n\n╰•┄┅════❁🌺❁════┅┄•╯"

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
 if (typeof data["🥺"] === "undefined" || data["🥺"]) data["🥺"] = false;
 else data["🥺"] = true;
 await Threads.setData(threadID, { data });
 global.data.threadData.set(threadID, data);
 api.sendMessage(`${(data["🥺"]) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
