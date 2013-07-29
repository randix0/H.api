H = {
    html5ready: null,
    currentsURI: null,
    contentDOM: '#mainContent',
    html5supports: function(){
        return !!(window.history && history.pushState);
    },
    init: function(){
        H.currentsURI = location.pathname;
        if (!H.html5ready) H.html5ready = H.html5supports;
        H.binder();
        console.log('H inited');
    },
    binder: function(){
        $('.x').bind('click', function(e){
            //console.log(this.href);
            H.ajaxGetContent(this.href);
            history.pushState(null, null, this.href);
            e.preventDefault();
        });
    },
    ajaxGetContent: function(href){
        console.log('H ajaxGetContent');
        $.ajax({
            url: href,
            type: 'GET',
            dataType: 'html',
            success: function(data){
                console.log(data);
                $(H.contentDOM).html(data);
                H.currentsURI = location.pathname;
            }
        });
    }
};

$(document).ready(function(){
    H.init();
    if (!H.html5ready) { return; }
    window.setTimeout(function() {
        window.addEventListener("popstate", function(e) {
            if (H.currentsURI != location.pathname) {
                H.ajaxGetContent(location.pathname);
                H.currentsURI = location.pathname;
                console.log(location.pathname);
            }
        }, false);
    }, 1);
});