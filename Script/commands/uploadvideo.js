const fs = require("fs");
const axios = global.nodemodule["axios"];
const path = require("path");
const FormData = require("form-data");

module.exports.config = {
  name: "uploadvideo",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "👑 Islamick Cyber Chat + 💠 Modified by RAJA GPT AI",
  description: "📤 Upload any video and get a VIP 🔗 link",
  commandCategory: "🎬 VIP Tools",
  usages: "Reply to a video with: uploadvideo",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const send = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

  try {
    const attachment = event.messageReply?.attachments?.[0];

    if (!attachment || attachment.type !== "video") {
      return send(`╭━━━『 👑 VIP VIDEO SYSTEM 』━━━╮\n\n⚠️ *Error:* Please reply to a valid video.\n📌 Example: Reply any video with \`uploadvideo\`\n\n╰━━━━━━━━━━━━━━━━━━━━╯`);
    }

    const videoUrl = attachment.url;
    const fileName = `RoyalVIP_${Date.now()}.mp4`;
    const filePath = path.join(__dirname, fileName);

    send("⏳ *VIP Mode ON* - Downloading your video... Please wait.");

    const writer = fs.createWriteStream(filePath);
    const response = await axios({
      method: "GET",
      url: videoUrl,
      responseType: "stream",
    });

    response.data.pipe(writer);

    writer.on("finish", async () => {
      send("🚀 Uploading video to secure server...");

      const form = new FormData();
      form.append("file", fs.createReadStream(filePath));

      const upload = await axios.post("https://file.io/?expires=1d", form, {
        headers: form.getHeaders(),
      });

      fs.unlinkSync(filePath); // Delete after upload

      if (upload.data.success) {
        return send(
`╭━━━『 🛡️ VIP VIDEO UPLOAD COMPLETE 』━━━╮
🎬 *Status:* ✅ Successfully Uploaded!
📥 *File Name:* ${fileName}
🔗 *Download Link:* ${upload.data.link}
⏳ *Expiry:* 24 Hours Only

🚫 *Note:* Don't share sensitive content!
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`);
      } else {
        return send("❌ Upload failed. Please try again later.");
      }
    });

    writer.on("error", (err) => {
      fs.unlinkSync(filePath);
      return send("❌ Download failed. Please try with another video.");
    });

  } catch (err) {
    return send(`🚫 *Unexpected Error:*\n${err.message}`);
  }
};
