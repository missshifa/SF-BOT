module.exports.config = {
 name: "video",
 version: "1.0.0",
 hasPermssion: 0,
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
"https://i.imgur.com/FwD8avo.mp4",
"https://i.imgur.com/oFyHG0P.mp4",
"https://i.imgur.com/9s1uYhq.mp4",
"https://i.imgur.com/B24mDV9.mp4",
"https://i.imgur.com/5JlFOhl.mp4",
"https://i.imgur.com/xwEAAv2.mp4",
"https://i.imgur.com/wJizofN.mp4",
"https://i.imgur.com/ed5oSs8.mp4",
"https://i.imgur.com/GRV6Jbi.mp4",
"https://i.imgur.com/UcOl1C4.mp4",
"https://i.imgur.com/INZTwlx.mp4",
"https://i.imgur.com/xXxHuOI.mp4",
"https://i.imgur.com/jRqSdEB.mp4",
"https://i.imgur.com/48Heh4G.mp4",
"https://i.imgur.com/bLfNsmH.mp4",
"https://i.imgur.com/u0njpg5.mp4",
"https://i.imgur.com/t0G7eXI.mp4",
"https://i.imgur.com/LJLaEay.mp4",
"https://i.imgur.com/zM6N3wj.mp4",
"https://i.imgur.com/RTkUmBL.mp4",
"https://i.imgur.com/Rk6fUMG.mp4",
"https://i.imgur.com/5z4Q6q6.mp4",
"https://i.imgur.com/C7rLBd0.mp4",
"https://i.imgur.com/5z4Q6q6.mp4",
"https://i.imgur.com/C7rLBd0.mp4",
"https://i.imgur.com/i9Iw9Ew.mp4",
"https://i.imgur.com/Ol22F0v.mp4",
"https://i.imgur.com/QocC9X2.mp4",
"https://i.imgur.com/so6EZff.mp4",
"https://i.imgur.com/MgMFRGC.mp4",
"https://i.imgur.com/hlOaKgw.mp4",
"https://i.imgur.com/Iedrtxk.mp4",
"https://i.imgur.com/qTdxqhX.mp4",
"https://i.imgur.com/SsLSRNT.mp4",
"https://i.imgur.com/EqkPwIw.mp4",
"https://i.imgur.com/B1HjoZn.mp4",
"https://i.imgur.com/1ZCD5BS.mp4",
"https://i.imgur.com/6GUJdw0.mp4",
"https://i.imgur.com/UaOE0vP.mp4",
"https://i.imgur.com/zaLWuDH.mp4",
"https://i.imgur.com/nzyhIGD.mp4",
 ];
 var callback = () => api.sendMessage({body:`╭──────•◈•───────╮\n  𝘙𝘈𝘑𝘈 𝘝𝘪𝘗 5𝘟 𝘐𝘛𝘌𝘔 𝘝𝘪𝘋𝘌𝘖\n╰──────•◈•───────╯`,attachment: fs.createReadStream(__dirname + "/cache/1.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp4"));
 return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.mp4")).on("close",() => callback());
 };
