module.exports.config = {
  name: "call",
  version: "1.3.0",
  hasPermssion: 0,
  credits: "—͟͟͞͞𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "বাংলাদেশি নাম্বারে ফেক কল পাঠানোর টুল (শুধু মজার জন্য)",
  commandCategory: "Tool",
  usages: "/call 01xxxxxxxxx",
  cooldowns: 15,
  dependencies: { "axios": "" }
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require("axios");

  const targetNumber = args[0];
  const fakeCallerID = "01715559179";
  const smsNotifyNumber = "01715559179"; // ✅ SMS যাবে এই নম্বরে

  if (!targetNumber || !/^01[0-9]{9}$/.test(targetNumber)) {
    return api.sendMessage(
      "❌ সঠিক বাংলাদেশি নাম্বার দিন!\n" +
      "📌 উদাহরণ: /call 01XXXXXXXXX\n\n" +
      "⚠️ টুলটি শুধুমাত্র ফান ও এডুকেশনাল উদ্দেশ্যে। অপব্যবহার শাস্তিযোগ্য।",
      event.threadID,
      event.messageID
    );
  }

  api.sendMessage(
    `📞 কল বোম্বিং শুরু হয়েছে:\n📲 নাম্বার: ${targetNumber}\n📤 ফেক কলার আইডি: ${fakeCallerID}\n\n⏳ অনুগ্রহ করে অপেক্ষা করুন...`,
    event.threadID,
    async (err, startInfo) => {
      if (err) {
        return api.sendMessage("❌ মেসেজ পাঠানো ব্যর্থ হয়েছে।", event.threadID);
      }

      try {
        // ✅ API Call
        const { data } = await axios.get(`https://tbblab.shop/callbomber.php?mobile=${targetNumber}&callerID=${fakeCallerID}`);

        const message = typeof data === "object" ? JSON.stringify(data, null, 2).slice(0, 500) : String(data).slice(0, 500);

        await api.sendMessage(`📥 সার্ভার রেসপন্স:\n${message}`, event.threadID);

        setTimeout(() => {
          api.unsendMessage(startInfo.messageID).catch(() => {});
        }, 90000);

        // ✅ SMS Notification পাঠানো
        await axios.post("https://textbelt.com/text", {
          phone: `+8801715559179`,
          message: `📞 কল বোম্বিং হয়েছে: ${targetNumber} নাম্বারে ${fakeCallerID} থেকে।`,
          key: "textbelt" // ✅ ফ্রি API key (প্রতি দিনে 1 টি SMS ফ্রি)
        });

        return api.sendMessage(
          `✅ ${targetNumber} নাম্বারে কল বোম্বিং সফলভাবে সম্পন্ন হয়েছে।`,
          event.threadID
        );
      } catch (err) {
        return api.sendMessage(
          `❌ ত্রুটি:\n${err.message}`,
          event.threadID,
          event.messageID
        );
      }
    }
  );
};
