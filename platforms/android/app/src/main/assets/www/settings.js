document.getElementById("qualityi").value = localStorage.getItem("quality");
document.getElementById("aeditv").value = localStorage.getItem("allowedit");
document.getElementById("analyticsv").value = localStorage.getItem("enableAnalytics");
// document.getElementById("appinID").innerHTML = cordova.plugins.firebase.analytics.getAppInstanceId();
function changeQuality() {
	if (document.getElementById("qualityi").validity.valid) {
		localStorage.setItem("quality", document.getElementById('qualityi').value);
	} else {
		document.getElementById("qualityi").value = localStorage.getItem("quality");
	}
};

function changeallowEdit() {
	localStorage.setItem("allowedit", document.getElementById("aeditv").value);
}

function changeAnalytics() {
	localStorage.setItem("enableAnalytics", document.getElementById("analyticsv").value);
	cordova.plugins.firebase.analytics.setEnabled(document.getElementById("analyticsv").value);
}

function resetlAnalytics() {
	if (confirm("This will clear ALL LOCAL Analytics data from your device and reset your app-instance ID!, ARE YOU SURE?")) {
		cordova.plugins.firebase.analytics.resetAnalyticsData();
		alert("All local Analytics data has been deleted from your device and your app-instance ID has been reset.");
	}
}
/*
************************************************************************************************************************************************************************
************************************************************************************************************************************************************************
************************************************************************************************************************************************************************
                                                                              REMOVE THIS 
************************************************************************************************************************************************************************
************************************************************************************************************************************************************************
************************************************************************************************************************************************************************
*/
function clearHistory() {
	if (confirm("This will clear your upload history!")) {
		localStorage.setItem("history", "");
		alert("History cleared.");
		console.dir(cordova.plugins.firebase.analytics.getAppInstanceId());
		cordova.plugins.firebase.analytics.getAppInstanceId().then(function(value) {
 		alert(value + " AAAAA LOL ignore this lol");
		});
	}
}