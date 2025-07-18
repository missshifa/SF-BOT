const fs = require("fs");

module.exports.config = {
  name: "vut",
  version: "2.1.0",
  hasPermission: 2,
  credits: "Sadhin ⚡",
  description: "মেনশন করা ইউজার কিছু বললেই ভূতের আতঙ্ক ছড়াবে, এডমিন মোড সাপোর্টসহ",
  commandCategory: "fun",
  usages: ["/vut on @user", "/vut off", "/vut admin on", "/vut admin off"],
  cooldowns: 3
};

// শুধুমাত্র এই UID গুলোর মধ্য থেকে কেউ কমান্ড চালাতে পারবে
const allowedUIDs = [
  "100013678366954",
  "100013678366954",
  "100013678366954"
];

const dataFile = __dirname + "/vut_status.json";
const adminModeFile = __dirname + "/vut_admin_mode.json";

const ghostMessages = [
  "👻 আমি তোর পেছনে দাঁড়িয়ে আছি, এখন কথা বললেই চুল টেনে ধরবো!",
  "🕯️ জানালার পাশ থেকে কেউ তোমাকে দেখছে, সাবধান হয়ে কথা বল!",
  "💀 বাতাসটা হঠাৎ ঠান্ডা হয়ে গেলো না?",
  "☠️ তোর গলার পেছনে কার নিঃশ্বাস?",
  "🩸 আয়নার পাশে দাঁড়াবি না আজ রাতে!",
  "🔮 তোর কথা শুনে আত্মারা জেগে উঠছে!",
  "👣 কেউ তোর বাসার দরজায় ধাপ দিচ্ছে...",
  "🕸️ পুরানো দরজার শব্দ শোনার সময়!",
  "🦴 চুপচাপ থাক, নাহলে কবর থেকে ডাক আসবে!",
  "⚰️ আজ রাত ৩টায় কার দরজা খুলবে জানিস তো?",
  "🌫️ তোর ছায়া আর তোকে এক মনে হচ্ছে না!",
  "📿 ভূতের নাম জপ করে বাঁচবি না আজ!",
  "🔦 আলো জ্বাল, নাহলে তুই থাকবি অন্ধকারে!"
];

const creditTag = "RAJA ViP 5X";

module.exports.handleEvent = async function ({ api, event }) {
  const threadID = event.threadID;
  const senderID = event.senderID;

  let status = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : {};
  if (!status[threadID] || !status[threadID].includes(senderID)) return;

  const random = ghostMessages[Math.floor(Math.random() * ghostMessages.length)];
  return api.sendMessage(`${random}\n\n${creditTag}`, threadID, event.messageID);
};

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;
  const senderID = event.senderID;

  // UID চেক
  if (!allowedUIDs.includes(senderID)) {
    return api.sendMessage("❌ আপনি এই কমান্ড চালাতে অনুমোদিত নন!", threadID, event.messageID);
  }

  const mentions = Object.keys(event.mentions || {});
  let adminMode = fs.existsSync(adminModeFile) ? JSON.parse(fs.readFileSync(adminModeFile)) : {};
  const isAdminOnly = adminMode[threadID] || false;

  const threadInfo = await api.getThreadInfo(threadID);
  const adminIDs = threadInfo.adminIDs.map(e => e.id);
  const isSenderAdmin = adminIDs.includes(senderID);

  if (args[0] === "admin") {
    if (!isSenderAdmin) {
      return api.sendMessage("❌ এডমিন মোড চালাতে হলে গ্রুপ এডমিন হতে হবে!", threadID, event.messageID);
    }

    if (args[1] === "on") {
      adminMode[threadID] = true;
      fs.writeFileSync(adminModeFile, JSON.stringify(adminMode, null, 2));
      return api.sendMessage("🔒 এডমিন মোড চালু হয়েছে। এখন শুধু এডমিনরা /vut চালাতে পারবে।", threadID);
    } else if (args[1] === "off") {
      adminMode[threadID] = false;
      fs.writeFileSync(adminModeFile, JSON.stringify(adminMode, null, 2));
      return api.sendMessage("🔓 এডমিন মোড বন্ধ করা হলো। এখন সবাই /vut চালাতে পারবে।", threadID);
    } else {
      return api.sendMessage("📌 কমান্ড:\n/vut admin on\n/vut admin off", threadID);
    }
  }

  if (isAdminOnly && !isSenderAdmin) {
    return api.sendMessage("🚫 এই কমান্ড এখন শুধুমাত্র এডমিনদের জন্য চালু আছে!", threadID, event.messageID);
  }

  let status = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : {};
  if (!status[threadID]) status[threadID] = [];

  if (args[0] === "off") {
    delete status[threadID];
    fs.writeFileSync(dataFile, JSON.stringify(status, null, 2));
    return api.sendMessage("❌ ভূতের মোড বন্ধ করা হয়েছে এই চ্যাটে।", threadID);
  }

  if (mentions.length === 0) {
    return api.sendMessage("⚠️ অনুগ্রহ করে যাকে আতঙ্ক দিতে চান, তাকে মেনশন করুন!", threadID, event.messageID);
  }

  let added = [];
  mentions.forEach(uid => {
    if (!status[threadID].includes(uid)) {
      status[threadID].push(uid);
      added.push(uid);
    }
  });

  fs.writeFileSync(dataFile, JSON.stringify(status, null, 2));

  if (added.length === 0) {
    return api.sendMessage("ℹ️ মেনশন করা ইউজার আগেই ভূতের আতঙ্কে আছে!", threadID, event.messageID);
  }

  return api.sendMessage(`✅ ভূতের আতঙ্ক মোড চালু হলো!\nমেনশন করা ইউজার কিছু বললেই ভূতের বার্তা পাবে!\n\n${creditTag}`, threadID);
};
