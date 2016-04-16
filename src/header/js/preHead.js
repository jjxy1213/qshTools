'use strict';

var qsh_page_urls = require('../../asset/urls.js');
var header = require('../wjs/head.js');

var search_temp = '<div class="head-search">' +
    '<div class="head-search-input-wrapper">' +
    '<i class="iconfont icon-headsousuo"></i>' +
    '<input placeholder="输入您要搜索的商品" name="search_key"> ' +
    '</div> ' +
    '<div class="head-search-bottom"></div> ' +
    '</div>';

var handler = {
    list: function(mount){
        header({
            mount: mount,
            html: search_temp,
            style: 'custom',
            rightItems: [
                {
                    icon: 'gengduodiandian',
                    hasActive: true,
                    items: [
                        'xiaoxi',
                        'zhuye'
                    ]
                }
            ]
        });

        $(mount).delegate('.head-search', 'click', function(){
            location.href = qsh_page_urls.search;
        });

        $(mount).delegate('input', 'focus', function(e){
            e.preventDefault();
            $(this).blur();
        })
    },
    index: function(mount){
        header({
            mount: mount,
            html: search_temp,
            style: 'custom',
            leftItems: [
                'noback',
                {
                    name: '消息',
                    icon: 'xiaoxiHead',
                    handler: function(){}
                }
            ],
            rightItems: [
                {
                    icon: 'gengduodiandian',
                    hasActive: true,
                    items: [
                        'xiaoxi',
                        'zhuye'
                    ]
                }
            ]
        })
    }
};

module.exports = function(type, mount){
    handler[type](mount);
}
