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

// Type 2
app.use('/wechat', wechat(config, wechat.text(function (message, req, res) {
    var str = '';
    for(var i in message){
        str += i + ' : ' + message[i] + ',\n';
    }
    res.reply(str);
}).image(function(message, req, res){
    var str = '';
    for(var i in message){
        str += i + ' : ' + message[i] + ',\n';
    }
    res.reply(str);
}).location(function (message, req, res) {
    var str = '';
    for(var i in message){
        str += i + ' : ' + message[i] + ',\n';
    }
    res.reply(str);
}).voice(function (message, req, res) {
    var str = '';
    for(var i in message){
        str += i + ' : ' + message[i] + ',\n';
    }
    res.reply(str);
}).link(function (message, req, res) {
    console.log(message);
    res.reply('点连接进来的是吧！');
}).event(function (message, req, res) {
    if (message.Event === 'subscribe') {
        // 用户添加时候的消息
        res.reply('谢谢添加公共帐号');
    } else if (message.Event === 'unsubscribe') {
        res.reply('Bye!');
    } else {
        res.reply('暂未支持! Coming soon!');
    }
})));

app.listen(18080);