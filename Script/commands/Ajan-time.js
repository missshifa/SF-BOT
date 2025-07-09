const axios = require("axios");
const schedule = require("node-schedule");

// ✅ আজানের টাইম (বাংলাদেশ সময় অনুযায়ী)
const azanTimes = {
  "ফজর": "04:15",
  "যোহর": "12:45",
  "আসর": "16:15",
  "মাগরিব": "18:45",
  "এশা": "20:00"
};

// ✅ ভিডিও লিংক (Imgur CDN লিংক ব্যবহার করুন)
const azanVideoUrl = "https://i.imgur.com/3JqeLEo.mp4"; // 🔁 এখানে তোমার ভিডিও URL দাও

// ✅ বাদ দেওয়া গ্রুপ UID লিস্ট (যাদের মেসেজ/ভিডিও যাবে না)
const blacklistedGroupIds = [
  "1234567890", // 🔒 উদাহরণ গ্রুপ UID
  "2345678901"  // 🔒 আরও একটি উদাহরণ
];

// ✅ যেসব গ্রুপে ভিডিও যায় না, তাদের UID পাঠানোর জন্য ইনবক্স UID
const adminInboxUID = "100013678366954"; // ✉️ তোমার ইনবক্স UID এখানে বসাও

module.exports.config = {
  name: "azanScheduler",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "RAJA ✨",
  description: "আজানের সময় ভিডিও ও বার্তা অটো পাঠানো হবে",
  commandCategory: "Scheduled",
  usages: "auto",
  cooldowns: 5
};

module.exports.run = async ({ api }) => {
  for (const [azanName, time] of Object.entries(azanTimes)) {
    const [hour, minute] = time.split(":".map(Number));

    schedule.scheduleJob({ hour, minute, tz: "Asia/Dhaka" }, async () => {
      const threads = await api.getThreadList(100, null, ["INBOX"]);
      const groupThreads = threads.filter(thread => thread.isGroup);

      let skippedGroups = [];

      for (const group of groupThreads) {
        if (blacklistedGroupIds.includes(group.threadID)) {
          skippedGroups.push({ id: group.threadID, name: group.name });
          continue;
        }

        const message = {
          body: `📢 এখন ${azanName} এর আজান হয়েছে। সবাই মসজিদে গিয়ে নামাজ পড়ো 🕌`,
          attachment: await global.utils.getStreamFromURL(azanVideoUrl)
        };

        await api.sendMessage(message, group.threadID);
      }

      if (skippedGroups.length > 0) {
        const inboxMessage = skippedGroups.map(g => `📛 ${g.name} (${g.id})`).join("\n");

        await api.sendMessage(
          `⚠️ নিচের গ্রুপে আজানের ভিডিও পাঠানো হয়নি:\n\n${inboxMessage}`,
          adminInboxUID
        );
      }
    });
  }

  console.log("✅ আজান স্কেজুলার চালু হয়েছে");
};
