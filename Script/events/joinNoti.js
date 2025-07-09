const moment = require("moment-timezone");

module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.2",
    credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
    description: "গ্রুপে নতুন মেম্বার এলে স্বাগত বার্তা পাঠায় বাংলা সময় ও তারিখ সহ",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": "",
        "moment-timezone": ""
    }
};

function convertToBanglaNumber(input) {
    const engToBan = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
    return input.toString().split('').map(char => engToBan[char] || char).join('');
}

function getBanglaTime() {
    const now = moment().tz("Asia/Dhaka");
    let hour = now.hour();
    let minute = now.minute();
    let period = "";

    if (hour >= 4 && hour < 12) period = "সকাল";
    else if (hour >= 12 && hour < 16) period = "দুপুর";
    else if (hour >= 16 && hour < 18) period = "বিকাল";
    else if (hour >= 18 && hour < 20) period = "সন্ধ্যা";
    else period = "রাত";

    hour = hour % 12 || 12;

    return `${period} ${convertToBanglaNumber(hour)}:${convertToBanglaNumber(minute)} মিনিট`;
}

function getBanglaDate() {
    const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
    const now = moment().tz("Asia/Dhaka");
    const day = convertToBanglaNumber(now.date());
    const month = months[now.month()];
    const year = convertToBanglaNumber(now.year());
    return `${day} ${month} ${year}`;
}

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const path = join(__dirname, "cache", "joinvideo");
    if (!existsSync(path)) mkdirSync(path, { recursive: true });

    const path2 = join(__dirname, "cache", "joinvideo", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    const path3 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path3)) mkdirSync(path3, { recursive: true });
};

module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;

    const banglaTime = getBanglaTime();
    const banglaDate = getBanglaDate();

    // যখন বট নিজেই গ্রুপে যোগ হয়
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        const fs = require("fs");
        return api.sendMessage("", threadID, () => api.sendMessage({
            body:
`╭•┄┅═══❁🌺❁═══┅┄•╮
   আসসালামু আলাইকুম-!!🖤💫
╰•┄┅═══❁🌺❁═══┅┄•╯

🤖 আমাকে গ্রুপে অ্যাড করার জন্য অসংখ্য ধন্যবাদ!

🌸 ইনশাআল্লাহ আমি সর্বদা আপনাদের পাশে থাকবো।

🕒 সময়: ${banglaTime}
📅 তারিখ: ${banglaDate}

📌 কমান্ড দেখতে লিখুন:
${global.config.PREFIX}help বা ${global.config.PREFIX}menu

🌺 BOT NAME: RAJA ViP 5X
`,
            attachment: fs.createReadStream(__dirname + "/cache/ullash.mp4")
        }, threadID));
    } else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinvideo");
            const pathGif = join(path, `${threadID}.video`);

            var mentions = [], nameArray = [], memLength = [], i = 0;

            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);

            let msg = (typeof threadData.customJoin == "undefined")
                ? `╭•┄┅═══❁🌺❁═══┅┄•╮
আসসালামু আলাইকুম-!!🖤
╰•┄┅═══❁🌺❁═══┅┄•╯

❥ নতুন সদস্য: {name}

আপনাকে আমাদের গ্রুপে স্বাগতমঃ
『 {threadName} 』

🕒 সময়: ${banglaTime}
📅 তারিখ: ${banglaDate}

✨ আপনি এই গ্রুপের {soThanhVien} নং সদস্য ✨

🌸 RAJA ViP 5X 🌸`
                : threadData.customJoin;

            msg = msg
                .replace(/\{name}/g, nameArray.join(', '))
                .replace(/\{type}/g, (memLength.length > 1) ? 'বন্ধুরা' : 'বন্ধু')
                .replace(/\{soThanhVien}/g, memLength.map(n => convertToBanglaNumber(n)).join(', '))
                .replace(/\{threadName}/g, threadName);

            if (existsSync(path)) mkdirSync(path, { recursive: true });

            // ছবি/ভিডিও/জিফ Path
            const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));
            let formPush;

            if (existsSync(pathGif)) {
                formPush = { body: msg, attachment: createReadStream(pathGif), mentions };
            } else if (randomPath.length !== 0) {
                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions };
            } else {
                formPush = { body: msg, mentions };
            }

            return api.sendMessage(formPush, threadID);
        } catch (e) {
            return console.log(e);
        }
    }
};
