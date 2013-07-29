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
    <a id="prev" href="/prev">prev</a>
    <a href="/">index</a>
    <a id="next" href="/next">next</a>
</nav>

<nav>
    <a class="x" href="/prev">x-prev</a>
    <a class="x" href="/">x-index</a>
    <a class="x" href="/next">x-next</a>
</nav>

<section id="mainContent">
    <?=($action)?'$action is set to '.$action:'$action not set'?>
</section>

</body>
</html>
<?php }