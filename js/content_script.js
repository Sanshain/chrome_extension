var dom = document;
dom.get = document.querySelector;
dom.get_s = document.querySelectorAll;

//происходит при загрузке страницы
alert('content_page_initialize');

var react = {
	'turn_menu' : GetcontextMnu,
	'get_links' : Turn_links,
	'Copy_Turn' : Copy_Turn
}

//двустороннее взаимодействие с расширением
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {

		sendResponse({ 
			act: react[request.order]() 
		});
		
	}
);


/*!
	\brief ¬озвращает контекстное меню. Ќичего не возвращает
*/
function GetcontextMnu(){
	
	var elems = document.querySelectorAll('*');
	var ar = [].slice.call(elems);
	ar.forEach((e) => e.oncontextmenu = function(){return true});	
	
}


/*!
	\brief »щет все ссылки со страницы, удовл. условию
*/
function Turn_links() {

	
	var links = [].slice.call(dom.get_s(
		'.c-btn, .c-btn--green, .c-btn--sm'
	)).filter(e => !e.id).map(e => e.href);
	
	var container = dom.createElement('div');
	var content = dom.createElement('textarea');
	var content = dom.createElement('buttom');	
	
	container.className = 'container';
	content.className = 'content';
	content.className = 'close';
	
	content.value = links;
	dom.body.appendChild(container);
	
	content.onclick = function(){
		container.parentNode.removeChild(container);
	}

	
	
};


function Copy_Turn(){
	[].slice.call($('*')).forEach(e => e.onselectstart = function() {return true;});
	
	[].slice.call($('*')).forEach(e => e.oncopy = function() {return true;});
}
