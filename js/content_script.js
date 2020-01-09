var dom = document;
dom.get = document.querySelector;
dom.get_s = document.querySelectorAll;

//происходит при загрузке страницы
alert('content_page_initialize');


//двустороннее взаимодействие с расширением
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
	  
		if (request.greeting == "hello")
		
			sendResponse({farewell: "goodbye"});
		else
			
			sendResponse({}); // snub them.
});



(function GetcontextMnu(){
	
	alert(0);
	
	var elems = document.querySelectorAll('*');
	var ar = [].slice.call(elems);
	ar.forEach((e) => e.oncontextmenu = function(){return true});
});


(function Turn_links() {
	
	alert(1);
	
	var links = [].slice.call(dom.get_s(
		'.c-btn, .c-btn--green, .c-btn--sm'
	)).filter(e => !e.id).map(e => e.href);
	
	var links = dom.get_s('a');
	
	alert(links.length);
	
})();


