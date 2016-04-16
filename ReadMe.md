#修车仔公用工具集

##组成部分
```
qshTools.js
qshTools.css
```

##功能分割

###qshTools.js
[ajax(http请求)](./src/ajax/)<br>
[alert(弹框提示)](./src/alert/)<br>
[asset(站内地址链接)](./src/asset/)<br>
[footer(通用底部)](./src/footer/)<br>
[header(通用头部)](./src/header/)<br>
[module(自带loading的加载)](./src/module/)<br>
[spinner(加载菊花)](./src/spinner/)<br>
[support(系统信息相关)](./src/support/)<br>
[toast(消息提示)](./src/toast/)<br>
[util(工具方法)](./src/util/)<br>
[wechat(加载微信JSSDK)](./src/wechat/)<br>
cookie(Cookies)


###qshTools.css
[weui(微信官方UI类库)](https://github.com/weui/weui)


####Cookies
更多细节，参考[js-cookie](https://github.com/js-cookie/js-cookie)
调用示例
```javascript
qshObject.Cookies.set('openid', '123');
```

####qsh_no_fastclick
由于页面默认会调用[fastclick](https://github.com/ftlabs/fastclick)会使日期控件出现异常
如果页面不需要fastclick，需要在头部添加一个变量
```js
<script>var qsh_no_fastclick = true</script>
```


####weixin_openid_promise
在微信中打开手机站且当前域名为m.8673h.com时。会自动发起静默授权，获取用户的openid，并将openid写入cookie。
weixin_openid_promise是一个jquery Deferred对象
当页面需要用户登录时。可通过
```js
weixin_openid_promise.then(function(openid){
    //openid为null 代表非微信平台或非m.8673h.com域名
    //否则，openid为当前用户的openid
}, function(err){
    //获取用户openid失败
})
```