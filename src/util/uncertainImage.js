'use strict';

module.exports = function uncertainImage(image, src, replace){
    var img = new Image();
    img.onload = function(){
        image.src = src;
    };

    img.onerror = function(){
        image.src = replace;
    };

    img.src = src;
    if(img.complete){
        image.src = src;
    }
}