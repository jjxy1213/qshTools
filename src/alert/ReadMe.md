#弹出提示对话框

2016-4-23新增

type:tip 自定义左右按钮名称
```js
qshObject.alert({
        'type': 'tip',
        'title': '可自定义',
        'msg': '提交数据失败',
        'leftbtn':'修改',
        'rightbtn':'知道了'
        'ok': function(){//rightbtn
            alert('用户点击成功按钮')
        },
        'cancel': function(){//leftbgn
            alert('用户点击取消按钮')
        }
    })
```

调用示例
```js
qshObject.alert({
        'type': 'tip',
        'title': '提示',
        'msg': '提交数据失败',
        'ok': function(){
            alert('用户点击成功按钮')
        },
        'cancel': function(){
            alert('用户点击取消按钮')
        }
    })
```

type共四种
```
tip(提示)提示有取消按钮
warn(警告)
success(成功)
fail(失败)
```

弹框样式参照[weui](http://weui.github.io/weui/#dialog)
