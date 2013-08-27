<?php

    function isAjax(){
        $result = false;
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
            $result = true;
        return $result;
    }

    $action = null;
    if (isset($_SERVER['REQUEST_URI']) && $_SERVER['REQUEST_URI'])
        $action = $_SERVER['REQUEST_URI'];

    if (isAjax()) {
        echo 'ajax: $action='.$action;
    } else {

?><!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="/js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/js/h.api.js"></script>
</head>
<body>

<nav>
    <h2>Plain links</h2>
    <a id="prev" href="/prev">prev</a>
    <a href="/">index</a>
    <a id="next" href="/next">next</a>
</nav>

<nav>
    <h2>Links with class="x". If H.config.useStates set TRUE - do ajax load</h2>
    <a class="x" href="/prev">x-prev</a>
    <a class="x" href="/">x-index</a>
    <a class="x" href="/next">x-next</a>
</nav>

<nav>
    <h2>Links with href="#!". If H.config.useStates set TRUE - do ajax load</h2>
    <a href="#!/prev">x-prev</a>
    <a href="#!/">x-index</a>
    <a href="#1/next">x-next</a>
</nav>

<section id="mainContent">
    <?=($action)?'$action is set to '.$action:'$action not set'?>
</section>

<!-- for test simple #foo links
<div style="background: #ccc; height: 1000px;">
    just spacer
    <br>
    <a href="#!foo">#!foo</a>
    <a href="#foo">goto foo</a>
</div>
<div id="foo">
    foo=bar
</div>
-->

</body>
</html>
<?php }