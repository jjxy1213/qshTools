'use strict';

var compileTpl = require('../util/compileTpl.js');

var template = '<div class="weui_loading qsh_loading">\
    <div class="weui_loading_leaf weui_loading_leaf_0"></div>\
        <div class="weui_loading_leaf weui_loading_leaf_1"></div>\
        <div class="weui_loading_leaf weui_loading_leaf_2"></div>\
        <div class="weui_loading_leaf weui_loading_leaf_3"></div>\
        <div class="weui_loading_leaf weui_loading_leaf_4"></div>\
        <div class="weui_loading_leaf weui_loading_leaf_5"></div>\
        <div class="weui_loading_leaf weui_loading_leaf_6"></div>\
        <div class="weui_loading_leaf weui_loading_leaf_7"></div>\
        <div class="weui_loading_leaf weui_loading_leaf_8"></div>\
        <div class="weui_loading_leaf weui_loading_leaf_9"></div>\
        <div class="weui_loading_leaf weui_loading_leaf_10"></div>\
        <div class="weui_loading_leaf weui_loading_leaf_11"></div>\
    </div>';
var template_wrapper = '<div class="qsh_spinner_wrapper">\
{{spinner}}\
</div>';

module.exports.spinner = function spinner(mount){
    if(!mount) return;
    var $spinner = $(template).appendTo(mount);

    return $spinner;
}

module.exports.spinnerFill = function spinnerFill(mount){
    if(!mount) return;

    var $spinner = $(compileTpl(template_wrapper, {
        spinner: template
    })).appendTo(mount);

    return $spinner;
}