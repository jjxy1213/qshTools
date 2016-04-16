'use strict';

module.exports = function ls(key, value){
    try{
        if(value){
            localStorage.setItem(key, value);
        }
        else {
            return localStorage.getItem(key);
        }
    }catch(e){
        //提示勿禁用本地存储
    }
}