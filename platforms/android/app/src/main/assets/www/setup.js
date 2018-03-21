if (localStorage.getItem("apikey")) {
	window.location.href = "index.html";
}
cordova.plugins.firebase.analytics.setCurrentScreen("Login Page");
var data = new FormData();
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    var r = JSON.parse(this.responseText);
	if (r.apikey) {
		localStorage.setItem("apikey", r.apikey);
		window.location.href = "index.html";
	} else {
		document.getElementsByName("error")[0].innerHTML = r.error;
	}
  }
});

function login() {
	var email = document.getElementsByName('email')[0].value;
	var pswrd = document.getElementsByName('pswrd')[0].value;
	data.append("email", email);
	data.append("password", pswrd);
	xhr.open("POST", "https://lithi.io/api/v1/fetch-api-key.php");
	xhr.send(data);
};