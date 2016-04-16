'use strict';

var qsh_page_urls = require('../asset/urls.js');

module.exports = function goLogin(){
    location.replace(qsh_page_urls.login + '?url=' + encodeURIComponent(location.href));
}