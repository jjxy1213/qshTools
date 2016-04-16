'use strict';

var qsh_page_urls = require('../asset/urls.js');
var shell = require('../support/device.js').shell;
var APP = require('../support/APP.js');
var toast = require('../toast/toast.js');

function loadingCheck(){
    var uri = window.location.href;
    uri = encodeURIComponent(uri);
    $.ajax({
        type: 'post',
        url: '/Action/LoginDetectionAction.do',
        dataType: 'json',
        async: false,//true是异步 false是同步
        success: function (data) {
            var statu = data.statu;
            var obj = {
                type: 'warn'
            };
            switch (parseInt(statu)){
                case 0:
                    return;
                case 1:
                    obj.msg = '请先登录';
                    obj.ok = function(){
                        location.replace(qsh_page_urls.login + "?url=" + uri);
                    };
                    break;
                case 2:
                    obj.msg = '请务非法修改系统cookie操作';
                    obj.ok = function(){
                        location.replace(qsh_page_urls.login + "?url=" + uri);
                    };
                    break;
                case 3:
                    obj.msg = '请确认是否本人登录';
                    obj.ok = function(){
                        location.replace(qsh_page_urls.login + "?url=" + uri);
                    };
                    break;
                case 4:
                    obj.msg = '系统繁忙，请刷新重试';
                    obj.ok = function(){
                        location.replace(qsh_page_urls.login + "?url=" + uri);
                    };
                    break;
                case 5:
                    location.replace(qsh_page_urls.error);
                    break;
                case 99:
                    obj.msg = '请确认您的用户名是否已注册或通过审核';
                    obj.ok = function(){
                        location.replace(qsh_page_urls.register);
                    };
                    break;
            }

            if(obj.msg){
                if(shell === 'qsh'){
                    APP.toast(obj.msg);
                    //alert(obj.msg);
                }
                else {
                    toast(obj.msg);
                }
                obj.ok();
            }
        },
        error: function() {
            location.replace(qsh_page_urls.login + "?url=" + uri);
        }
    });
}

module.exports = loadingCheck;