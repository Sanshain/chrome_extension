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

var React = {
	Default : () => { return false },
	
	no_links_page : () => { 
		linksBtn.style.backgroundColor = 'lightgray';
		linksBtn.disabled = true; },
	no_video_page : () => { 
		videoBtn.style.backgroundColor = 'lightgray';
		videoBtn.disabled = true; },	
	
	video_Link : (args) => {
		var addr = args[0];
		
		if (!addr) {
			return;
		}
		else {
			
			var r = document.createElement('div');
			div.className = 'result';
			document.body.appendChild(r);
			div.innerText = addr;			
		}

	},
	
}

var Action = {
	Do : function(_order){
		chrome.tabs.getSelected(
			null,
			function(tab) {
			    chrome.tabs.sendRequest(tab.id, {
					
						order : _order
					}, 
					function(response) {
						
						if (response.act) {
							(React[response.act] || React.Default)(
								response.args
							);
						}
						
						//alert(response.act);//temp:
					}
			    );
			}
		);		
	}
}
	


window.onload = function(){
	
	Action.Do("Check");
	
	

	contextBtn.onclick = function(){

		Action.Do('turn_menu');

	}

	linksBtn.onclick = function(){
		
		Action.Do('get_links');
		
	}

	copyBtn.onclick = function(){
		
		Action.Do('Copy_Turn');
		
	}
		
	videoBtn.onclick = function(){
		
		Action.Do('video_Link');
		
	}
	
	show_links.onclick = function(){
		
		Action.Do('show_links');
		
	}
		
}



