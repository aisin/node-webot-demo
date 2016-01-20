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
    var type = message.MsgType;
    var msg = (message.Content || '').trim();

    if(type === 'text'){
        // message为文本内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125035',
        // MsgType: 'text',
        // Content: 'http',
        // MsgId: '5837397576500011341' }
    }else if(type === 'image'){
        // message为图片内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359124971',
        // MsgType: 'image',
        // PicUrl: 'http://mmsns.qpic.cn/mmsns/bfc815ygvIWcaaZlEXJV7NzhmA3Y2fc4eBOxLjpPI60Q1Q6ibYicwg/0',
        // MediaId: 'media_id',
        // MsgId: '5837397301622104395' }
    }else if(type === 'voice'){
        // message为音频内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'voice',
        // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
        // Format: 'amr',
        // MsgId: '5837397520665436492' }
    }else if(type === 'video'){
        // message为视频内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'video',
        // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
        // ThumbMediaId: 'media_id',
        // MsgId: '5837397520665436492' }
    }else if(type === 'shortvideo'){
        // message为短视频内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'shortvideo',
        // MediaId: 'OMYnpghh8fRfzHL8obuboDN9rmLig4s0xdpoNT6a5BoFZWufbE6srbCKc_bxduzS',
        // ThumbMediaId: 'media_id',
        // MsgId: '5837397520665436492' }
    }else if(type === 'location'){
        // message为位置内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125311',
        // MsgType: 'location',
        // Location_X: '30.283950',
        // Location_Y: '120.063139',
        // Scale: '15',
        // Label: {},
        // MsgId: '5837398761910985062' }
    }else if(type === 'link'){
        // message为链接内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'link',
        // Title: '公众平台官网链接',
        // Description: '公众平台官网链接',
        // Url: 'http://1024.com/',
        // MsgId: '5837397520665436492' }
    }else if(type === 'event'){
        // message为事件内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'event',
        // Event: 'LOCATION',
        // Latitude: '23.137466',
        // Longitude: '113.352425',
        // Precision: '119.385040',
        // MsgId: '5837397520665436492' }
    }else if(type === 'device_text'){
        // message为设备文本消息内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'device_text',
        // DeviceType: 'gh_d3e07d51b513'
        // DeviceID: 'dev1234abcd',
        // Content: 'd2hvc3lvdXJkYWRkeQ==',
        // SessionID: '9394',
        // MsgId: '5837397520665436492',
        // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
    }else if(type === 'device_event'){
        // message为设备事件内容
        // { ToUserName: 'gh_d3e07d51b513',
        // FromUserName: 'oPKu7jgOibOA-De4u8J2RuNKpZRw',
        // CreateTime: '1359125022',
        // MsgType: 'device_event',
        // Event: 'bind'
        // DeviceType: 'gh_d3e07d51b513'
        // DeviceID: 'dev1234abcd',
        // OpType : 0, //Event为subscribe_status/unsubscribe_status时存在
        // Content: 'd2hvc3lvdXJkYWRkeQ==', //Event不为subscribe_status/unsubscribe_status时存在
        // SessionID: '9394',
        // MsgId: '5837397520665436492',
        // OpenID: 'oPKu7jgOibOA-De4u8J2RuNKpZRw' }
    }else{
        res.reply('暂未支持! Coming soon!');
    }
}));

app.listen(18080); // BAE 使用 18080 端口