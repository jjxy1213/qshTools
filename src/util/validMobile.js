'use strict';

module.exports = function validMobile(str){
    var patrn1 = /^1[3,4,5,7,8]\d{9}$/;
    return patrn1.exec(str);
}