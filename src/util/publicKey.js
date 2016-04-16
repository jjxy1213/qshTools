'use strict';

var keystr = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIyirbChVxQFk3n5ZDyBksvMEmdDIWM+52iGIgItINV0ivasC2MpE1OzFzwgLt2nv14LXJTRmawLf1cduRhVWT13ldhidL601KE23Wabo30TKNJmMR0gLPD2PTq5JjmuwxSEd5AIdGm3OIaRrScQ24PlEbho2+ApTLjzCknGkY1wIDAQAB'
var encrypt = new JSEncrypt();
encrypt.setPublicKey(keystr);

module.exports = function publicKey(str){
    return encrypt.encrypt(str);
};