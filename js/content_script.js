var dom = document;
dom.get = document.querySelector;
dom.get_s = document.querySelectorAll;

//���������� ��� �������� ��������
alert('content_page_initialize');

var react = {
	'turn' : GetcontextMnu,
}

//������������ �������������� � �����������
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {

		sendResponse({ 
			act: react[request.order]() 
		});
		
	}
);


/*!
	\brief ���������� ����������� ����. ������ �� ����������
*/
function GetcontextMnu(){
	
	var elems = document.querySelectorAll('*');
	var ar = [].slice.call(elems);
	ar.forEach((e) => e.oncontextmenu = function(){return true});	
	
}


(function Turn_links() {
	
	alert(1);
	
	var links = [].slice.call(dom.get_s(
		'.c-btn, .c-btn--green, .c-btn--sm'
	)).filter(e => !e.id).map(e => e.href);
	
	var links = dom.get_s('a');
	
	alert(links.length);
	
})();


