var elems = document.querySelectorAll('*');
var ar = [].slice.call(elems);
ar.forEach((e) => e.oncontextmenu = function(){return true});	

alert(elems.length);