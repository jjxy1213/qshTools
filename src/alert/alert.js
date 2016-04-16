'use strict';

var compileTpl = require('../util/compileTpl.js');

var dialog_template = '<div class="weui_dialog_confirm">\
    <div class="weui_mask"></div>\
        <div class="weui_dialog"> \
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>\
            <div class="weui_dialog_bd">{{content}}</div>\
            <div class="weui_dialog_ft">\
                <a href="javascript:;" class="weui_btn_dialog default">取消</a>\
                <a href="javascript:;" class="weui_btn_dialog primary">确定</a>\
            </div>\
        </div>\
    </div>';

var alert_template = '<div class="weui_dialog_alert">\
    <div class="weui_mask"></div>\
        <div class="weui_dialog">\
            <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>\
            <div class="weui_dialog_bd">{{content}}</div>\
            <div class="weui_dialog_ft">\
                <a href="javascript:;" class="weui_btn_dialog primary">确定</a>\
            </div>\
        </div>\
    </div>';

var names = {
    'warn': '警告',
    'success': '成功',
    'fail': '失败',
    'tip': '提示'
};

var events = {
    'ok': 'qsh.alert.ok',
    'cancel': 'qsh.alert.cancel'
};

module.exports = function a(options){//为什么要加a?
    var template = alert_template;
    if(options.type === 'tip'){
        template = dialog_template;
    }

    var title = options.title || names[options.type];

    template = compileTpl(template, {
        title: title,
        content: options.msg
    });

    var $alert = $(template).appendTo(document.body);

    var $ok = $alert.find('.weui_btn_dialog.primary');
    var $cancel = $alert.find('.weui_btn_dialog.default');

    var cb_ok = options.ok || function(){
            $(document.body).trigger($.Event(events['ok']))//看不懂的地方
        };

    var cb_cancel = options.cancel || function(){
            $(document.body).trigger($.Event(events['cancel']))
        };

    $ok.click(wrapper(cb_ok));
    $cancel.click(wrapper(cb_cancel));

    function wrapper(cb){
        return function(){
            $alert.remove();
            cb();
        }
    }
}