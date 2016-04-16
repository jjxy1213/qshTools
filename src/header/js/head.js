(function (global) {
    'use strict';
    var hasTouch = 'ontouchstart' in document.body;
    var activeType = hasTouch ? 'touchstart' : 'click';

    var back_icon_name = 'lighter-zuo';

    var skeleton_dom = '<div class="head"><div class="head-name">{{name}}</div><div class="head-table"><div class="head_left"></div><div class="head_title">{{html}}</div><div class="head_right"></div></div></div></div>';
    var back_dom = '<span class="head_icon head_back"><i class="iconfont icon-{{icon}}"></i></span>';
    var icon_dom = '<span class="head_icon"><i class="iconfont icon-{{icon}}"></i></span>';
    var menu_item_dom = '<li class="qsh-head-menu-item"><i class="iconfont icon-{{icon}} shi_18"></i>{{name}}</li>';
    var menu_item_active = '<div class="icon-active-wrapper"><div class="icon_active"></div></div>';
    var head_active = '<div class="icon_active"></div>';
    var head_menus_dom = '<div class="qsh-head-menu"><span class="qsh-head-arrow"></span><ul class="tkuang"></ul></div>';
    var head_text = '<span class="head_icon">完成</span>';

    var preMenu = {
        'xiaoxi': {
            name: '消息',
            icon: 'xiaoxiHead',
            handler: function(){
                location.href = '/massage/massage.jsp'
            }
        },
        'zhuye': {
            name: '主页',
            icon: 'baojifuben2',
            handler: function(){
                location.href = '/index.html'
            }
        },
        'huiyuan': {
            name: '我的企商',
            icon: 'huiyuan',
            handler: function(){
                location.href = '/m-center/index.html'
            }
        },
        'lianxi': {
            name: '联系我们',
            icon: 'lianxi',
            handler: function(){
                location.href = '/ad/contact-us.html'
            }
        },
        'gouwuche': {
            name: '购物车',
            icon: 'gouwuche2',
            handler: function(){
                location.href = '/shopping/shopping.jsp';
            }
        }
    };

    function constructor(options){
        var $mount, $left, $right, $head;
        var dom_map = {};

        $mount = $(options.mount);
        appendSkeleton(options, options.style, options.fixed);

        appendLeft(options.leftItems || []);

        if(options.rightItems && options.rightItems.length){
            addRight(options.rightItems);
        }

        return {
            append: function(item){
                appendItem(item, $right);
            },
            prepend: function(item){
                appendItem(item, $right, true);
            },
            remove: function(id){
                dom_map[id] && dom_map[id].remove();
                delete dom_map[id];
            },
            active: function(id, clear){

            }
        };

        function connectIconMenu(icon, menu){
            var menu_box_animate = false;
            var menu_box_show = false;
            var endHandler = function(){};

            icon.on(activeType, function(e){
                e.stopPropagation();
                menu_box_show ? hideMenu() : showMenu();
            });

            menu.on(activeType, function(e){
                e.stopPropagation();
            });

            menu.on('webkitTransitionEnd, transitionend', function(e){
                endHandler(e);
            });

            $(document).on(activeType, function(){
                hideMenu();
            });

            function showMenu(){
                endHandler = function(){
                    menu_box_animate = false;
                    menu_box_show = true;
                };
                menu.show();
                menu.css('height');
                menu_box_animate = true;
                menu.addClass('show');
            }

            function hideMenu(){
                endHandler = function(){
                    menu_box_animate = false;
                    menu_box_show = false;
                    menu.hide();
                };
                menu.removeClass('show');
            }
        }

        function back(){
            qshUtil.back();
        }

        function appendSkeleton(options, style, fixed){
            var html = qshUtil.compileTpl(skeleton_dom, options);
            $head = $(html).appendTo($mount);
            $left = $head.find('.head_left');
            $right = $head.find('.head_right');

            if(style){
                $head.addClass(style);
            }

            var default_position = 'fixed';
            if(fixed === false){
                default_position = 'relative';
            }

            $head.css('position', default_position);
        }

        function appendBack(icon, cb){
            $left.prepend(qshUtil.compileTpl(back_dom, {
                icon: icon || back_icon_name
            }));
            $('.head_back').on(activeType, function(){
                if(cb && cb() === false){
                    //do nothing
                }
                else {
                    back();
                }
            })
        }

        function appendItem(item, parent, pre){
            var $html, html;
            var domOp = 'appendTo';
            if(pre){
                domOp = 'prependTo';
            }

            if(typeof item === 'string'){
                item = preMenu[item];
                if(typeof item === 'undefined'){
                    return;
                }
            }

            var map_id;
            if(item.icon){
                html = qshUtil.compileTpl(icon_dom, item);
                $html = $(html)[domOp](parent);
                map_id = item.icon;
            }
            else if(item.text){
                $html = $(head_text)[domOp](parent);
                $html.text(item.text);
                map_id = item.text;
            }

            item.id && (map_id = item.id);

            dom_map[map_id] = $html;

            if(item.handler){
                $html.on(activeType, item.handler);
            }
            else if(item.items){
                var $menu = appendMenu(item.items);
                connectIconMenu($html, $menu);
            }

            if(item.hasActive){
                var $active = $(head_active).appendTo($html.find('i'));

                $html.on(activeType, function(){
                    $active.remove();
                })
            }
        }

        function appendMenu(list){
            var $menu = $(head_menus_dom).appendTo($head);
            var $menu_root = $menu.find('.tkuang');
            list.forEach(function(item){
                //预定义menu
                if(typeof item === 'string'){
                    item = preMenu[item];
                    if(typeof item === 'undefined'){
                        return;
                    }
                }

                var $html = qshUtil.compileTpl(menu_item_dom, item);
                $html = $($html).appendTo($menu_root);

                if(item.handler){
                    $html.on(activeType, item.handler);
                }

                if(item.hasActive){
                    $html.append(menu_item_active);
                }
            });
            return $menu;
        }

        function appendLeft(list){
            var hasBack = false;
            list.forEach(function(item){
                if(item === 'noback'){
                    hasBack = true;
                    return;
                }
                if(item.id === 'back'){
                    appendBack(item.icon, item.handler);
                    hasBack = true;
                }
                else {
                    appendItem(item, $left);
                }
            });

            if(!hasBack){
                appendBack();
            }
        }

        function addRight(list){
            list.forEach(function(item){
                appendItem(item, $right);
            })
        }
    }

    function init(options){
        return constructor(options);
    }
    //global.qshHeader = init;

    qshRegister({
        name: 'header',
        entry: init
    })
})(window);