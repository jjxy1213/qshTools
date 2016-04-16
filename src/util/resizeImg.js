'use strict';

var prefixUrl = require('./prefixUrl.js');

var ratio =  window.devicePixelRatio || 1;

module.exports = function resizeImg(size, img){
    img = prefixUrl(img);
    var reg = /^.*(\..*?)$/g;
    var arr = reg.exec(img);
    img = img.replace(arr[1], sizeStr(size) + arr[1]);
    return img;
}

function sizeStr(size){
    var pic_size = size * ratio;

    var rest_size = pic_size % 100;
    var main_size = pic_size - rest_size;
    if(rest_size > 50){
        rest_size = 100;
    }
    else {
        rest_size = 50;
    }
    pic_size = main_size + rest_size;
    if(pic_size < 100){
        pic_size = 100;
    }else if(pic_size > 700){
        pic_size = 800
    }

    return '_' + pic_size + 'x' + pic_size;
}