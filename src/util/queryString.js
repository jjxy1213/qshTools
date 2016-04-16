'use strict';

module.exports = function getQueryStringByName(name, search){
    search = search || location.search;
    var result = search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
}