module.exports.config = {
 'name': "ht",
 'version': "1.0.0",
 'hasPermssion': 0x0,
 'credits': "Shaon Ahmed",
 'description': "Made manto",
 'commandCategory': "Hình ảnh",
 'usages': "sad vedio",
 'cooldowns': 0x5,
 'dependencies': {
 'request': '',
 'fs-extra': '',
 'axios': ''
 }
};
module.exports.run = async ({
 api: _0x49e1e3,
 event: _0x1703e3,
 args: _0x9dad1a,
 client: _0x42df01,
 Users: _0x44b8cb,
 Threads: _0x55fd3b,
 __GLOBAL: _0x258748,
 Currencies: _0x102646
}) => {
 const _0x46768b = global.nodemodule.request;
 const _0x23c96a = global.nodemodule["fs-extra"];
 var _0x40023d = ["  𝘙𝘈𝘑𝘈 𝘝𝘪𝘗 5𝘟🐰"];
 var _0xa3ec84 = _0x40023d[Math.floor(Math.random() * _0x40023d.length)];
 var _0x3fdfb0 = ["https://drive.google.com/uc?export=download&id=1Y-Stqy93aPHNN7FYUXoS_69Ob0oMXCVJ',
                  'https://drive.google.com/uc?export=download&id=1KPgcd81Q9SVSbkAYntHoO8DfP5ABIzuG"];
 var _0x5ed4db = () => _0x49e1e3.sendMessage({
 'body': "「 " + _0xa3ec84 + " 」",
 'attachment': _0x23c96a.createReadStream(__dirname + "/cache/26.mp4")
 }, _0x1703e3.threadID, () => _0x23c96a.unlinkSync(__dirname + "/cache/26.mp4"));
 return _0x46768b(encodeURI(_0x3fdfb0[Math.floor(Math.random() * _0x3fdfb0.length)])).pipe(_0x23c96a.createWriteStream(__dirname + "/cache/26.mp34)).on("close", () => _0x5ed4db());
};
