'use strict';

var qsh_page_urls = require('../../asset/urls.js');
var compileTpl = require('../../util/compileTpl.js');

var itemMap = {
    'index': {
        text: '首页',
        href: qsh_page_urls.home,
        icon: 'baojifuben2'
    },
    'uCenter': {
        text: '我的企商',
        href: qsh_page_urls.uCenter,
        icon: 'yonghu'
    },
    'baoyang': {
        text: '我要保养',
        href: qsh_page_urls.maintenance,
        icon: 'woyaobaoyang2'
    },
    'contact': {
        text: '联系我们',
        href: qsh_page_urls.contact,
        icon: 'lianxi'
    }
};

var default_item = ['index', 'baoyang', 'contact', 'uCenter'];
var item_template = '<div class="qsh-footer-item {{classes}}" data-href="{{href}}"><i class="iconfont icon-{{icon}}"></i> <div>{{text}}</div></div>';
var wrapper_template = '<div class="qsh-footer" style="position: {{position}}">{{content}}</div>';

function footer(options){
    options = options || {};
    var items = options.items || default_item;

    var temps = items.map(function(item){
        var obj = itemMap[item];
        obj.classes = options.current === item ? 'current-foot': '';
        return compileTpl(item_template, obj);
    });
    temps = temps.join('');

    var obj = {
        content: temps
    };

    var $parent;
    if(options.fixed === false){
        obj.position = 'relative';
        $parent = $(options.mount);
    }
    else {
        obj.position = 'fixed';
        $parent = $(document.body)
    }

    $parent.append(compileTpl(wrapper_template, obj));

    var $items = $('.qsh-footer').find('.qsh-footer-item');
    $items.click(function(){
        var $this = $(this);
        if(!$this.hasClass('current-foot')){
            location.href = $this.data('href');
        }
    });
}

module.exports = footer;