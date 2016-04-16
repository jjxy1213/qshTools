'use strict';

var qshObject = {};

var device = require('./support/device.js');
qshObject = $.extend(qshObject, device);
qshObject.APP = require('./support/APP.js');
qshObject.version = require('./support/version.js');
qshObject.sourceLoad = require('./util/sourceLoad.js');
qshObject.wechat = require('./wechat/wechat.js');
qshObject.toast = require('./toast/toast.js');
qshObject.queryString = qshObject.getQueryStringByName = require('./util/queryString.js');
qshObject.ajax = require('./ajax/ajax.js');
qshObject.compileTpl = require('./util/compileTpl.js');//模版解析
qshObject.validEmail = require('./util/validEmail.js');
qshObject.validCard = require('./util/validCard.js');
qshObject.validTel = require('./util/validTel.js');
qshObject.validMobile = require('./util/validMobile.js');
qshObject.goRegister = require('./util/goRegister.js');
qshObject.goLogin = require('./util/goLogin.js');
qshObject.back = require('./util/back.js');
qshObject.uncertainImage = require('./util/uncertainImage.js');
qshObject.sessionStorage = require('./util/sessionStorage.js');
qshObject.localStorage = require('./util/localStorage.js');
qshObject.absoluteImg = require('./util/absoluteImg.js');
qshObject.resizeImg = require('./util/resizeImg.js');
qshObject.alert = require('./alert/alert.js');
qshObject.footer = require('./footer/js/footer.js');
qshObject.newFooter = require('./newFooter/footer.js');
var urls = require('./asset/urls.js');
window.loadingCheck = window.checkLogin = qshObject.checkLogin = require('./util/checkLogin.js');
window.loadingCheckStatu = qshObject.loadingCheckStatu = require('./util/loginStatus.js');
qshObject.spinner = require('./spinner/spinner.js').spinner;
qshObject.spinnerFill = require('./spinner/spinner.js').spinnerFill;
qshObject.module = require('./module/module.js');
qshObject.ajaxLoader = require('./util/ajaxLoader.js');
qshObject.header = require('./header/wjs/head.js');
qshObject.preHeader = require('./header/js/preHead.js');

qshObject.publicKey = require('./util/publicKey.js');
qshObject.ajaxUrl = require('./util/ajaxUrl.js');

/*var keystr = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIyirbChVxQFk3n5ZDyBksvMEmdDIWM+52iGIgItINV0ivasC2MpE1OzFzwgLt2nv14LXJTRmawLf1cduRhVWT13ldhidL601KE23Wabo30TKNJmMR0gLPD2PTq5JjmuwxSEd5AIdGm3OIaRrScQ24PlEbho2+ApTLjzCknGkY1wIDAQAB'
var encrypt = new JSEncrypt();
encrypt.setPublicKey(keystr);

qshObject.publicKey = function(str){
    return encrypt.encrypt(str);
};*/



if (!(typeof qsh_no_fastclick === 'boolean' && qsh_no_fastclick === true)) {
    fastclick(document.body);
}

$.fn.lasyload = function (option) {
    this.lazyload($.extend({
        placeholder: '/images/pro_pic.jpg'
    }, option))
};

window.qshUtil = window.qshObject = qshObject;

window.qsh_page_urls = urls;

window.weixin_openid_promise = function () {
    var dtd = $.Deferred();

    if (device.shell === 'wechat' && location.hostname === 'm.8673h.com') {
        var openid = sessionStorage.getItem('openid');
        if (openid) {
            $.cookie('openid', openid, {path: '/'});
            dtd.resolve(openid);
        }
        else {
            var code = qshObject.getQueryStringByName('code');
            if (!code) {
                var wechat_appid = 'wx970b18d04868b6c3';
                var url = location.href;

                var wechat_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wechat_appid + '&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';

                location.replace(wechat_url);
            }
            else {
                +function () {
                    qshObject.ajax('/Action/WxOpenIdServlet.do', {
                        code: code
                    }).then(function (data) {
                        var openid = data[0].openid;
                        sessionStorage.setItem('openid', openid);
                        $.cookie('openid', openid, {path: '/'});
                        dtd.resolve(openid);
                    }, function (err) {
                        dtd.reject(err);
                    })
                }()
            }
        }
    }
    else {
        dtd.resolve(null);
    }

    return dtd;
}();


(function(){
    //项目域名
    var MOBILE_DOMIAN = "http://m.8673h.com/";
//默认产品图
    var GOOD_DEFAULT="/images/pro_pic.png";
//默认用户图
    var USER_DEFAULT="/images/tuzi.png";
//图片服务器域名
    var IMG_DOMIAN = "http://img.8673h.com/";

    var screenWidth = $(document.body).outerWidth(true);
    var grids = 12;
    /*$(document).ready(function () {
     displayImage();
     var imgArr = $("img");
     $.each(imgArr, function(n, value) {
     var scale = $(value).attr("data-grid");
     if(typeof scale!="undefined"){
     var picName = $(value).attr("data-img");
     value.src = getNewName(picName,scale)
     }
     });
     });*/

    /**
     *
     * @param oldName
     * @param scale  所占的格数
     * @returns {*}
     */
    function getNewName(oldName,scale){
        var newWidth = parseFloat(scale/grids)*screenWidth;

        return patchSize (oldName,newWidth);
    }

    function patchSize (oldName,newWidth){
        var size = ["100x100","150x150","200x200","250x250","300x300","350x350","400x400","450x450","500x500","550x550","600x600","650x650","700x700","800x800"];
        var differ = 9999;
        var index = 0;
        $.each(size, function(n, value) {
            var newArr = value.split("x");
            var val = Math.abs(parseFloat(newArr[0])-parseFloat(newWidth));
            if(val<differ){
                differ = val;
                index = n;
            }
        });
        var pos = oldName.lastIndexOf(".");
        var ext = oldName.substring(pos,oldName.length);
        return oldName.replace(ext,"_"+size[parseInt(index)]+ext);
    }

    function setgrid(para){
        var arr = para.split(",");
        var str = "";
        var num = 1;
        var grid = 0;
        for(var i=0;i<arr.length;i++){
            var paras = arr[i].split("-");
            str = paras[0];
            num = paras[1];
            if(screenWidth<768 && str=="xs"){
                grid = num;
            }
            if(screenWidth>768 && str=="sm"){
                grid = num;
            }
            if(screenWidth>992 && str=="md"){
                grid = num;
            }
            if(screenWidth>1200 && str=="lg"){
                grid = num;
            }

        }
        return grid;
    }



    function displayImage() {
        var group;
        var imgUrl;
        var img = new Image();
        $("img[data-img]").each(function (index, elem) {
            group = $(elem).attr("data-img");
            var scale = $(elem).attr("data-grid");
            if(typeof scale!="undefined"){
                if(/^\d+$/.test(scale)==false){//可变参数则先去计算grid
                    scale = setgrid(scale);
                    $(elem).attr("data-grid",scale);
                }
                group = getNewName(group,scale)
            }
            imgUrl =  group;
            if (group != "") {
                if (img.complete) {
                    $(elem).attr("src", imgUrl);
                } else {
                    img.onload = function () {
                        $(elem).attr("src", imgUrl);
                        img.onload = null;
                    };
                    img.src = imgUrl;
                }
            }
        });
    }

    window.displayImage = displayImage;
})();