var express = require('express');
var wechat = require('wechat');
// Options
var config = {
    token: 'some token',
    appid: 'wechat appid',
    encodingAESKey: 'wechat encodingAESKey'
};

var app = express();
app.use(express.query());

// Type 1
app.use('/wechat', wechat(config, function (req, res, next) {

    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    var form = message.FromUserName;
    var msg = (message.Content || '').trim();

    if (msg === '123') {
        res.reply('This is a number.');
    } else if (msg === 'text') {
        // 你也可以这样回复text类型的信息
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (msg === 'hehe') {
        // 回复一段音乐
        res.reply({
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3",
                thumbMediaId: "thisThumbMediaId"
            }
        });
    } else if(msg === 'login'){
        // 返回一个登录页面
        res.reply([{
            title: '登陆页面',
            description: '去登陆',
            picurl: 'http://images.huxiu.com/article/cover/201601/18/125928340148.png',
            url: 'http://m.huxiu.com'
        }]);
        return;
    } else {
        // 返回 message 详情
        var detail = '';
        for(var i in message){
            detail += i + ' : ' + message[i] + ',\n';
        }
        res.reply(detail);
    }
}));

app.listen(18080);