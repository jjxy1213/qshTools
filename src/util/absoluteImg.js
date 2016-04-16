'use strict';

var prefixUrl = require('./prefixUrl.js');

module.exports = function absoluteImg(url){
    url.toString();
    if(url.indexOf('http') === 0){
        return url;
    }
    if(url[0] === '/'){
        url = url.substring(1);
    }

    if(url.substr(0, 6) === 'images'){
        url = 'http://m.8673h.com/' + url;
    }
    else {
        url = prefixUrl(url);
    }

    return url;
}