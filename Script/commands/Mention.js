module.exports.config = {
  name: "mentionAlert",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RAJA ✨",
  description: "কেউ নির্দিষ্ট UID বা নাম মেনশন করলে ইনবক্সে অ্যালার্ট",
  commandCategory: "System",
  usages: "Auto alert on mention",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  const myUID = "100013678366954"; // তোমার UID
  const targetText = "কা্ঁরে্ঁন্ট্ঁ সু্ঁন্দ্ঁর্ঁ"; // স্পেশাল নাম

  const message = event.body || "";
  const mentionIDs = event.mentions ? Object.keys(event.mentions) : [];

  const isUIDMentioned = mentionIDs.includes(myUID);
  const isTextMatched = message.includes(targetText);

  if (isUIDMentioned || isTextMatched) {
    const senderID = event.senderID;
    const senderLink = `https://www.facebook.com/profile.php?id=${senderID}`;
    const senderPic = `https://graph.facebook.com/${senderID}/picture?type=large`;

    const now = new Date();
    const time = now.toLocaleTimeString("bn-BD");
    const date = now.toLocaleDateString("bn-BD", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    const alertMsg = `📨 মেনশন ডিটেক্টেড!\n` +
      `👤 UID: ${senderID}\n` +
      `🔗 প্রোফাইল: ${senderLink}\n` +
      `🖼️ পিকচার: ${senderPic}\n` +
      `🕒 সময়: ${time} | 📅 তারিখ: ${date}\n` +
      `💬 মেসেজ: ${message}`;

    try {
      await api.sendMessage(alertMsg, myUID);
    } catch (e) {
      console.log("❌ ইনবক্সে মেসেজ পাঠানো যায়নি:", e.message);
    }
  }
};
