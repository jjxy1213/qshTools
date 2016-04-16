'use strict';

var qsh_page_urls = require('../../asset/urls.js');
var compileTpl = require('../../util/compileTpl.js');
var back = require('../../util/back.js');

var template_structure = '<div class="head custom">\
    <div class="head-name">{{name}}</div>\
    <div class="head-table">\
        <div class="head_left"></div>\
        <div class="head_title">{{html}}</div>\
        <div class="head_right"></div>\
    </div>\
</div>';
var template_back = '<span class="head_icon head_back"><i class="iconfont icon-lighter-zuo"></i></span>';
var template_icon = '<span class="head_icon"><i class="iconfont icon-{{icon}}"></i></span>';
var template_text = '<span class="head_icon">{{text}}</span>';
var template_menu = '<div class="head-menu-wrapper">\
    <div class="qsh-head-menu"><span class="qsh-head-arrow"></span>\
    <ul class="tkuang"></ul>\
    </div>\
    </div>';
var template_menu_item = '<li class="qsh-head-menu-item"><i class="iconfont icon-{{icon}} shi_18"></i>{{name}}</li>';
var template_menu_active = '<div class="icon-active-wrapper">\
    <div class="icon_active"></div>\
    </div>';
var template_active = '<div class="icon_active"></div>';

//预定义头部信息
var preMenu = {
    'xiaoxi': {
        name: '消息',
        icon: 'xiaoxiHead',
        handler: function(){
            location.href = qsh_page_urls.message
        }
    },
    'zhuye': {
        name: '主页',
        icon: 'baojifuben2',
        handler: function(){
            location.href = qsh_page_urls.home
        }
    },
    'huiyuan': {
        name: '我的企商',
        icon: 'huiyuan',
        handler: function(){
            location.href = qsh_page_urls.uCenter
        }
    },
    'lianxi': {
        name: '联系我们',
        icon: 'lianxi',
        handler: function(){
            location.href = qsh_page_urls.contact;
        }
    },
    'gouwuche': {
        name: '购物车',
        icon: 'gouwuche2',
        handler: function(){
            location.href = qsh_page_urls.cart;
        }
    },
    'back': {
        name: '返回',
        icon: '',
        handler: function(){
            return defaultBack();
        }
    },
    'address': {
        name: '收货地址',
        icon: 'shouhuodizhi',
        handler: function(){
            location.href = qsh_page_urls.address;
        }
    },
    'account': {
        name: '账户管理',
        icon: 'sfsiconyidongduanwodezhanghu',
        handler: function(){
            location.href = qsh_page_urls.account;
        }
    },
    'info': {
        name: '修改资料',
        icon: 'ziliao',
        handler: function(){
            location.href = qsh_page_urls.editInfo;
        }
    },
    'safe': {
        name: '账户安全',
        icon: 'anquanbaozhang',
        handler: function(){
            location.href = qsh_page_urls.safe;
        }
    },
    'manager': {
        icon: 'shezhi',
        items: [
            'address',
            'info',
            'safe'
        ]
    }
};

function Header(options){
    this.options = options;

    if(options.type === 2){
        if(!options.mount){
            alert('头部参数缺失mount');
            return;
        }

        var $mount = $(options.mount);
        this.container = $(compileTpl(template_structure, options)).appendTo($mount);
        $mount.css('height', '45px');
    }
    else {
        this.container = $(compileTpl(template_structure, options)).appendTo($(options.mount) || document.body);
    }


    //不使用fixed定位头部
    if(options.fixed === false){
        this.container.css({
            position: 'relative'
        })
    }

    this.left_dom = this.container.find('.head_left');
    this.right_dom = this.container.find('.head_right');

    this.dom_map = {};

    this.initLeft();
    this.initRight();
}

Header.prototype.append = function(item){
    this.addItem(this.right_dom, item);
}

Header.prototype.prepend = function(item){
    this.addItem(this.right_dom, item, true);
}

Header.prototype.remove = function(id){
    var dom = this.dom_map[id];
    if(dom){
        if(dom.data('menu')){
            dom.data('menu').remove();
        }
        dom.remove();
    }
}

Header.prototype.active = function(id, add){
    var dom = this.dom_map[id];
    if(dom){
        if(add){
            //增加
            if(dom.hasClass('qsh-head-menu-item')){
                this.addMenuActive(dom);
            }
            else {
                this.addIconActive(dom);
            }
        }
        else {
            //删除
            if(dom.hasClass('qsh-head-menu-item')){
                this.rmMenuActive(dom);
            }
            else {
                this.rmIconActive(dom);
            }
        }
    }
}

Header.prototype.addIconActive = function(dom){
    if(dom.find('.icon_active').length === 0){
        dom.append(template_active);
    }
}

Header.prototype.rmIconActive = function(dom){
    dom.find('.icon_active').remove();
}

Header.prototype.addMenuActive = function(dom){
    if(dom.find('.icon-active-wrapper').length === 0){
        dom.append(template_menu_active);
        dom.trigger('head-menu-active-change');
    }
}

Header.prototype.rmMenuActive = function(dom){
    dom.find('.icon-active-wrapper').remove();
    dom.trigger('head-menu-active-change');
}

Header.prototype.initLeft = function(){
    var _this = this;
    var leftItems = this.options.leftItems || ['back'];
    var hasBack = false;

    leftItems.forEach(function(item){
        if(typeof item === 'string'){
            if(item === 'back'){
                _this.appendBack(preMenu['back']);
                hasBack = true;
            }
            else if(preMenu[item]){
                _this.addItem(_this.left_dom, preMenu[item]);
            }
        }
        else {
            if(item.icon === 'back'){
                _this.appendBack(item);
                hasBack = true;
            }
            else {
                _this.addItem(_this.left_dom, item);
            }
        }
    });

    if(!hasBack && !this.options.noBack){
        this.appendBack(preMenu['back']);
    }
}

Header.prototype.initRight = function(){
    var _this = this;
    var rightItems = this.options.rightItems;
    rightItems && rightItems.forEach(function(item){
        if(typeof item === 'string' && preMenu[item]){
            _this.addItem(_this.right_dom, preMenu[item]);
            if(item === 'xiaoxi'){
                _this.loadXiaoxi();
            }
        }
        else {
            _this.addItem(_this.right_dom, item);
        }
    })
}

Header.prototype.addItem = function(dom, item, pre){
    var $dom;
    var method = 'appendTo';
    if(pre){
        method = 'prependTo';
    }
    var id = item.id || item.text || item.icon;

    if(item.text){
        $dom = $(compileTpl(template_text, item))[method](dom);
    }
    else if(item.icon){
        $dom = $(compileTpl(template_icon, item))[method](dom);
    }

    //菜单
    if(item.items){
        this.appendMenu($dom, item.items);
    }
    else {
        $dom.on('click', function(e){
            item.handler(e);
        });
    }

    this.dom_map[id] = $dom;
}

Header.prototype.appendMenu = function(holder, list){
    var _this = this;
    var $menu = $(template_menu).appendTo(this.container);
    holder.data('menu', $menu);
    var $ul = $menu.find('.tkuang');

    this.container.on('head-menu-active-change', function(){
        if($ul.find('.icon-active-wrapper').length === 0){
            _this.rmIconActive(holder);
        }
        else {
            _this.addIconActive(holder);
        }
    });

    holder.click(function(){
        $menu.show();
        setTimeout(function(){
            $menu.find('.qsh-head-menu').css({
                opacity: 1
            })
        }, 10);
    });

    $menu.on('click', function(){
        setTimeout(function(){
            $menu.find('.qsh-head-menu').css({
                opacity: 0
            });
            $menu.hide();
        }, 10);
    });

    list.forEach(function(item){
        var $dom;
        var realItem = item;
        if(typeof item === 'string' && preMenu[item]){
            realItem = preMenu[item];
            $dom = $(compileTpl(template_menu_item, realItem)).appendTo($ul);
            if(item === 'xiaoxi'){
                _this.loadXiaoxi();
            }
        }
        else {
            $dom = $(compileTpl(template_menu_item, item)).appendTo($ul);
        }

        $dom.on('click', function(e){
            realItem.handler(e);
        });

        var id = realItem.id || realItem.text || realItem.icon;
        _this.dom_map[id] = $dom;
    })
}

Header.prototype.appendBack = function(item){
    var back = $(template_back).prependTo(this.left_dom);
    back.on('click', function(e){
        if(item.handler(e) === false){
            return;
        }
        defaultBack();
    });
    this.dom_map['back'] = back;
}

Header.prototype.loadXiaoxi = function(){
    var _this = this;
    setInterval(function(){
        var $menu = _this.dom_map['xiaoxiHead'];
        if(!$menu){
            return;
        }
        var type = 'menu';
        if($menu.hasClass('head-icon')){
            type = 'icon';
        }

        $.ajax({
            url: 'http://my.8673h.com/Action/readMsgAction.do',
            data: {
                type: 2
            },
            method: 'post'
        }).then(function(data){
            if(parseInt(data.count) > 0){
                type === 'menu' ? _this.addMenuActive($menu) : _this.addIconActive($menu);
            }
            else {
                type === 'menu' ? _this.rmMenuActive($menu) : _this.rmIconActive($menu);
            }
        }, function(err){

        })
    }, 5000);
}

function defaultBack(){
    back();
    return false;
}

function init(options){
    return new Header(options);
}

module.exports = init;