historyList = [];
request_type = 'POST';


$('#request_form').submit(function(e){
	e.preventDefault();
	sendRequest();
	return false;
});

$('.btn-submit').click(function(){
	$('.btn-submit').removeClass('active');
	$(this).addClass('active');
	if($(this).attr('id')=='getButton')
		request_type = 'GET';
	else if($(this).attr('id')=='postButton')
		request_type = 'POST';
	sendRequest();
});


$('#historyButton').click(function(){
	$('#history').toggle();
});

$('#history').on("click",'.historyText',function(){
	$('input[name="url"]').val($(this).html());
});

$('#history').on("click",'.copyText',function(){
	cmd = $('.historyText',$(this).parent()).html();
	copyTextToClipboard(cmd);
});



function sendRequest()
{
	$('#resultBox').removeClass('success');
	url = $('input[name="url"]').val();
	$.ajax({
		type: request_type,
		url: url,
		success: function(data){
			data = JSON.parse(data);
			// output = htmlEncode(data['output']);
			output = JSON.stringify(data, null, 2);
			$('#result').html(output);
			Prism.highlightElement(document.querySelector('#result'));
			$('#resultBox').addClass('success');
		}
	});
	if(historyList.indexOf(url)==-1)
	{
		historyList.push(url);
		$('#history').append('<div class="historyItem"><div class="copyText">Copy</div><div class="historyText">'+url+'</div></div>');
	}	
}


function copyTextToClipboard(text) {
	var textArea = document.createElement("textarea");
	textArea.style.position = 'fixed';
	textArea.style.top = 0;
	textArea.style.left = 0;
	textArea.style.width = '2em';
	textArea.style.height = '2em';
	textArea.style.padding = 0;
	textArea.style.border = 'none';
	textArea.style.outline = 'none';
	textArea.style.boxShadow = 'none';
	textArea.style.background = 'transparent';
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.select();
	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copying text command was ' + msg);
	} catch (err) {
		console.log('Unable to copy text');
	}
	document.body.removeChild(textArea);
}


function htmlEncode(text)
{
	// text = text.replace(/\n/g, '<br>');
	text = text.replace(/&/g, '&amp;');
	text = text.replace(/</g, '&lt;');
	text = text.replace(/>/g, '&gt;');
	return text;
}