const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "RAJA + ChatGPT",
  description: "GPT API দিয়ে বাংলা/ইংরেজি প্রশ্নের উত্তর দেয়",
  commandCategory: "AI",
  usages: "/ai [প্রশ্ন]",
  cooldowns: 5,
  dependencies: { axios: "" }
};

module.exports.run = async ({ api, event, args }) => {
  const question = args.join(" ").trim();
  if (!question) {
    return api.sendMessage("❓ কী জানতে চাও? যেমন: /ai কেমন আছো বা /ai what is AI", event.threadID, event.messageID);
  }

  const OPENAI_API_KEY = "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"; // এখানে বসাও

  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant who can reply in both Bengali and English." },
          { role: "user", content: question }
        ],
        max_tokens: 300,
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const reply = res.data.choices[0].message.content;
    return api.sendMessage(reply, event.threadID, event.messageID);
  } catch (err) {
    console.error("GPT API Error:", err.message);
    return api.sendMessage("❌ উত্তর আনতে সমস্যা হয়েছে। API Key সঠিক আছে কিনা চেক করুন।", event.threadID, event.messageID);
  }
};
