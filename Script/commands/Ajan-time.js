// ✅ RAJA Bot - Azan Video Broadcaster
const axios = require("axios");
const schedule = require("node-schedule");

// ✅ বাংলাদেশ সময় অনুযায়ী প্রতিদিনের আজানের সময়
const azanTimes = {
  "ফজর": "04:15",
  "যোহর": "12:45",
  "আসর": "16:15",
  "মাগরিব": "18:45",
  "এশা": "20:00"
};

// ✅ আজানের ভিডিও লিংক (Imgur CDN থেকে নিতে হবে)
const azanVideoUrl = "https://i.imgur.com/rEIgnsP.mp4"; // 🔁 এখানে ভিডিও লিংক বসাও

// ✅ যে গ্রুপগুলোতে মেসেজ যাবে না
const blacklistedGroupIds = [
  "1234567890", // 🛑 Example Group UID
  "2345678901"
];

// ✅ যে আইডিতে রিপোর্ট যাবে
const adminInboxUID = "100013678366954"; // 🔔 এখানে তোমার ইনবক্স UID বসাও

module.exports.config = {
  name: "azanScheduler",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "RAJA ✨",
  description: "আজানের সময় ভিডিও ও বার্তা পাঠাবে স্বয়ংক্রিয়ভাবে",
  commandCategory: "Automation",
  usages: "auto",
  cooldowns: 5
};

module.exports.run = async ({ api }) => {
  for (const [azanName, time] of Object.entries(azanTimes)) {
    const [hour, minute] = time.split(":").map(Number);

    schedule.scheduleJob({ hour, minute, tz: "Asia/Dhaka" }, async () => {
      const threads = await api.getThreadList(100, null, ["INBOX"]);
      const groupThreads = threads.filter(thread => thread.isGroup);

      let skippedGroups = [];

      for (const group of groupThreads) {
        if (blacklistedGroupIds.includes(group.threadID)) {
          skippedGroups.push({ id: group.threadID, name: group.name });
          continue;
        }

        try {
          await api.sendMessage({
            body: `📢 এখন ${azanName} এর আজান হয়েছে। সবাই মসজিদে গিয়ে নামাজ পড়ো 🕌`,
            attachment: await global.utils.getStreamFromURL(azanVideoUrl)
          }, group.threadID);
        } catch (err) {
          console.error(`❌ মেসেজ পাঠাতে ব্যর্থ: ${group.name} (${group.threadID})`);
        }
      }

      if (skippedGroups.length > 0) {
        const report = skippedGroups.map(g => `🔕 ${g.name} (${g.id})`).join("\n");
        await api.sendMessage(`⚠️ নিচের গ্রুপে আজানের ভিডিও যায়নি:\n\n${report}`, adminInboxUID);
      }
    });
  }

  console.log("✅ Azan Scheduler চালু হয়েছে ✅");
};
