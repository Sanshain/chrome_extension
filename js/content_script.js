var dom = document;
dom.get = document.querySelector;
dom.get_s = document.querySelectorAll;

//происходит при загрузке страницы
//alert('content_page_initialize');

var react = {
	'Check' : Init,
	'turn_menu' : GetcontextMnu,
	'get_links' : Turn_links,
	'Copy_Turn' : Copy_Turn,
	'video_Link' : video_Link
}

//двустороннее взаимодействие с расширением
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		
		var res = react[request.order]();
		sendResponse({ 
			act: res 
		});
		
	}
);

function Init(){
	var video = dom.get('#video-js-0');
	if (video){
		return 'no_links_page';
	}
	else{
		return 'no_video_page';
	}
}

/*!
	\brief Возвращает контекстное меню. Ничего не возвращает
*/
function GetcontextMnu(){
	
	var script=document.createElement('script');
	script.type='text/javascript';
	script.src=chrome.extension.getURL("js/sotis.js");
	
	
}




function Copy_Turn(){
	
	
	[].slice.call(dom.get_s('*')).forEach(e => e.onselectstart = function() {return true;});
	
	[].slice.call(dom.get_s('*')).forEach(e => e.oncopy = function() {return true;});
}




/*!
	\brief Ищет все ссылки со страницы, удовл. условию
*/
function Turn_links() {

	
	var links = [].slice.call(dom.get_s(
		'.c-btn, .c-btn--green, .c-btn--sm'
	)).filter(e => !e.id).map(e => e.href);
	
	alert(links.length);
	
	var container = dom.createElement('div');
	var content = dom.createElement('textarea');
	var close = dom.createElement('buttom');	
	var save = dom.createElement('buttom');	
	
	container.id = '_id_container';
	container.className = '__container';
	content.className = '__content';
	close.className = '__btn __close';
	close.title = 'закрыть';
	save.className = '__btn __save';
	save.title = 'сохранить';	
	save.innerText = 'Save';
	
	content.value = JSON.stringify(links).replace(/,/g,',\n');
	container.appendChild(content);
	container.appendChild(close);
	container.appendChild(save);
	
	if (document.body.firstElementChild){
		
		dom.body.insertBefore(container, dom.body.firstElementChild);
	}
	else 
		dom.body.appendChild(container);
	
	close.onclick = function(){
		
		container.parentNode.removeChild(container);
	};
	close.onclick = function(){
		
		container.parentNode.removeChild(container);
		
		//сохраняем содержимое в какой-то глобальный объект
	};	

	alert('result');
	
}




/*!
	Получает ссылку на страницу с видео (ютуб)
*/
function video_Link(){
	var video = dom.get('#video-js-0');
	if (video){
		alert("На странице нет видеокурса, удовл условиям");
		return null;
	}
	else 
		return JSON.parse(video.dataset['setup']).sources[0].src;
}