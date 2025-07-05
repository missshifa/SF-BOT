const fs = require("fs");
const path = require("path");

module.exports.config = {
name: "call",
version: "1.6.0",
hasPermssion: 0,
credits: "রাজা ✨",
description: "বাংলাদেশি নাম্বারে মজা করার জন্য ফেক কল, মেসেজ ও কল ফিচার",
commandCategory: "টুল",
usages: "/call 01xxxxxxxxx | /call help | /call voice 01xxxxxxxxx | /call video 01xxxxxxxxx | /call msg 01xxxxxxxxx",
cooldowns: 15,
dependencies: { "axios": "" }
};

module.exports.run = async ({ api, event, args }) => {
if (!args[0]) {
return api.sendMessage(
❌ নম্বর বা কমান্ড উল্লেখ করুন!\n\n +
🛠️ কমান্ড:\n +
/call help - সাহায্য\n +
/call 01xxxxxxxxx - ফেক কল\n +
/call msg 01xxxxxxxxx - ফেক মেসেজ\n +
/call voice 01xxxxxxxxx - ফেক ভয়েস কল\n +
/call video 01xxxxxxxxx - ফেক ভিডিও কল,
event.threadID
);
}

const command = args[0].toLowerCase();

// /call help
if (command === "help") {
return api.sendMessage(
✅ /call পার্সোনাল তত্ত্ব\n\n +
🛠️ ব্যবহার:\n +
/call 01xxxxxxxxx - ফেক কল বোম্বিং\n +
/call msg 01xxxxxxxxx - ফেক মেসেজ পাঠানো\n +
/call voice 01xxxxxxxxx - ভয়েস কলের মেসেজ\n +
/call video 01xxxxxxxxx - ভিডিও কলের মেসেজ\n\n +
🔹 /call funny 01xxxxxxxxx - মজার ফেক কল\n +
🔹 /call facts 01xxxxxxxxx - মজার তথ্য\n +
🔹 /call otp 01xxxxxxxxx - ফেক OTP পাঠানো\n +
🔹 /call location 01xxxxxxxxx - ফেক লোকেশন পাঠানো\n +
🔹 /call song 01xxxxxxxxx - মজার গান মেসেজ\n +
🔹 /call love 01xxxxxxxxx - ভালোবাসার মেসেজ\n +
🔹 /call prank 01xxxxxxxxx - ছোট্ট ফেক প্রাঙ্ক কল\n +
🔹 /call warn 01xxxxxxxxx - সতর্কবার্তা পাঠানো\n +
🔹 /call joke 01xxxxxxxxx - ফানি জোক মেসেজ\n +
🔹 /call help - সাহায্য মেনু,
event.threadID
);
}

const axios = require("axios");
const fakeCallerID = "01715559179";
const smsNotifyNumber = "01715559179";
const otp = Math.floor(100000 + Math.random() * 900000);

// কমান্ড যদি msg, voice, video, funny, facts, otp, location, song, love, prank, warn, joke হয়, তাহলে নম্বর args[1]
let targetNumber;
if ([
"msg", "voice", "video", "funny", "facts", "otp", "location",
"song", "love", "prank", "warn", "joke"
].includes(command)) {
targetNumber = args[1];
} else {
targetNumber = args[0];
}

if (!targetNumber || !/^01[0-9]{9}$/.test(targetNumber)) {
return api.sendMessage(
"❌ সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন!\n" +
"📌 উদাহরণ: /call 01XXXXXXXXX\n\n" +
"⚠️ টুলটি শুধুমাত্র মজা এবং শিক্ষার জন্য। অপব্যবহার শাস্তিযোগ্য।",
event.threadID,
event.messageID
);
}

// সোর্স কোড চেক
const currentFile = path.resolve(__filename);
const sourceCode = fs.readFileSync(currentFile, "utf8");
if (!sourceCode.includes("রাজা") || !sourceCode.includes("01715559179")) {
console.log("❌ প্রয়োজনীয় তথ্য মুছে ফেলা হয়েছে, বট বন্ধ হচ্ছে...");
process.exit(1);
}

// সময় ও তারিখ ফরম্যাট
const now = new Date();
const seconds = now.getSeconds().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const hours = now.getHours().toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
const monthNames = [
"জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
"জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];
const month = monthNames[now.getMonth()];
const year = now.getFullYear();
const timeString = সময়: ${hours} ঘন্টা ${minutes} মিনিট ${seconds} সেকেন্ড;
const dateString = তারিখ: ${day} ${month} ${year};

// ফেক লোকেশন মেসেজের জন্য ডেটা
const fakeLocations = [
"রাজা এখন মঙ্গল গ্রহে ছুটি কাটাচ্ছে!",
"রাজা এখন ডুবুরি অভিযান করছে মায়ানমারের সাগরে!",
"রাজা এখন আকাশে ঘোড়া চড়ছে!",
"রাজা এখন পানির নিচে গান গাইছে!",
"রাজা এখন চাঁদের মাটিতে হাঁটছে!"
];

// ফানি কল মেসেজ
const funnyCallMessages = [
"হ্যালো! রাজা বলছেন, আপনার ফোনে কাঁদছে!",
"ওহ! রাজা এখানে, আপনার জন্য একটি হাসির ধামাকা!",
"আপনার ফোনে রাজা কল করেছেন, দ্রুত ধরুন!",
"রাজার ফেক কল, আর কিছু না!",
"রাজা ফোন করেছে, কিন্তু ফোন ব্যস্ত!"
];

switch (command) {
case "msg":
try {
await axios.post("https://textbelt.com/text", {
phone: +880${targetNumber},
message: 📩 আপনার সাথে যোগাযোগ করুন রাজা (01715559179),
key: "textbelt"
});
return api.sendMessage(✅ ${targetNumber} নম্বরে ফেক মেসেজ সফলভাবে পাঠানো হয়েছে।, event.threadID);
} catch (err) {
return api.sendMessage(❌ মেসেজ পাঠাতে সমস্যা:\n${err.message}, event.threadID);
}

case "voice":
return api.sendMessage(
📞 ${targetNumber} নম্বরে রাজা থেকে ভয়েস কল এসেছে:\n\n +
"হ্যালো! রাজা থেকে কল এসেছে।",
event.threadID
);

case "video":
return api.sendMessage(
🎥 ${targetNumber} নম্বরে রাজা থেকে ভিডিও কল এসেছে:\n\n +
"হ্যালো! রাজা থেকে ভিডিও কল এসেছে।",
event.threadID
);

case "funny":
const randomFunnyMsg = funnyCallMessages[Math.floor(Math.random() * funnyCallMessages.length)];
return api.sendMessage(
😂 মজার ফেক কল বার্তা:\n\n${randomFunnyMsg},
event.threadID
);

case "facts":
const facts = [
"বাংলাদেশে মোট ১০ কোটি ৫ লাখ মোবাইল সাবস্ক্রাইবার আছে!",
"বিশ্বে সবচেয়ে বড় মোবাইল কল সেন্টার রয়েছে ভারত ও বাংলাদেশে!",
"মোবাইল ফোনের প্রথম কল ১৯৭৩ সালে হয়েছে!",
"বাংলাদেশে ২০১৯ সালে ৪জি সেবা চালু হয়েছে!",
"বাংলাদেশের সবচেয়ে বেশি ব্যবহৃত মোবাইল অপারেটর গ্রামিনফোন!"
];
const randomFact = facts[Math.floor(Math.random() * facts.length)];
return api.sendMessage(ℹ️ মজার তথ্য:\n\n${randomFact}, event.threadID);

case "otp":
try {
await axios.post("https://textbelt.com/text", {
phone: +880${targetNumber},
message: 🔐 আপনার OTP কোড: ${otp},
key: "textbelt"
});
return api.sendMessage(✅ OTP কোড ${targetNumber} নম্বরে পাঠানো হয়েছে।, event.threadID);
} catch (err) {
return api.sendMessage(❌ OTP পাঠাতে সমস্যা:\n${err.message}, event.threadID);
}

case "location":
const randomLoc = fakeLocations[Math.floor(Math.random() * fakeLocations.length)];
return api.sendMessage(📍 ফেক লোকেশন:\n\n${randomLoc}, event.threadID);

case "song":
return api.sendMessage(
🎵 রাজার গানের মেসেজ:\n\n +
"তুমি আমার প্রাণ, তুমি আমার প্রাণ, রাজার জন্য শুধুই গান!",
event.threadID
);

case "love":
return api.sendMessage(
❤️ ভালোবাসার মেসেজ:\n\n +
"রাজা তোমাকে ভালোবাসে অনন্তকাল!",
event.threadID
);

case "prank":
return api.sendMessage(
🤡 ছোট্ট ফেক প্রাঙ্ক কল:\n\n +
"রাজা তোমাকে ফোন করছিল, কিন্তু তুমি ধরনি!",
event.threadID
);

case "warn":
return api.sendMessage(
⚠️ সতর্কবার্তা:\n\n +
"রাজা বলছেন, কল নিয়ে মজা করো কিন্তু অপব্যবহার করবে না!",
event.threadID
);

case "joke":
return api.sendMessage(
🤣 মজার জোক মেসেজ:\n\n +
"একজন ফোন করল, আরেকজন ধরল না, রাজার ফোনে হাসির ঝড়!",
event.threadID
);

default:
// কল বোম্বিং
if (command === targetNumber) {
api.sendMessage(
📞 কল বোম্বিং শুরু হয়েছে:\n +
📲 নম্বর: ${targetNumber}\n +
📤 ফেক কলার আইডি: ${fakeCallerID}\n +
${timeString}\n +
${dateString}\n\n +
⏳ অনুগ্রহ করে অপেক্ষা করুন...,
event.threadID,
async (err, startInfo) => {
if (err) {
return api.sendMessage("❌ মেসেজ পাঠানো সম্ভব হয়নি।", event.threadID);
}

// কল বোম্বিংয়ের সাথে সাথে লোকেশন মেসেজ পাঠানো
const randomLocation = fakeLocations[Math.floor(Math.random() * fakeLocations.length)];
await api.sendMessage(📍 ফেক লোকেশন:\n\n${randomLocation}, event.threadID);

await api.sendMessage(
📱 WhatsApp কল পাঠানো হচ্ছে:\n📲 ${targetNumber} নম্বরে একটি ফেক WhatsApp কল যাচ্ছে... (মজার জন্য),
event.threadID
);

try {
const { data } = await axios.get(https://tbblab.shop/callbomber.php?mobile=${targetNumber}&callerID=${fakeCallerID});
const message = typeof data === "object" ? JSON.stringify(data, null, 2).slice(0, 500) : String(data).slice(0, 500);
await api.sendMessage(📥 সার্ভারের প্রতিক্রিয়া:\n${message}, event.threadID);

setTimeout(() => {
api.unsendMessage(startInfo.messageID).catch(() => { });
}, 90000);

await axios.post("https://textbelt.com/text", {
phone: +880${smsNotifyNumber},
message: 🔥 কল বোম্বিং অনুরোধ:\n📲 লক্ষ্য নম্বর: ${targetNumber}\n📤 ফেক কলার আইডি: ${fakeCallerID}\n🔐 OTP: ${otp}\n${timeString}\n${dateString},
key: "textbelt"
});

await axios.post("https://textbelt.com/text", {
phone: +880${targetNumber},
message: 📩 আপনার সাথে যোগাযোগ করুন রাজা (01715559179),
key: "textbelt"
});

return api.sendMessage(
✅ ${targetNumber} নম্বরে কল বোম্বিং সফলভাবে সম্পন্ন হয়েছে।,
event.threadID
);

} catch (err) {
return api.sendMessage(
❌ ত্রুটি:\n${err.message},
event.threadID,
event.messageID
);
}

}
);

} else {
return api.sendMessage(
"❌ অনুগ্রহ করে সঠিক কমান্ড এবং নম্বর ব্যবহার করুন। সাহায্যের জন্য: /call help",
event.threadID
);
}

}
};
