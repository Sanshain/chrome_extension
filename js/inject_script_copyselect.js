var dom = document;
dom.get_s = document.querySelectorAll;

[].slice.call(dom.get_s('*')).forEach(e => e.onselectstart = function() {return true;});

[].slice.call(dom.get_s('*')).forEach(e => e.oncopy = function() {return true;});

//alert('copies');