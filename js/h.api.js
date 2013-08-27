H = {
    config: {
        useStates: false,
        useHashes: false
    },
    html5ready: null,
    hashReady: null,
    currentsURI: null,
    contentDOM: '#mainContent',
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
            $('.x').bind('click', function(e){
                //console.log(this.href);
                H.ajaxGetContent(this.href);
                history.pushState(null, null, this.href);
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
    popstate: function(){
        if (H.currentsURI != location.pathname) {
            H.ajaxGetContent(location.pathname);
        }
    },
    hashchange: function(){
        location.hash.substr(0,2);
        if (location.hash.substr(0,3) == '#!/') {
            link = location.hash.replace('#!','');
            H.ajaxGetContent(link);
        }
    },
    ajaxGetContent: function(href){
        $.ajax({
            url: href,
            type: 'GET',
            dataType: 'html',
            success: function(data){
                console.log(data);
                $(H.contentDOM).html(data);
                H.currentsURI = data;
            }
        });
    }
};

$(document).ready(function(){
    H.init();
});