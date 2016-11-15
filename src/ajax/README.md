#jQuery ajax方法的封装

调用示例
```js
qshObject.ajax(url, data);
qshObject.ajax(url, data).then(function(data){
  成功的回调
},function(err){
   失败的回调

});
```
返回一个jQuery Deferred对象

该方法会根据接口的返回数据的不同做差别处理
```
返回数据为空?是 --> 失败
      否
      |
返回数据结构中是否带有error字段?否 --> 成功
      是
      |
error值是否为201?否 --> 失败
      是
      |
返回数据结构中是否带有data字段?否 --> 返回全部数据结构
      是
      |
仅返回data字段内容
      |
     结束
```
