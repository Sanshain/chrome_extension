
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


chrome.bookmarks.onCreated.addListener(function() {
	
	alert('bookmarks.onCreated');
});



chrome.runtime.onMessage.addListener(function(message, callback) {
	
	if (message.data == 'setAlarm') {
		alert('setAlarm');
		chrome.alarms.create({delayInMinutes: 5});
		
	} else if (message.data == 'runLogic') {
		alert('runLogic');
		chrome.tabs.executeScript({file: 'logic.js'});
		
	} else if (message.data == 'changeColor') {
		
		alert('changeColor');
		chrome.tabs.executeScript(
			{code: 'document.body.style.backgroundColor="orange"'});
	};
});