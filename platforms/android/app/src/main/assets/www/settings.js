document.getElementById("qualityi").value = localStorage.getItem("quality");
document.getElementById("aeditv").value = localStorage.getItem("allowedit");
document.getElementById("analyticsv").value = localStorage.getItem("enableAnalytics");
document.getElementById("languagev").value = localStorage.getItem("language");
var xhr = new XMLHttpRequest();
xhr.addEventListener("readystatechange", function () {
	if (this.readyState === 4) {
		alert(this.responseText);
	}
});

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
	if (confirm(STRINGS[lang].RESET_ANALYTICS)) {
		cordova.plugins.firebase.analytics.resetAnalyticsData();
		alert(STRINGS[lang].RESET_ANALYTICS_DONE);
	}
}

function requestDataDeletion() {
	if (confirm(STRINGS[lang].REQUEST_DATA_DELETION)) {
		cordova.plugins.firebase.analytics.getAppInstanceId().then(function(value) {
			xhr.open("GET", "https://us-central1-lithiiomobile.cloudfunctions.net/requestDataDeletion?id=" + value);
			xhr.send();
		});
	}
};

function clearHistory() {
	if (confirm(STRINGS[lang].CLEAR_UPLOAD_HISTORY)) {
		localStorage.setItem("history", "");
		alert(STRINGS[lang].CLEAR_UPLOAD_HISTORY_DONE);
	}
}

function changeLang() {
	localStorage.setItem("language", document.getElementById("languagev").value);
	window.location.reload()
}