'use strict';

module.exports = function load(links){
    if(typeof links === 'string'){
        links = [links];
    }

    var promises = links.map(function(link){
        var last = link.substr(-2, 2).toLowerCase();
        return last === 'js' ? loadScript(link) : loadStyle(link);
    });

    return $.when.apply($, promises);
}

function loadScript(link){
    var doc = document;
    var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
    var script = document.createElement('script');
    script.src = link;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    head.appendChild(script);
    return supportLoad(script);
}

function loadStyle(url){
    var doc = document;
    var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    head.appendChild(link);
    return supportLoad(link);
}

function supportLoad(node){
    var dtd = $.Deferred();

    function onload(status){
        status === true ? dtd.reject() : dtd.resolve();
    }

    var supportOnload = "onload" in node;

    if (supportOnload) {
        node.onload = onload;
        node.onerror = function() {
            onload(true)
        }
    }
    else {
        node.onreadystatechange = function() {
            if (/loaded|complete/.test(node.readyState)) {
                onload()
            }
        }
    }

    return dtd;
}