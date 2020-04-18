document.addEventListener('deviceready', onDeviceReady, false);
var clipboardmultiu = "";
if (!localStorage.getItem("language")) {
    localStorage.setItem("language", "en");
};
function onDeviceReady() {
    if (!localStorage.getItem("api_key")) {
        window.location.replace("setup.html");
    };
    if (!localStorage.getItem("history")) {
        localStorage.setItem("history", "[]");
    };
    if (!localStorage.getItem("quality")) {
        localStorage.setItem("quality", "50");
	};
	if (!localStorage.getItem("allowedit")) {
        localStorage.setItem("allowedit", "false");
	};
	if (!localStorage.getItem("enableAnalytics")) {
        localStorage.setItem("enableAnalytics", "true");
	};
    var ft;
    window.plugins.intent.setNewIntentHandler(function(Intent) {
        if (Intent.clipItems[0].uri) {
        	if (Intent.clipItems.length > 1) {
        	for (var i = 0; i < Intent.clipItems.length; i++) {
                if (i == Intent.clipItems.length) {
                    uploadf(Intent.clipItems[i].uri, true, false, true);
                    cordova.plugins.clipboard.copy(window.clipboardmultiu);
                    console.log(window.clipboardmultiu);
                } else {
                    uploadf(Intent.clipItems[i].uri, true, false, true);
                    console.log(i);
                    console.log(window.clipboardmultiu);
                }
			}
        	} else {
        		uploadf(Intent.clipItems[0].uri, true, false, false);
        	}
        }
    });
};

function takepicupload() {
  var options = {
    quality: localStorage.getItem("quality"),
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    allowEdit: JSON.parse(localStorage.getItem("allowedit")),
    encodingType: Camera.EncodingType.JPEG, // add to settings when?
    saveToPhotoAlbum: true, // add to settings when?
    correctOrientation: true
  };
  navigator.camera.getPicture(function cameraSuccess(data) {
    uploadf(data, false, true, false);
  }, function cameraError(error) {
    console.error(error);
  }, options);
};

if (!navigator.onLine) { // now this, is not broken.
	document.getElementsByClassName("info")[0].style.backgroundColor = "hsla(0, 100%, 50%, 0.2)";
    document.getElementsByClassName("info")[0].textContent = STRINGS[lang].OFFLINE;
};

window.addEventListener("offline", function(event){ // this seems to be broken, at least on my phone...
    document.getElementsByClassName("info")[0].style.backgroundColor = "hsla(0, 100%, 50%, 0.2)";
    document.getElementsByClassName("info")[0].innerHTML = STRINGS[lang].OFFLINE;
});

window.addEventListener("online", function(event){ // also seems broken
    document.getElementsByClassName("info")[0].style.backgroundColor = "hsla(0, 0%, 100%, 0.2)";
    document.getElementsByClassName("info")[0].innerHTML = STRINGS[lang].ONLINE;
});

function renderHistory() {
    if (document.getElementById("table").rows.length > 0) {
        document.getElementById("table").innerHTML = "";
    }
    var uhistory = JSON.parse(localStorage.getItem("history"));
    var imgs = ["png", "jpg", "jpeg", "gif", "webp", "svg"];
    for (var i = 0; i < uhistory.length; i++) {
        if (imgs.includes(uhistory[i].url.split('.').pop())) {
            document.getElementById("table").insertAdjacentHTML("afterbegin", "<tr> <td><div class=imageblock><a href=" + uhistory[i].url + "><img class=thumb src=" + uhistory[i].url + "><div class=type>Picture </a><img class=link src=link.png></div><div class=timestamp datetime=" + uhistory[i].time + "></div></div></td></tr>");
        } else {
            document.getElementById("table").insertAdjacentHTML("afterbegin", "<tr> <td><div class=imageblock><a href=" + uhistory[i].url + "><img class=thumb src=file.png><div class=type>File (." + uhistory[i].url.split('.').pop() + ")</a> <img class=link src=link.png></div><div class=timestamp datetime=" + uhistory[i].time + "></div></div></td></tr>");
        }
    }
    timeago().render(document.querySelectorAll('.timestamp'));
};

renderHistory();

function uploadf(URI, isIntent, isCamera, isMultiUpload) {
    cordova.plugins.firebase.analytics.logEvent("upload", {intent: isIntent, camera: isCamera, multiupload: isMultiUpload});
    window.FilePath.resolveNativePath(URI, function(result) {
        window.resolveLocalFileSystemURL(result, function(rURI) {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = rURI.name;
            options.mimeType = rURI.type;
            var params = {};
            params.key = localStorage.getItem("api_key");
            options.params = params;
            options.chunkedMode = true;
            ft = new FileTransfer();
            document.getElementById("onlu").style.visibility = 'visible';
            ft.upload(URI, "https://lithi.io/api/v2/upload", function(result) {
                if (JSON.parse(result.response).url) {
                    document.getElementById("message").setAttribute("href", JSON.parse(result.response).url);
                    document.getElementById("message").innerHTML = JSON.parse(result.response).url;
                    document.getElementById("onlu").style.visibility = 'hidden';
                    document.getElementById("progb").value = "0";
                    if (isMultiUpload) {
                    	window.clipboardmultiu += (window.clipboardmultiu.length == 0 ? "" : "\n") + JSON.parse(result.response).url; // if the string is empty, dont add newline, if it isn't, do add a newline! EZ.
                        cordova.plugins.clipboard.copy(window.clipboardmultiu);
                        // maybe I could add an optional 'Share' screen once a upload is completed?
                    } else {
                    	cordova.plugins.clipboard.copy(JSON.parse(result.response).url);
                    }
                    var obj = JSON.parse(localStorage.getItem("history"));
                    obj.push({
                        url: JSON.parse(result.response).url,
                        time: new Date()
                    });
                    jsonStr = JSON.stringify(obj);
                    localStorage.setItem("history", jsonStr);
                    renderHistory();
                } else {
                    document.getElementById("message").removeAttribute("href");
                    document.getElementById("message").innerHTML = JSON.parse(result.response).error;
                    document.getElementById("onlu").style.visibility = 'hidden';
                    document.getElementById("progb").value = "0";
                }
            }, function(error) {
                document.getElementById("onlu").style.visibility = 'hidden';
                document.getElementById("progb").value = "0";
                console.log(JSON.stringify(error));
            }, options);
            ft.onprogress = function(progressEvent) {
                if (progressEvent.lengthComputable) {
                    document.getElementById("progb").value = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                }
            };
        })
    })
}

function cancelUp() {
    ft.abort();
    cordova.plugins.firebase.analytics.logEvent("cancel");
};

function openUp() {
    fileChooser.open(function(uri) {
        uploadf(uri, false, false, false);
    });
}

function logout() {
    if (confirm(STRINGS[lang].CONFIRM_LOGOUT)) {
        localStorage.removeItem("apikey");
        localStorage.removeItem("history");
        window.location.replace("setup.html");
    }
}
