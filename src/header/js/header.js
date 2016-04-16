/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var template_structure = __webpack_require__(1);
	var template_back = __webpack_require__(2);
	var template_icon = __webpack_require__(3);
	var template_text = __webpack_require__(4);
	var template_menu = __webpack_require__(5);
	var template_menu_item = __webpack_require__(6);
	var template_menu_active = __webpack_require__(7);
	var template_active = __webpack_require__(8);

	//预定义头部信息
	var preMenu = {
	    'xiaoxi': {
	        name: '消息',
	        icon: 'xiaoxiHead',
	        handler: function handler() {
	            location.href = qsh_page_urls.message;
	        }
	    },
	    'zhuye': {
	        name: '主页',
	        icon: 'baojifuben2',
	        handler: function handler() {
	            location.href = qsh_page_urls.home;
	        }
	    },
	    'huiyuan': {
	        name: '我的企商',
	        icon: 'huiyuan',
	        handler: function handler() {
	            location.href = qsh_page_urls.uCenter;
	        }
	    },
	    'lianxi': {
	        name: '联系我们',
	        icon: 'lianxi',
	        handler: function handler() {
	            location.href = qsh_page_urls.contact;
	        }
	    },
	    'gouwuche': {
	        name: '购物车',
	        icon: 'gouwuche2',
	        handler: function handler() {
	            location.href = qsh_page_urls.cart;
	        }
	    },
	    'back': {
	        name: '返回',
	        icon: '',
	        handler: function handler() {
	            return defaultBack();
	        }
	    },
	    'address': {
	        name: '收货地址',
	        icon: 'shouhuodizhi',
	        handler: function handler() {
	            location.href = qsh_page_urls.address;
	        }
	    },
	    'account': {
	        name: '账户管理',
	        icon: 'sfsiconyidongduanwodezhanghu',
	        handler: function handler() {
	            location.href = qsh_page_urls.account;
	        }
	    },
	    'info': {
	        name: '修改资料',
	        icon: 'ziliao',
	        handler: function handler() {
	            location.href = qsh_page_urls.editInfo;
	        }
	    },
	    'safe': {
	        name: '账户安全',
	        icon: 'anquanbaozhang',
	        handler: function handler() {
	            location.href = qsh_page_urls.safe;
	        }
	    },
	    'manager': {
	        icon: 'shezhi',
	        items: ['address', 'info', 'safe']
	    }
	};

	var Header = (function () {
	    function Header(options) {
	        _classCallCheck(this, Header);

	        this.options = options;
	        this.container = $(qshUtil.compileTpl(template_structure, options)).appendTo($(options.mount) || document.body);
	        //不使用fixed定位头部
	        if (options.fixed === false) {
	            this.container.css({
	                position: 'relative'
	            });
	        }

	        this.left_dom = this.container.find('.head_left');
	        this.right_dom = this.container.find('.head_right');

	        this.dom_map = {};

	        this.initLeft();
	        this.initRight();
	    }

	    _createClass(Header, [{
	        key: 'append',
	        value: function append(item) {
	            this.addItem(this.right_dom, item);
	        }
	    }, {
	        key: 'prepend',
	        value: function prepend(item) {
	            this.addItem(this.right_dom, item, true);
	        }
	    }, {
	        key: 'remove',
	        value: function remove(id) {
	            var dom = this.dom_map[id];
	            if (dom) {
	                if (dom.data('menu')) {
	                    dom.data('menu').remove();
	                }
	                dom.remove();
	            }
	        }
	    }, {
	        key: 'active',
	        value: function active(id, add) {
	            var dom = this.dom_map[id];
	            if (dom) {
	                if (add) {
	                    //增加
	                    if (dom.hasClass('qsh-head-menu-item')) {
	                        this.addMenuActive(dom);
	                    } else {
	                        this.addIconActive(dom);
	                    }
	                } else {
	                    //删除
	                    if (dom.hasClass('qsh-head-menu-item')) {
	                        this.rmMenuActive(dom);
	                    } else {
	                        this.rmIconActive(dom);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'addIconActive',
	        value: function addIconActive(dom) {
	            if (dom.find('.icon_active').length === 0) {
	                dom.append(template_active);
	            }
	        }
	    }, {
	        key: 'rmIconActive',
	        value: function rmIconActive(dom) {
	            dom.find('.icon_active').remove();
	        }
	    }, {
	        key: 'addMenuActive',
	        value: function addMenuActive(dom) {
	            if (dom.find('.icon-active-wrapper').length === 0) {
	                dom.append(template_menu_active);
	                dom.trigger('head-menu-active-change');
	            }
	        }
	    }, {
	        key: 'rmMenuActive',
	        value: function rmMenuActive(dom) {
	            dom.find('.icon-active-wrapper').remove();
	            dom.trigger('head-menu-active-change');
	        }
	    }, {
	        key: 'initLeft',
	        value: function initLeft() {
	            var _this2 = this;

	            var leftItems = this.options.leftItems || ['back'];
	            var hasBack = false;

	            leftItems.forEach(function (item) {
	                if (typeof item === 'string') {
	                    if (item === 'back') {
	                        _this2.appendBack(preMenu['back']);
	                        hasBack = true;
	                    } else if (preMenu[item]) {
	                        _this2.addItem(_this2.left_dom, preMenu[item]);
	                    }
	                } else {
	                    if (item.icon === 'back') {
	                        _this2.appendBack(item);
	                        hasBack = true;
	                    } else {
	                        _this2.addItem(_this2.left_dom, item);
	                    }
	                }
	            });

	            if (!hasBack && !this.options.noBack) {
	                this.appendBack(preMenu['back']);
	            }
	        }
	    }, {
	        key: 'initRight',
	        value: function initRight() {
	            var _this3 = this;

	            var rightItems = this.options.rightItems;
	            rightItems && rightItems.forEach(function (item) {
	                if (typeof item === 'string' && preMenu[item]) {
	                    _this3.addItem(_this3.right_dom, preMenu[item]);
	                    if (item === 'xiaoxi') {
	                        _this3.loadXiaoxi();
	                    }
	                } else {
	                    _this3.addItem(_this3.right_dom, item);
	                }
	            });
	        }
	    }, {
	        key: 'addItem',
	        value: function addItem(dom, item, pre) {
	            var $dom;
	            var method = 'appendTo';
	            if (pre) {
	                method = 'prependTo';
	            }
	            var id = item.id || item.text || item.icon;

	            if (item.text) {
	                $dom = $(qshUtil.compileTpl(template_text, item))[method](dom);
	            } else if (item.icon) {
	                $dom = $(qshUtil.compileTpl(template_icon, item))[method](dom);
	            }

	            //菜单
	            if (item.items) {
	                this.appendMenu($dom, item.items);
	            } else {
	                $dom.on('click', function (e) {
	                    item.handler(e);
	                });
	            }

	            this.dom_map[id] = $dom;
	        }
	    }, {
	        key: 'appendMenu',
	        value: function appendMenu(holder, list) {
	            var _this4 = this;

	            var $menu = $(template_menu).appendTo(this.container);
	            holder.data('menu', $menu);
	            var $ul = $menu.find('.tkuang');

	            this.container.on('head-menu-active-change', function (e) {
	                if ($ul.find('.icon-active-wrapper').length === 0) {
	                    _this4.rmIconActive(holder);
	                } else {
	                    _this4.addIconActive(holder);
	                }
	            });

	            holder.click(function (e) {
	                $menu.show();
	                setTimeout(function () {
	                    $menu.find('.qsh-head-menu').css({
	                        opacity: 1
	                    });
	                }, 10);
	            });

	            $menu.on('click', function () {
	                setTimeout(function () {
	                    $menu.find('.qsh-head-menu').css({
	                        opacity: 0
	                    });
	                    $menu.hide();
	                }, 10);
	            });

	            list.forEach(function (item) {
	                var $dom;
	                var realItem = item;
	                if (typeof item === 'string' && preMenu[item]) {
	                    realItem = preMenu[item];
	                    $dom = $(qshUtil.compileTpl(template_menu_item, realItem)).appendTo($ul);
	                    if (item === 'xiaoxi') {
	                        _this4.loadXiaoxi();
	                    }
	                } else {
	                    $dom = $(qshUtil.compileTpl(template_menu_item, item)).appendTo($ul);
	                }

	                $dom.on('click', function (e) {
	                    realItem.handler(e);
	                });

	                var id = realItem.id || realItem.text || realItem.icon;
	                _this4.dom_map[id] = $dom;
	            });
	        }
	    }, {
	        key: 'appendBack',
	        value: function appendBack(item) {
	            var back = $(template_back).prependTo(this.left_dom);
	            back.on('click', function (e) {
	                if (item.handler(e) === false) {
	                    return;
	                }
	                defaultBack();
	            });
	            this.dom_map['back'] = back;
	        }
	    }, {
	        key: 'loadXiaoxi',
	        value: function loadXiaoxi() {
	            var _this5 = this;

	            var _this = this;
	            setInterval(function (v) {
	                var $menu = _this5.dom_map['xiaoxiHead'];
	                if (!$menu) {
	                    return;
	                }
	                var type = 'menu';
	                if ($menu.hasClass('head-icon')) {
	                    type = 'icon';
	                }

	                $.ajax({
	                    url: '/Action/readMsgAction.do',
	                    data: {
	                        type: 2
	                    },
	                    method: 'post'
	                }).then(function (data) {
	                    if (parseInt(data.count) > 0) {
	                        type === 'menu' ? _this5.addMenuActive($menu) : _this5.addIconActive($menu);
	                    } else {
	                        type === 'menu' ? _this5.rmMenuActive($menu) : _this5.rmIconActive($menu);
	                    }
	                }, function (err) {});
	            }, 5000);
	        }
	    }]);

	    return Header;
	})();

	function defaultBack() {
	    qshUtil.back();
	    return false;
	}

	function init(options) {
	    return new Header(options);
	}

	qshRegister({
	    name: 'header',
	    entry: init
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = "<div class=\"head custom\"><div class=head-name>{{name}}</div><div class=head-table><div class=head_left></div><div class=head_title>{{html}}</div><div class=head_right></div></div></div>";

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<span class=\"head_icon head_back\"><i class=\"iconfont icon-lighter-zuo\"></i></span>";

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<span class=head_icon><i class=\"iconfont icon-{{icon}}\"></i></span>";

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<span class=head_icon>{{text}}</span>";

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div class=head-menu-wrapper><div class=qsh-head-menu><span class=qsh-head-arrow></span><ul class=tkuang></ul></div></div>";

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<li class=qsh-head-menu-item><i class=\"iconfont icon-{{icon}} shi_18\"></i>{{name}}</li>";

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=icon-active-wrapper><div class=icon_active></div></div>";

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=icon_active></div>";

/***/ }
/******/ ]);