module.exports.config = {
  name: "hot",
  version: "1.0.0",
  hasPermission: 2,
  credits: "Shaon",
  description: "Send a trending TikTok video",
  commandCategory: "media",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
   var hi = ["°\n\n\n𝘙𝘈𝘑𝘈 𝘝𝘪𝘗 5𝘟 𝘏𝘖𝘛 𝘝𝘪𝘋𝘌𝘖!♡🩷🪽\n\n\n°"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
"https://drive.google.com/uc?export=download&id=1eaqoBe-Ho8Po6CUYaE75BVpp0XyxK3Zw",
];
     var callback = () => api.sendMessage({body:` ${know} `,attachment: fs.createReadStream(__dirname + "/cache/15.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/15.mp4"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/15.mp4")).on("close",() => callback());
   };
