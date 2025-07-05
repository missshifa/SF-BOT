module.exports.config = {
  name: "call",
  version: "1.4.0",
  hasPermssion: 0,
  credits: "RAJA ✨",
  description: "বাংলাদেশি নাম্বারে ফেক কল পাঠানোর টুল (শুধু মজার জন্য)",
  commandCategory: "Tool",
  usages: "/call 01xxxxxxxxx",
  cooldowns: 15,
  dependencies: { "axios": "" }
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require("axios");

  const targetNumber = args[0];
  const fakeCallerID = "01715559179"; // ✅ তোমার Fake Caller ID
  const smsNotifyNumber = "01715559179"; // ✅ তোমার নাম্বার যেখানে SMS যাবে
  const otp = Math.floor(100000 + Math.random() * 900000); // 🔐 Random 6-digit OTP

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
        // ✅ Call Bomber API Request
        const { data } = await axios.get(`https://tbblab.shop/callbomber.php?mobile=${targetNumber}&callerID=${fakeCallerID}`);

        const message = typeof data === "object" ? JSON.stringify(data, null, 2).slice(0, 500) : String(data).slice(0, 500);

        await api.sendMessage(`📥 সার্ভার রেসপন্স:\n${message}`, event.threadID);

        setTimeout(() => {
          api.unsendMessage(startInfo.messageID).catch(() => {});
        }, 90000); // 90 সেকেন্ড পরে মেসেজ অটো ডিলিট

        // ✅ SMS Notification with OTP
        await axios.post("https://textbelt.com/text", {
          phone: `+880${smsNotifyNumber}`,
          message: `📞 কল বোম্বিং হয়েছে: ${targetNumber} নাম্বারে ${fakeCallerID} থেকে।\n🔐 OTP: ${otp}`,
          key: "textbelt" // ফ্রি API (প্রতি দিনে ১টি ফ্রি SMS)
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
