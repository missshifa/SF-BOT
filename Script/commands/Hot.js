module.exports.config = {
 name: "hot",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "RAJA ViP 5X",
 description: "RANDOM items video",
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
"https://i.imgur.com/bumoLaZ.mp4",
 ];
 var callback = () => api.sendMessage({body:`╭──────•◈•───────╮\n  𝘙𝘈𝘑𝘈 𝘝𝘪𝘗 5𝘟 𝘏𝘖𝘛 𝘝𝘪𝘋𝘌𝘖\n╰──────•◈•───────╯`,attachment: fs.createReadStream(__dirname + "/cache/1.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp4"));
 return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.mp4")).on("close",() => callback());
 };
