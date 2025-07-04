const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports.config = {
 name: 'autosent',
 version: '10.0.4',
 hasPermssion: 0,
 credits: 'Priyansh Rajput (Modified by SUJON)',
 description: 'Automatically sends funny-love mixed messages based on time (BD Time)',
 commandCategory: 'group',
 usages: '',
 cooldowns: 3
};

const messages = [
 { time: '12:59 AM', message: '╭•┄┅══❁🌺❁══┅┄•╮ Notification From Raja\n╰•┄┅══❁🌺❁══┅┄•╯' },
];

module.exports.onLoad = ({ api }) => {
 console.log(chalk.green.bold('✅ AutoSent Funny-Love Module Loaded (BD Time)'));

 messages.forEach(({ time, message }) => {
   const [hour, minute, period] = time.split(/[: ]/);
   let hour24 = parseInt(hour);
   if (period === 'PM' && hour !== '12') hour24 += 12;
   if (period === 'AM' && hour === '12') hour24 = 0;

   const rule = new schedule.RecurrenceRule();
   rule.tz = 'Asia/Dhaka';
   rule.hour = hour24;
   rule.minute = parseInt(minute);

   schedule.scheduleJob(rule, () => {
     if (!global.data?.allThreadID) return;
     global.data.allThreadID.forEach(threadID => {
       api.sendMessage(message, threadID, (err) => {
         if (err) console.error(`❌ Error sending message to ${threadID}:`, err);
       });
     });
   });
 });

};

module.exports.run = () => {};
