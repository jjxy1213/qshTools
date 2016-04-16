'use strict';

var module1 = require('../module/module.js');

module.exports = function ajaxLoader(url, data, mount, format){
    var dtd = $.Deferred();
    module1({
        url: url,
        data: data,
        mount: mount,
        method: 'post',
        format: format,
        success: function(data){
            dtd.resolve(data);
        }
    });
    return dtd;
}