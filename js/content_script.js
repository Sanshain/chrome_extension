var dom = document;
dom.get = document.querySelector;
dom.get_s = document.querySelectorAll;

//происходит при загрузке страницы
//alert('content_page_initialize');

var Inject = {
	Do : function(src){
		var script=document.createElement('script');
		var url = chrome.extension.getURL("js/inject_script_"+src+".js");
		
		script.type='text/javascript';
		script.src= url;
		
		document.head.appendChild(script);
		
		return true;		
	},	
};
Inject['GetcontextMnu']=Inject.Do.bind(null,"contextmenu");
Inject['Copy_Turn']=  Inject.Do.bind ( null, "copyselect");


var react = {
	'Check' : Init,
	'turn_menu' : Inject['GetcontextMnu'],
	'Copy_Turn' : Inject['Copy_Turn'],
	'get_links' : Turn_links,	
	'video_Link' : video_Link,
	'show_links' : () => { 
		chrome.runtime.sendMessage(
			{ action : 'backg_show_l' },
			null,			
			Turn_links
		) 
	}
};

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
	\brief Ищет все ссылки со страницы, удовл. условию
*/
function Turn_links(data) {

	var _a = false;
	var links = [];
	
	if (!data){
		
		links = [].slice.call(dom.get_s(
			'.c-btn, .c-btn--green, .c-btn--sm'
		)).filter(e => !e.id).map(e => e.href);
		
		//alert(links.length);
		
		var _title = (dom.get('.c-section__title')||{}).innerText;	
		var _data=_title+" : "+JSON.stringify(links).replace(/,/g,',\n')+',';	

		data = _data;
	} 
	else _a = true;
	
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

	
	content.value = data;
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
	save.onclick = function(){
		
		if (_a){ //показать все ссылки
			
			saveTextAsFile(data);
		}
		else {
			//сохраняем содержимое в какой-то глобальный объект
			chrome.runtime.sendMessage( 
				{
					action : 'save',
					title : _title, 
					data : links 			//content.value
				}
			);				
		}
	
		
		container.parentNode.removeChild(container);
	};	

	//alert('result');
	
	
	content.focus();
	content.setSelectionRange(0, content.value.length);
	
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







/*!

*/
function saveTextAsFile(textToWrite) {
  
	var textFileAsBlob = new Blob([ textToWrite ], { 
		type: 'text/plain' 
	});
	var fileNameToSaveAs = "links.txt";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	downloadLink.click();
	
	//https://fooobar.com/questions/963043/saving-html5-textarea-contents-to-file

	

	setTimeout(() => {
		downloadLink.parentElement.removeChild(downloadLink);
	},1000);
  
}