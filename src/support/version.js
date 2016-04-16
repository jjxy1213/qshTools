'use strict';

var device = require('./device');

var version = {
    major: 1,
    minor: 0,
    patch: 0
};

if(device.shell === 'qsh'){
    //获取当前APP版本号
    var version_reg = /APP8673h(.*)/g;
    var version_str = version_reg.exec(navigator.userAgent)[1];

    //取到版本号信息并给这个变量
    if(version_str && version_str[0] === '/'){
        var number_reg = /^\/(\d*)\.(\d*).(\d*)/g;
        var number = number_reg.exec(version_str);

        version.major = parseInt(number[1]) || 1;
        version.minor = parseInt(number[2]) || 0;
        version.patch = parseInt(number[3]) || 0;
    }
}

module.exports = version;