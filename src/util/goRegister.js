'use strict';

var qsh_page_urls = require('../asset/urls.js');

module.exports = function goRegister(){
    location.replace(qsh_page_urls.register + '?url=' + encodeURIComponent(location.href));
}