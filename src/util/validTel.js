'use strict';

module.exports = function validTel(str){
    var patrn = /^((\+?[0-9]{2,4}\-[0-9]{3,4}\-)|([0-9]{3,4}\-))?([0-9]{7,8})(\-[0-9]+)?$/;
    return patrn.exec(str);
}