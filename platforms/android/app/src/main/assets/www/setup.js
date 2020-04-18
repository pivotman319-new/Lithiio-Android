if (localStorage.getItem("apikey")) {
	window.location.replace("index.html");
}
var data = new FormData();
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    var r = JSON.parse(this.responseText);
	if (r.apikey) {
		localStorage.setItem("api_key", r.apikey);
		window.location.replace("index.html");
	} else {
		document.getElementById("error").innerHTML = r.error;
	}
  }
});

function login() {
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	data.append("email", email);
	data.append("password", password);
	xhr.open("POST", "https://lithi.io/api/v2/fetch-api-key.php");
	xhr.send(data);
};
