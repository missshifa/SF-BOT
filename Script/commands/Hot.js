module.exports.config = {
  name: "hot",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "RAJA ViP 5X Modified by ChatGPT",
  description: "Random hot video from Google Drive",
  commandCategory: "Random video",
  usages: "hot",
  cooldowns: 2,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];

  // 🔗 এখানে তোমার Google Drive Direct Download লিংকগুলো বসাও
  const link = [
    "https://drive.google.com/uc?export=download&id=1Y-Stqy93aPHNN7FYUXoS_69Ob0oMXCVJ
    ","https://drive.google.com/uc?export=download&id=1KPgcd81Q9SVSbkAYntHoO8DfP5ABIzuG",
  ];
    

  const randomLink = link[Math.floor(Math.random() * link.length)];
  const filePath = __dirname + "/cache/hotvideo.mp4";

  const callback = () => {
    api.sendMessage({
      body: `╭──────•◈•───────╮\n  𝘙𝘈𝘑𝘈 𝘝𝘪𝘗 5𝘟 𝘏𝘖𝘛 𝘝𝘪𝘋𝘌𝘖\n╰──────•◈•───────╯`,
      attachment: fs.createReadStream(filePath)
    }, event.threadID, () => fs.unlinkSync(filePath));
  };

  // ভিডিও ফাইল ডাউনলোড এবং পাঠানো
  request(encodeURI(randomLink))
    .pipe(fs.createWriteStream(filePath))
    .on("close", () => callback());
};
