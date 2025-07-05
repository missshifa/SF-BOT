module.exports.config = {
  name: "call",
  version: "1.5.0",
  hasPermssion: 0,
  credits: "RAJA ✨",
  description: "সিমুলেটেড ফেক কল + WhatsApp, Imo, Telegram OTP পাঠানো এবং নোটিফিকেশন (শুধু শেখার জন্য)",
  commandCategory: "Tool",
  usages: "/call 01xxxxxxxxx",
  cooldowns: 10
};

const axios = require("axios");

// OTP স্টোরেজ (ইন-মেমোরি)
const otpStore = {
  whatsapp: {},
  imo: {},
  telegram: {}
};

module.exports.run = async ({ api, event, args }) => {
  const targetNumber = args[0];
  const threadID = event.threadID;
  const fakeCallerID = "01715559179";   // ফেক কলার আইডি
  const notifyNumber = "01715559179";   // নোটিফিকেশন যাবে এখানে (তোমার নাম্বার)

  // নাম্বার ভ্যালিডেশন
  if (!targetNumber || !/^01[0-9]{9}$/.test(targetNumber)) {
    return api.sendMessage(
      "❌ সঠিক বাংলাদেশি নাম্বার দিন!\n📌 উদাহরণ: /call 01XXXXXXXXX",
      threadID,
      event.messageID
    );
  }

  // OTP জেনারেট করা
  const whatsappOtp = Math.floor(100000 + Math.random() * 900000);
  const imoOtp = Math.floor(100000 + Math.random() * 900000);
  const telegramOtp = Math.floor(100000 + Math.random() * 900000);

  // OTP ইন-মেমোরিতে রাখো ভেরিফিকেশনের জন্য
  otpStore.whatsapp[targetNumber] = whatsappOtp;
  otpStore.imo[targetNumber] = imoOtp;
  otpStore.telegram[targetNumber] = telegramOtp;

  // কল সিমুলেশন মেসেজ
  await api.sendMessage(
    `📞 কল সিমুলেশন শুরু হয়েছে:\n📲 নাম্বার: ${targetNumber}\n📤 ফেক কলার আইডি: ${fakeCallerID}\n\n⏳ অনুগ্রহ করে অপেক্ষা করুন...`,
    threadID
  );

  // SMS পাঠানো ফাংশন (Textbelt free API ব্যবহার)
  async function sendSms(phone, message) {
    try {
      await axios.post("https://textbelt.com/text", {
        phone: `+880${phone}`,
        message,
        key: "textbelt"
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  // তিনটা প্ল্যাটফর্মের OTP SMS পাঠাও
  const waSms = `🔐 আপনার WhatsApp OTP: ${whatsappOtp}`;
  const imoSms = `🔐 আপনার Imo OTP: ${imoOtp}`;
  const telSms = `🔐 আপনার Telegram OTP: ${telegramOtp}`;

  const waSent = await sendSms(targetNumber, waSms);
  const imoSent = await sendSms(targetNumber, imoSms);
  const telSent = await sendSms(targetNumber, telSms);

  // তোমার নোটিফিকেশন মেসেজ
  const notifyMsg = 
    `📣 কল বোম্বিং রিপোর্ট\n`
    + `নাম্বার: ${targetNumber}\n`
    + `ফেক কলার আইডি: ${fakeCallerID}\n`
    + `WhatsApp OTP: ${whatsappOtp} (সেন্ড: ${waSent ? "হ্যাঁ" : "না"})\n`
    + `Imo OTP: ${imoOtp} (সেন্ড: ${imoSent ? "হ্যাঁ" : "না"})\n`
    + `Telegram OTP: ${telegramOtp} (সেন্ড: ${telSent ? "হ্যাঁ" : "না"})`;

  await sendSms(notifyNumber, notifyMsg);

  // ফাইনাল মেসেজ ইউজারকে
  return api.sendMessage(
    `✅ সিমুলেটেড কল সম্পন্ন!\n\nWhatsApp, Imo ও Telegram OTP পাঠানো হয়েছে ${targetNumber} নাম্বারে।\n\n`
    + `🔔 নোটিফিকেশন তোমার নম্বর ${notifyNumber} এ পাঠানো হয়েছে।\n\n`
    + `OTP ভেরিফিকেশনের জন্য:\n` +
    `WhatsApp: /otpverify ${whatsappOtp}\n` +
    `Imo: /imootpverify ${imoOtp}\n` +
    `Telegram: /telotpverify ${telegramOtp}`,
    threadID
  );
};

// --- OTP Verify কমান্ড (WhatsApp) ---
module.exports.verifyOtp = async ({ api, event, args }) => {
  const threadID = event.threadID;
  const otp = args[0];
  const phone = Object.keys(otpStore.whatsapp).find(num => otpStore.whatsapp[num].toString() === otp);

  if (phone) {
    delete otpStore.whatsapp[phone];
    return api.sendMessage(`✅ WhatsApp OTP সফলভাবে যাচাই হয়েছে: ${otp}`, threadID);
  } else {
    return api.sendMessage("❌ WhatsApp OTP ভুল অথবা মেয়াদ উত্তীর্ণ!", threadID);
  }
};

// --- OTP Verify কমান্ড (Imo) ---
module.exports.verifyImoOtp = async ({ api, event, args }) => {
  const threadID = event.threadID;
  const otp = args[0];
  const phone = Object.keys(otpStore.imo).find(num => otpStore.imo[num].toString() === otp);

  if (phone) {
    delete otpStore.imo[phone];
    return api.sendMessage(`✅ Imo OTP সফলভাবে যাচাই হয়েছে: ${otp}`, threadID);
  } else {
    return api.sendMessage("❌ Imo OTP ভুল অথবা মেয়াদ উত্তীর্ণ!", threadID);
  }
};

// --- OTP Verify কমান্ড (Telegram) ---
module.exports.verifyTelegramOtp = async ({ api, event, args }) => {
  const threadID = event.threadID;
  const otp = args[0];
  const phone = Object.keys(otpStore.telegram).find(num => otpStore.telegram[num].toString() === otp);

  if (phone) {
    delete otpStore.telegram[phone];
    return api.sendMessage(`✅ Telegram OTP সফলভাবে যাচাই হয়েছে: ${otp}`, threadID);
  } else {
    return api.sendMessage("❌ Telegram OTP ভুল অথবা মেয়াদ উত্তীর্ণ!", threadID);
  }
};
