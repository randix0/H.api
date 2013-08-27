H.api
=====

jQuery-based History Api plugin

1. add h.api.js to your page.
2. add class="x" to elements and specify href attr
3. add id="mainContent" to elements to load data
4. modify backend sending ajax|non-ajax data

P.S. As default it uses html5 pushState (if it supported by user`s browser and enabled by 'H.config.useStates = true;') while composing window.pathname; otherwise - hashes ('#!/foo');

P.P.S. Hashes ('#!/foo/bar') binding if it enabled ('H.config.useHashes = true;')

Example: index.php
----------------------------------------
Keep It Simple Stupid (c) ;P
