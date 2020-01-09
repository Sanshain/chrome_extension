var dom = document;
dom.get = document.querySelector;
dom.get_s = document.querySelectorAll;

/* попробовать вместо декларе:
chrome.runtime.onMessage.addListener(
function(message, callback) {
  if (message == “runContentScript”){
	chrome.tabs.executeScript({
	  file: 'content_script.js'
	});
  }
});//*/


window.onload = function(){
	
	

	contextBtn.onclick = function(){
		alert('-i');

		//двустороннее взаимодействие с расширением
		chrome.tabs.getSelected(
			null,
			function(tab) {
			    chrome.tabs.sendRequest(tab.id, {
					greeting: "hello"}, 
					function(response) {
						alert(response.farewell);
					}
			    );
			}
		);

	}

	//одностороннее взаимодействие с расширением
	// что-то сделать там на основе действий тут
	// можно разово выполнять файл, если он не подключен
	linksBtn.onclick = function(){
		
		chrome.tabs.query(
			{ 
				active: true, 
				currentWindow: true 
			}, function (tabs) { 
				chrome.tabs.executeScript(
					tabs[0].id,
					{
						code: 'alert("555")',
						//file: 'js/content_script.js'
					}
				); 
			}
		);			
		
	}
	
	//обратная связь
	chrome.runtime.onMessage.addListener(
		function(request,sender,callback){

			if (request=='GetcontextMnu') alert('g');

		}
	);	
		
}



/*var script=document.createElement('script');
script.type='text/javascript';
script.src=chrome.extension.getURL("js/sotis.js");
//*/		

//		 <script src="init.js"></script>