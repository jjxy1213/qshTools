'use strict';

var device = require('../support/device.js');
var version = require('../support/version.js');
var isIOSAPP = device.isIOSAPP;
var compileTpl = require('../util/compileTpl');
var urls = require('../asset/urls');
var icons = {
    index: {
        normal: "&#xe658;",
        select: "&#xe730;",
        cn: "首页",
        href: urls.home
    },
    service: {
        normal: "&#xe72f;",
        select: "&#xe72e;",
        cn: "门店",
        href: urls.service
    },
    chepin: {
        normal: "&#xe72b;",
        select: "&#xe72a;",
        cn: "车品",
        href: urls.chepin
    },
    cart: {
        normal: "&#xe72d;",
        select: "&#xe72c;",
        cn: "购物车",
        href: urls.cart
    },
    user: {
        normal: "&#xe732;",
        select: "&#xe731;",
        cn: "我的",
        href: urls.uCenter
    }
};

var items = ["index",'service', 'chepin', 'cart', 'user'];

var template_wrapper = '<div class="qsh-footer">{{items}}</div>';
var template_item = '<div class="qsh-footer-item {{select}}">\
    <a class="qsh-footer-item-inner" href="{{href}}">\
    <i class="iconfont">{{font}}</i>\
    <div class="qsh-footer-cn">{{cn}}</div>\
</a>\
</div>';

function Footer(mount, current, noFix){
    //IOSAPP版本高于1.3.0时，脚部由原生加载;
    if(isIOSAPP && version.major >= 1 && version.minor >= 3){
        return;
    }
    var temps = items.map(function(item){
        var obj = icons[item];
        var data = {
            cn: obj.cn,
            href: obj.href
        };

        if(item === current){
            data.font = obj.select;
            data.select = "qsh-footer-select";
            data.href = "javascript:void(0)";
        }
        else {
            data.font = obj.normal;
        }

        return compileTpl(template_item, data);
    });

    var str = compileTpl(template_wrapper, {
        items: temps.join('')
    });

    var $footer = $(str).appendTo(mount);
    if(noFix){
        $footer.css('position', 'relative');
    }
}

module.exports = Footer;