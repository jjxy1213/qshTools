'use strict';

var keystr = 'MIGfMA0GCSqGQKBgQCIyirbChVxQFk3gItINV0ivasC2MpE1OzFzwgLt2nv14LXJTRmawLf1cduRhVWT13ldhidL6NJmMR0gLPD2PTq5JjmuwxSEd5AIdGm3OIaRrScQ24PlEbho2+ApTLjzCknGkY1wIDAQAB'
var encrypt = new JSEncrypt();
encrypt.setPublicKey(keystr);

module.exports = function publicKey(str){
    return encrypt.encrypt(str);
};
