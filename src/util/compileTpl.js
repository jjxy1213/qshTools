'use strict';

/*import {filterXSS} from "../../../bower_components/xss/lib/xss.js";*/

module.exports = function compileTpl(str, obj){
    var reg = /{{(.*?)}}/g;
    var result;
    while(result = reg.exec(str)){
        var value = typeof obj[result[1]] === 'undefined' ? '' : obj[result[1]];
        /*if(notrust){
            value = filterXSS(value)
        }*/
        str = str.replace(result[0], value);
        reg.lastIndex -= result[0].length;
    }
    return str;
}