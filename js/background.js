//https://developer.chrome.com/extensions/background_pages

/*!
	\brief Происходит при инсталляции расширения:
	
	Кстати, конекстное меню так и не добавилось
*/
/*
chrome.runtime.onInstalled.addListener(function() {
	
	alert('runtime.onInstalled');
	
	chrome.contextMenus.create({
		"id": "sampleContextMenu",
		"title": "Sample Context Menu",
		"contexts": ["selection"]
	});
	
});
*/

/*
chrome.bookmarks.onCreated.addListener(function() {
	
	alert('bookmarks.onCreated');
});
*/

function rename(name, i){
	i = i ? ++i : 1;
	var rame = name + i;
	
	if (links[rame]) 
	{
		return rename(name, ++i)
	}
	return rame;
}

var links = {};

chrome.runtime.onMessage.addListener(function(message, callback) {

	if (message.action == 'save') {

		if (links[message.title]){
			
			var overr = confirm(
				'В словаре уже есть одноименный раздел с ссылками. ДА - перезаписать, НЕТ - сохранить под другим именем'
			);
			if (overr) links[message.title] = message.data;			
			else{
				
				links[rename(message.title)] = message.data;	
			}
		}
		else links[message.title] = message.data;

		alert(saved);
	}
	else if (message.action == 'show') {
		
		chrome.runtime.sendMessage( {
			action : 'show_links',
			data : links
		});
	}
	
});