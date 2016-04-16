'use strict';

var compileTpl = require('../util/compileTpl.js');

var loading_tpl = '<div class="weui_loading_toast">\
    <div class="weui_mask_transparent"></div>\
        <div class="weui_toast">\
            <div class="weui_loading">\
                <!-- :) -->\
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
            </div>\
            <p class="weui_toast_content">{{content}}</p>\
        </div>\
    </div>';
var common_tpl = '<div>\
    <div class="weui_mask_transparent"></div>\
        <div class="weui_toast">\
            <i class="weui_icon_toast"></i>\
            <p class="weui_toast_content">{{content}}</p>\
        </div>\
    </div>';
var warn_tpl = '<div>\
    <div class="weui_mask_transparent"></div>\
        <div class="weui_toast">\
            <i class="qsh_icon_warn"></i>\
            <p class="weui_toast_content">{{content}}</p>\
        </div>\
    </div>';

var tpl_map = {
    loading: loading_tpl,
    warn: warn_tpl,
    success: common_tpl
};

var types = ['loading', 'success', 'warn'];
var defaultContent = {
    'loading': '正在加载中...',
    'warn': '提示信息',
    'success': '已完成'
};

var toast_mount_map = {};
var timer;

module.exports = function toast(type, content){
    //arguments.length表示function传入参数的个数，不传入任何参数默认为success
    if(arguments.length === 0){
        type = 'success';
    }
    //传入一个参数且不等于types里的任意一个，默认为warn
    else if(arguments.length === 1){
        if(types.indexOf(type) === -1){
            content = type;
            type = 'warn';
        }
    }

    if(!content){
        content = defaultContent[type];
    }

    var toast_mount = toast_mount_map[type];

    if(toast_mount){
        toast_mount.find('.weui_toast_content').text(content);
        return autoHideToast(type);
    }
    else {
        var tpl = tpl_map[type];
        toast_mount_map[type] = $(compileTpl(tpl, {
            content: content
        })).appendTo(document.body);
        return autoHideToast(type);
    }
}

function autoHideToast(type){
    toast_mount_map[type].show();
    if(type === 'loading'){
        return {
            hide: function(){
                toast_mount_map[type].hide();
            }
        }
    }
    else {
        clearTimeout(timer);
        timer = setTimeout(function(){
            toast_mount_map[type].hide();
        }, 2000);
    }
}