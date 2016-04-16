'use strict';

var device = require('../support/device.js');
var shell = device.shell;
var isAndroid = device.isAndroid;
var APP = require('../support/APP.js');

module.exports = function back(num){
    num = num || -1;
    if(shell === 'qsh'){
        //调用APP接口返回
        APP.back(num);
    }
    else {
        history.back();
    }
}