var api_key = 'AIzaSyDFnRpibpYUjW_Q9f8c2txcoIQTswnP1hM';


chrome.commands.onCommand.addListener(function(command) {
	chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function(response){
			if (typeof(response) !== 'undefined') sendYouTubeRequest(response.data);
		  });	
	});
});

function sendYouTubeRequest(selectedText) {
	var url =  'https://www.googleapis.com/youtube/v3/search?part=id&q=' + encodeURIComponent(selectedText) + '&key=' + api_key;

	$.getJSON(url, function(data) {
		var baseUrl = 'http://www.youtube.com/watch?v=';
		var videoUrl, currentItem;

		for (var i=0;i<data.items.length;i++)
		{ 
			currentItem = data.items[i].id;
			if (currentItem.kind === 'youtube#video') {
				videoUrl = baseUrl + currentItem.videoId;
				break;
			} 
		}

		if (typeof(videoUrl) !== 'undefined')
		{
			$('body').append('<textarea id="test"/>');
			var $test = $('#test');
			$test.text(videoUrl);
			$test.select();
			document.execCommand('copy');
		}
	});
}