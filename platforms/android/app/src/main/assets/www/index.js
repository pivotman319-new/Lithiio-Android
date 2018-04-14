document.addEventListener('deviceready', onDeviceReady, false);
var isIntent = false;

function onDeviceReady() {
    if (!localStorage.getItem("apikey")) {
        window.location.replace("setup.html");
    };
    if (!localStorage.getItem("history")) {
        localStorage.setItem("history", '[]')
    };
    var ft;
    window.isIntent = false;
    window.plugins.intent.setNewIntentHandler(function(Intent) {
        if (Intent.clipItems[0].uri) {
            window.isIntent = true;
            uploadf(Intent.clipItems[0].uri);
        }
    });
};

function renderHistory() {
    if (document.getElementById("table").rows.length > 0) {
        document.getElementById("table").innerHTML = "";
    }
    var uhistory = JSON.parse(localStorage.getItem("history"));
    var imgs = ["png", "jpg", "jpeg", "gif"];
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
                    window.isIntent = false;
                }
            }, function(error) {
                document.getElementById("onlu").style.visibility = 'hidden';
                document.getElementById("progb").value = "0";
                console.log(JSON.stringify(error));
                window.isIntent = false;
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
    if (confirm("Are you SURE you want to logout? This will clear your upload history!")) {
        localStorage.removeItem("apikey");
        localStorage.removeItem("history");
        window.location.replace("setup.html");
    }
}