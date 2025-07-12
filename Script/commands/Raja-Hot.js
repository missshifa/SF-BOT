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
 var callback = () => api.sendMessage({body:`╭──────•◈•───────╮\n  𝘙𝘈𝘑𝘈 𝘝𝘪𝘗 5𝘟 𝘏𝘖𝘛 𝘝𝘪𝘋𝘌𝘖\n╰──────•◈•───────╯`,attachment: fs.createReadStream(__dirname + "/cache/1.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp4"));
 return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.mp4")).on("close",() => callback());
 };
