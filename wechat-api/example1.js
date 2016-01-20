var express = require('express');
var app = express();
var wechat = require('wechat');
var WechatAPI = require('wechat-api');

// Options
var appSecret = 'appSecret';
var config = {
    token: 'some token',
    appid: 'wechat appid',
    encodingAESKey: 'wechat encodingAESKey'
};

var menu = {
    "button": [
        {
            "name": "联系我们",
            "type": "click",
            "key": "V1001_TODAY_MUSIC"
        },
        {
            "name": "关于我们",
            "sub_button": [
                {
                    "type": "view",
                    "name": "我的账户",
                    "url": "http://a.com"
                },
                {
                    "type": "view",
                    "name": "我的资料",
                    "key": "V1001_GOOD"
                }
            ]
        }
    ]
};

var api = new WechatAPI(config.appid, appSecret);

app.use(express.query());

app.use('/wechat', wechat(config, function (req, res, next) {

    // 创建菜单
    api.createMenu(menu, function(err, result){ });

    // 消息处理：text / image / voice / video...

}));

app.listen(18080); // BAE 使用 18080 端口