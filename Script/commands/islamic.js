module.exports.config = {
 name: "video",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "RANDOM islamic video",
 commandCategory: "Random video",
 usages: "Statusvideo",
 cooldowns: 2,
 dependencies: {
 "request":"",
 "fs-extra":"",
 "axios":""
 }
 
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
 var link = [
"https://i.imgur.com/FwD8avo.mp4",
"https://i.imgur.com/oFyHG0P.mp4",
"https://i.imgur.com/9s1uYhq.mp4",
"https://i.imgur.com/B24mDV9.mp4",
 ];
 var callback = () => api.sendMessage({body:`╭──────•◈•───────╮\n𝘙𝘈𝘑𝘈 𝘝𝘪𝘗 5𝘟 𝘝𝘪𝘋𝘌𝘖\n╰──────•◈•───────╯`,attachment: fs.createReadStream(__dirname + "/cache/1.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp4"));
 return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.mp4")).on("close",() => callback());
 };
