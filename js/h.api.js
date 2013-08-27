H = {
    config: {
        useStates: true,
        useHashes: true,
        contentDOM: '#mainContent'
    },
    routeCallbacks: {
        default: {dataType: 'html', callback: function(data){$(H.config.contentDOM).html(data);}}
    },
    html5ready: null,
    hashReady: null,
    currentsURI: null,
    html5supports: function(){
        return !!(window.history && history.pushState);
    },
    hashSupports: function(){
        if (("onhashchange" in window)) return true;
        else return false;
    },
    init: function(){
        H.currentsURI = location.pathname;
        H.html5ready = H.html5supports();
        if (!H.html5ready) H.config.useStates = false;
        H.hashReady = H.hashSupports();
        if (!H.hashReady) H.config.useHashes = false;
        H.hashchange();
        H.binder();
        console.log('H inited');
    },
    binder: function(){
        if (H.config.useStates){
            history.replaceState({pushed: true}, null, window.location.href);
            $('.x').bind('click', function(e){
                var link = $(this).attr('href');
                if (link.substr(0,1) != '/') {
                    var temp_link = link.replace(location.protocol+'//'+location.hostname, '');
                    if (temp_link == link && link.substr(0,4) != 'http') {
                        return true; //external link
                    } else {
                        link = temp_link;
                    }
                }

                H.ajaxGetContent(link);
                history.pushState({pushed: true}, null, link);
                e.preventDefault();
            });

            window.setTimeout(function() {
                window.addEventListener("popstate", H.popstate, false);
            }, 1);
        }
        if (H.config.useHashes){
            if (!H.config.useStates) {
                $('.x').bind('click', function(e){
                    window.location.hash = '#!'+$(this).attr('href');
                    e.preventDefault();
                });
            }

            window.setTimeout(function() {
                window.addEventListener("hashchange", H.hashchange, false);
            }, 1);
        }
    },
    popstate: function(e){
        if (H.currentsURI != location.pathname) {
            if (e.state && typeof(e.state.pushed) != 'undefined' && e.state.pushed){
                H.ajaxGetContent(location.pathname);
            }
        }
    },
    hashchange: function(){
        location.hash.substr(0,2);
        if (location.hash.substr(0,3) == '#!/') {
            link = location.hash.replace('#!','');
            H.ajaxGetContent(link);
        }
    },
    ajaxGetContent: function(link){
        var r = link.match(/\/(\w+)/i);
        var route = 'default';
        if (r && typeof(r[1]) != 'undefined' && r[1] in H.routeCallbacks && typeof(H.routeCallbacks[r[1]].callback) == 'function') {
            route = r[1];
        }
        H.currentsURI = link;
        $.ajax({
            url: link,
            type: 'GET',
            dataType: (typeof(H.routeCallbacks[route].dataType) != 'undefined')?H.routeCallbacks[route].dataType:'html',
            success: function(data){
                H.routeCallbacks[route].callback(data);
            }
        });
    }
};

$(document).ready(function(){
    H.init();
});

/*
H.routeCallbacks['next'] = {callback: function(data){ console.log('nextCall:'+data); }};
*/
