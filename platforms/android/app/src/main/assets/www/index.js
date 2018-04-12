document.addEventListener('deviceready', onDeviceReady, false);
var isIntent = false;

function onDeviceReady() {
    if (!localStorage.getItem("apikey")) {
        window.location.href = "setup.html";
    };
    if (!localStorage.getItem("history")) {
    	localStorage.setItem("history", '[]')
    };
    if (localStorage.getItem("pendingupload")) {
    	window.isIntent = true;
    	uploadf(localStorage.getItem("pendingupload"));
    }
    var ft;
    window.isIntent = false;
    window.plugins.intent.setNewIntentHandler(function(Intent) {
        if (Intent.clipItems[0].uri) {
            window.isIntent = true;
            uploadf(Intent.clipItems[0].uri);
            delete Intent;
        }
    });
};


function uploadf(URI) {
    cordova.plugins.firebase.analytics.logEvent("upload", {intent: window.isIntent});
    window.FilePath.resolveNativePath(URI, function(result) {
        window.resolveLocalFileSystemURL(result, function(rURI) {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = rURI.name;
            options.mimeType = rURI.type;
            var params = {};
            params.key = localStorage.getItem("apikey");
            options.params = params;
            options.chunkedMode = true;
            ft = new FileTransfer();
            document.getElementById("onlu").style.visibility = 'visible';
            ft.upload(URI, "https://upload.lithi.io/v1.php", function(result) {
                if (JSON.parse(result.response).url) {
                    document.getElementById("message").setAttribute("href", JSON.parse(result.response).url);
                    document.getElementById("message").innerHTML = JSON.parse(result.response).url;
                    document.getElementById("onlu").style.visibility = 'hidden';
                    document.getElementById("progb").value = "0";
                    cordova.plugins.clipboard.copy(JSON.parse(result.response).url);
                    window.isIntent = false;
                    var obj = JSON.parse(localStorage.getItem("history"));
					obj.push({url: JSON.parse(result.response).url, time: new Date()});
					jsonStr = JSON.stringify(obj);
					localStorage.setItem("history", jsonStr);
					localStorage.removeItem("pendingupload");
                } else {
                    document.getElementById("message").removeAttribute("href");
                    document.getElementById("message").innerHTML = JSON.parse(result.response).error;
                    document.getElementById("onlu").style.visibility = 'hidden';
                    document.getElementById("progb").value = "0";
                    window.isIntent = false;
                    localStorage.removeItem("pendingupload");
                }
            }, function(error) {
                document.getElementById("onlu").style.visibility = 'hidden';
                document.getElementById("progb").value = "0";
                console.log(JSON.stringify(error));
                window.isIntent = false;
                localStorage.removeItem("pendingupload");
            }, options);
            ft.onprogress = function(progressEvent) {
                if (progressEvent.lengthComputable) {
                    var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                    document.getElementById("progb").value = perc;
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
        uploadf(uri);
    });
}

function logout() {
    localStorage.removeItem("apikey");
    localStorage.removeItem("history");
    window.location.href = "setup.html";
}