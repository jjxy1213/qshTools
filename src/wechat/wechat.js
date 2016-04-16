'use strict';

var sourceLoad = require('../util/sourceLoad.js');
var device = require('../support/device.js');

module.exports = function wechat(){
    if(device.shell !== 'wechat'){
        return +function(){
            var dtd = $.Deferred();
            dtd.reject();
            return dtd;
        }();
    }
    else {
        return sourceLoad('http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
    }
}