'use strict';

var ua = navigator.userAgent;

var s = 'common';
if(ua.match(/APP8673h/i)){//在APP环境下ua里包含APP8673h
    s = 'qsh';
}
else if(ua.match(/MicroMessenger/i)){//在微信环境下ua里包含MicroMessenger字符
    s = 'wechat';
}

module.exports.shell = s;

var isIOS = /(iPhone|iPad|iPod|iOS)/i.test(ua);
module.exports.isIOS = isIOS;//在IOS环境

module.exports.isAndroid = !isIOS;//在安卓环境

module.exports.isIOSAPP = (s === 'qsh' && isIOS);//在IOSAPP环境