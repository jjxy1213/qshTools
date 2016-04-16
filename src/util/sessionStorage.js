'use strict';

module.exports = function ss(key, value){
    try{
        if(value){
            sessionStorage.setItem(key, value);
        }
        else {
            return sessionStorage.getItem(key);
        }
    }catch(e){
        //提示勿禁用本地存储
    }
}