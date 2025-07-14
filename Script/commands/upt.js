const axios = require('axios');

module.exports.config = {
 name: "upt",
 version: "1.0.2",
 hasPermission: 0,
 credits: "Shaon Ahmed",
 description: "Uptime monitor (create, delete, status, list)",
 commandCategory: "system",
 usages: "/up [name] [url] | /up delete [id/name] | /up status [id/name] | /up list",
 cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
 const apiLink = "https://web-api-delta.vercel.app/upt";

 if (!args.length) {
 return api.sendMessage(
 `📍 Usage:\n\n` +
 `✅ Create: /up [name] [url]\n` +
 `🗑️ Delete: /up delete [id or name]\n` +
 `📊 Status: /up status [id or name]\n` +
 `📜 List: /up list\n\n` +
 `Example:\n` +
 `/up Shaon https://example.com\n` +
 `/up delete 123456\n` +
 `/up delete Shaon\n` +
 `/up status Shaon\n` +
 `/up list`,
 event.threadID,
 event.messageID
 );
 }

 const command = args[0].toLowerCase();

 // ✅ Delete
 if (command === "delete") {
 const target = args[1];
 if (!target)
 return api.sendMessage("❌ Please provide monitor ID or name.\nUsage: /up delete <id|name>", event.threadID, event.messageID);

 try {
 const res = await axios.get(`${apiLink}?delete=true&${isNaN(target) ? `name=${encodeURIComponent(target)}` : `id=${target}`}`);
 const result = res.data;

 return api.sendMessage(result.success ? result.message : `❌ Error:\n${result.message}`, event.threadID, event.messageID);
 } catch (e) {
 return api.sendMessage(`🚫 API Error: ${e.message}`, event.threadID, event.messageID);
 }
 }

 // ✅ Status
 if (command === "status") {
 const target = args[1];
 if (!target)
 return api.sendMessage("❌ Please provide monitor ID or name.\nUsage: /up status <id|name>", event.threadID, event.messageID);

 try {
 const res = await axios.get(`${apiLink}?status=true&${isNaN(target) ? `name=${encodeURIComponent(target)}` : `id=${target}`}`);
 const result = res.data;

 if (result.success) {
 const data = result.data;
 return api.sendMessage(
 `📊 Monitor Status:\n` +
 `🆔 ID: ${data.id}\n` +
 `📛 Name: ${data.name}\n` +
 `🔗 URL: ${data.url}\n` +
 `⏰ Interval: ${data.interval} minutes\n` +
 `📶 Status: ${data.status == 2 ? "🟢 Up" : data.status == 9 ? "🔴 Down" : "⚪️ Paused"}`,
 event.threadID,
 event.messageID
 );
 } else {
 return api.sendMessage(`❌ Error:\n${result.message}`, event.threadID, event.messageID);
 }
 } catch (e) {
 return api.sendMessage(`🚫 API Error: ${e.message}`, event.threadID, event.messageID);
 }
 }

 // ✅ List
 if (command === "list") {
 try {
 const res = await axios.get(`${apiLink}?list=true`);
 const result = res.data;

 if (result.success) {
 const list = result.monitors;
 if (list.length === 0) {
 return api.sendMessage(`❌ No monitor found.`, event.threadID, event.messageID);
 }

 const msg = list.map(
 (item, index) =>
 `${index + 1}. 🌐 ${item.name}\n` +
 `🔗 ${item.url}\n` +
 `🆔 ID: ${item.id}\n` +
 `📶 Status: ${item.status == 2 ? "🟢 Up" : item.status == 9 ? "🔴 Down" : "⚪️ Paused"}\n`
 ).join("\n");

 return api.sendMessage(`📜 Monitor List:\n\n${msg}`, event.threadID, event.messageID);
 } else {
 return api.sendMessage(`❌ Error:\n${result.message}`, event.threadID, event.messageID);
 }
 } catch (e) {
 return api.sendMessage(`🚫 API Error: ${e.message}`, event.threadID, event.messageID);
 }
 }

 // ✅ Create
 const name = args[0];
 const url = args[1];

 if (!url || !url.startsWith("http")) {
 return api.sendMessage("❌ Please provide name and valid URL.\nUsage: /up [name] [url]", event.threadID, event.messageID);
 }

 try {
 const res = await axios.get(`${apiLink}?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`);
 const result = res.data;

 if (result.success) {
 const data = result.data;
 return api.sendMessage(
 `✅ Monitor Created!\n──────────────\n` +
 `🆔 ID: ${data.id}\n` +
 `📛 Name: ${data.name}\n` +
 `🔗 URL: ${data.url}\n` +
 `⏰ Interval: ${data.interval} minutes\n` +
 `📶 Status: ${data.status == 2 ? "🟢 Up" : data.status == 9 ? "🔴 Down" : "⚪️ Paused"}`,
 event.threadID,
 event.messageID
 );
 } else {
 return api.sendMessage(`❌ Error:\n${result.message}`, event.threadID, event.messageID);
 }
 } catch (e) {
 return api.sendMessage(`🚫 API Error: ${e.message}`, event.threadID, event.messageID);
 }
};
