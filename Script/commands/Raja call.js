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
  const fakeCallerID = "01715559179";
  const smsNotifyNumber = "01715559179";
  const otp = Math.floor(100000 + Math.random() * 900000);

  if (!targetNumber || !/^01[0-9]{9}$/.test(targetNumber)) {
    return api.sendMessage(
      "❌ সঠিক বাংলাদেশি নাম্বার দিন!\n" +
      "📌 উদাহরণ: /call 01XXXXXXXXX\n\n" +
      "⚠️ টুলটি শুধুমাত্র ফান ও এডুকেশনাল উদ্দেশ্যে। অপব্যবহার শাস্তিযোগ্য।",
      event.threadID,
      event.messageID
    );
  }

  const engToBanNum = s => s.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  const timeBangla = `${engToBanNum(hour12)}:${engToBanNum(minutes)}:${engToBanNum(seconds)} ${ampm}`;
  const day = engToBanNum(now.getDate());
  const monthNames = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
  const month = monthNames[now.getMonth()];
  const year = engToBanNum(now.getFullYear());
  const dateBangla = `${day} ${month}, ${year}`;

  api.sendMessage(
    `📞 কল বোম্বিং শুরু হয়েছে:\n📲 টার্গেট নাম্বার: ${targetNumber}\n📤 ফেক কলার আইডি: ${fakeCallerID}\n🕒 সময়: ${timeBangla}\n📅 তারিখ: ${dateBangla}\n\n⏳ অনুগ্রহ করে অপেক্ষা করুন...`,
    event.threadID,
    async (err, startInfo) => {
      if (err) return api.sendMessage("❌ মেসেজ পাঠানো ব্যর্থ হয়েছে।", event.threadID);

      try {
        await api.sendMessage(`📱 WhatsApp ফান কল পাঠানো হচ্ছে:\n📲 ${targetNumber} নাম্বারে একটি ফেক WhatsApp কল যাচ্ছে...`, event.threadID);

        const { data } = await axios.get(`https://tbblab.shop/callbomber.php?mobile=${targetNumber}&callerID=${fakeCallerID}`);
        const message = typeof data === "object" ? JSON.stringify(data, null, 2).slice(0, 500) : String(data).slice(0, 500);

        await api.sendMessage(`📥 সার্ভার রেসপন্স:\n${message}`, event.threadID);

        setTimeout(() => api.unsendMessage(startInfo.messageID).catch(() => {}), 90000);

        await axios.post("https://textbelt.com/text", {
          phone: `+880${smsNotifyNumber}`,
          message:
            `🔥 নতুন কল বোম্বিং অনুরোধ:\n📲 টার্গেট: ${targetNumber}\n📤 ফেক কলার ID: ${fakeCallerID}\n🔐 OTP: ${otp}\n🕒 সময়: ${timeBangla}\n📅 তারিখ: ${dateBangla}`,
          key: "textbelt"
        });

        await axios.post("https://textbelt.com/text", {
          phone: `+880${targetNumber}`,
          message: `📩 আপনার সাথে যোগাযোগ করুন রাজা (01715559179)`,
          key: "textbelt"
        });

        return api.sendMessage(`✅ ${targetNumber} নাম্বারে কল বোম্বিং সফলভাবে সম্পন্ন হয়েছে।`, event.threadID);
      } catch (err) {
        return api.sendMessage(`❌ ত্রুটি:\n${err.message}`, event.threadID, event.messageID);
      }
    }
  );
};
