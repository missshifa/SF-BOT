const axios = require("axios");
const { DateTime } = require("luxon");

const TIMEZONE = "Asia/Dhaka";
const PRAYER_API = "https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2";

// তোমার ফিক্সড আজানের ভিডিও লিংক
const VIDEO_URL = "https://i.imgur.com/3JqeLEo.mp4"; // 🔁 এখানে তোমার আজানের ভিডিও লিংক বসাও

// যেসব গ্রুপে মেসেজ যাবে না
const excludedGroups = [
  { id: "1234567890", name: "Test Group 1" },
  { id: "0987654321", name: "Test Group 2" }
];

// এখানে তোমার ইনবক্স থ্রেড আইডি বসাও (তোমার ইউজার আইডি)
const YOUR_INBOX_THREAD_ID = "100013678366954"; // <-- তোমার ইনবক্স UID বসাও

// ⏰ আজান নাম বাংলায় কনভার্ট
function getBanglaPrayerName(prayer) {
  const names = {
    Fajr: "ফজরের",
    Dhuhr: "জোহরের",
    Asr: "আসরের",
    Maghrib: "মাগরিবের",
    Isha: "এশার"
  };
  return names[prayer] || prayer;
}

// 📦 বটের সব গ্রুপের লিস্ট (তোমার বট API থেকে এখানে ফেচ করবে)
async function getAllBotGroups(api) {
  // এখানে তোমার বাস্তব গ্রুপ লিস্ট ফেচ ফাংশন বসাও, এখন ডামি দেওয়া হলো:
  return [
    { id: "1234567890", name: "Test Group 1" },
    { id: "2222222222", name: "Islamic Group" },
    { id: "3333333333", name: "FNF Group" },
    { id: "0987654321", name: "Test Group 2" }
  ];
}

async function sendAzanMessageToGroups(api) {
  try {
    const res = await axios.get(PRAYER_API);
    const timings = res.data.data.timings;
    const now = DateTime.now().setZone(TIMEZONE);

    const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    const matchedPrayer = prayerNames.find(prayer => {
      const timeStr = timings[prayer];
      const prayerTime = DateTime.fromFormat(timeStr, "HH:mm", { zone: TIMEZONE }).set({
        year: now.year,
        month: now.month,
        day: now.day
      });
      const diff = Math.abs(now.diff(prayerTime, "minutes").minutes);
      return diff <= 5;
    });

    if (!matchedPrayer) return; // এখন কোনো আজানের সময় নয়

    const banglaPrayer = getBanglaPrayerName(matchedPrayer);
    const messageText = `⏰ এখন ${banglaPrayer} আজান হয়েছে। সবাই মসজিদে গিয়ে নামাজ পড়ো।`;

    const allGroups = await getAllBotGroups(api);

    const excludedList = [];

    for (const group of allGroups) {
      if (excludedGroups.some(g => g.id === group.id)) {
        excludedList.push(`${group.name} (UID: ${group.id})`);
        continue;
      }

      try {
        const video = await axios.get(VIDEO_URL, { responseType: "stream" });

        await api.sendMessage(
          {
            body: messageText,
            attachment: video.data
          },
          group.id
        );

        console.log(`✅ Sent Azan to ${group.name}`);
      } catch (err) {
        console.log(`❌ Failed to send to ${group.name}: ${err.message}`);
      }
    }

    // যদি কিছু গ্রুপ বাদ যায়, ইনবক্সে লিস্ট পাঠাও
    if (excludedList.length > 0) {
      const excludedMessage = `⚠️ নিচের গ্রুপগুলোতে আজান মেসেজ/ভিডিও পাঠানো হয়নি:\n\n${excludedList.join("\n")}`;
      await api.sendMessage(excludedMessage, YOUR_INBOX_THREAD_ID);
      console.log("📩 Excluded গ্রুপ লিস্ট তোমার ইনবক্সে পাঠানো হয়েছে");
    }

  } catch (err) {
    console.error("❌ আজান ফাংশনে ত্রুটি:", err.message);
  }
}

module.exports = {
  sendAzanMessageToGroups
};
