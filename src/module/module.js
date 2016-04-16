'use strict';

var spinnerFill = require('../spinner/spinner.js').spinnerFill;
var ajax = require('../ajax/ajax.js');
var compileTpl = require('../util/compileTpl.js');
var toast = require('../toast/toast.js');

var error_template = '<div class="qsh_module_error">{{msg}}</div>';

function module1(options){
    options.mount = $(options.mount);
    var $spinner = spinnerFill(options.mount);

    ajax(options.url, options.data, options.format).then(function(data){
        $spinner.remove();
        options.success && options.success(data);
    }, function(err){
        $spinner.remove();
        //options.mount.append(compileTpl(error_template, err));
        toast('warn', err.msg);
    })
}

module.exports = module1;