document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	localStorage.removeItem("pendingupload");
    window.plugins.intent.setNewIntentHandler(function(Intent) {
        if (Intent.clipItems[0].uri) {
            localStorage.setItem("pendingupload", Intent.clipItems[0].uri);
            window.location.href = "index.html";
        }
    });
};

var uhistory = JSON.parse(localStorage.getItem("history"));
if (uhistory.length == 0) {
	document.getElementById("table").insertAdjacentHTML("beforebegin", "<h3>No uploads :(</h3>");
} else {
	var imgs = ["png", "jpg", "jpeg", "gif"];
	for (var i = 0; i < uhistory.length; i++) {
		if ( imgs.includes( uhistory[i].url.split('.').pop() ) ) {
			document.getElementById("table").insertAdjacentHTML("afterbegin", "<tr> <td><div class=imageblock><a href=" + uhistory[i].url + "><img class=thumb src=" + uhistory[i].url + "><div class=type>Picture </a><img class=link src=link.png></div><div class=timestamp datetime=" + uhistory[i].time + "></div></div></td></tr>");
		} else {
			document.getElementById("table").insertAdjacentHTML("afterbegin", "<tr> <td><div class=imageblock><a href=" + uhistory[i].url + "><img class=thumb src=file.png><div class=type>File (." + uhistory[i].url.split('.').pop() + ")</a> <img class=link src=link.png></div><div class=timestamp datetime=" + uhistory[i].time + "></div></div></td></tr>");
		}
}}
timeago().render(document.querySelectorAll('.timestamp'));