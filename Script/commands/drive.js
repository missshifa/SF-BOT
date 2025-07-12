const axios = require('axios');

module.exports.config = {
  name: "drive",
  version: "1.0.1",
  hasPermission: 0,
  credits: "ArYAN (Enhanced by ChatGPT)",
  description: "Uploads media to Google Drive and returns a shareable link.",
  commandCategory: "utility",
  usages: "/drive [url] or reply to media with /drive",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  let inputUrl = null;

  if (event.messageReply?.attachments?.length > 0) {
    inputUrl = event.messageReply.attachments[0].url;
  } else if (args.length > 0) {
    inputUrl = args[0];
  }

  if (!inputUrl) {
    return api.sendMessage(
      "❌ | Please reply to a media message or provide a direct media URL.\n\n📌 Example:\n- Reply to a video: /drive\n- Or: /drive https://example.com/video.mp4",
      event.threadID,
      event.messageID
    );
  }

  try {
    const noobx = "ArYAN";
      const apiURL = `https://aryan-xyz-google-drive.vercel.app/drive?url=${encodeURIComponent(inputUrl)}&apikey=${noobx}`;
 const response = await axios.get(apiURL);
    const data = response.data;

    const driveLink = data.driveLink || data.driveLIink;

    if (driveLink) {
      return api.sendMessage(
        `✅ Successfully uploaded to Google Drive!\n\n🔗 Link: ${driveLink}`,
        event.threadID,
        event.messageID
      );
    } else {
      return api.sendMessage(
        `❌ Upload failed.\n${data.error || "No response from server."}`,
        event.threadID,
        event.messageID
      );
    }
  } catch (err) {
    console.error("Upload error:", err);
    return api.sendMessage(
      "❌ | Upload failed due to server or network issue. Try again later.",
      event.threadID,
      event.messageID
    );
  }
};
