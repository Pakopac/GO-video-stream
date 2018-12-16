window.onload = function () {
    //var sock = new WebSocket("wss:/" + "/" + pakopac.me + ":8443/video");
    var sock = new WebSocket("ws://" + window.location.host + ":1234/video");
    var video = document.querySelector('#video');
    sock.onopen = function () {
        if(video.currentTime !== 0) {
            data = {"time": video.currentTime};
        }
        else{
            data = {}
        }
        sock.send(JSON.stringify(data));
        video.addEventListener("playing", function () {
            data = {
                "time": video.currentTime,
                "play": true
            };
            sock.send(JSON.stringify(data))
        });
        video.addEventListener("pause", function () {
            data = {
                "time": video.currentTime,
                "play": false
            };
            sock.send(JSON.stringify(data))
        });
        document.querySelector('form').addEventListener('submit',function () {
            video.currentTime = 0;
            data = {
                "link" : document.querySelector('input').value
            };
            sock.send(JSON.stringify(data));
        });
    };

    sock.onmessage = function (e) {

        var json = JSON.parse(e.data);

        console.log(json);
        if (json.link && video.src !== json.link) {
            console.log(video);
            console.log(json.link);
            video.currentTime = 0;
            video.setAttribute('src', json.link);
            //sock = new WebSocket("ws://" + window.location.host + ":1234/video");
            //var sock = new WebSocket("wss:/" + "/" + pakopac.me + ":8443/video");
        }
        if (video.currentTime !== json.time) {
            video.currentTime = json.time;
        }
        if (json.play === false) {
            video.pause()
        }
        if (json.play === true) {
            video.play()
        }
        if(json.newConnection === true && video.currentTime !== 0){
            sock.onopen = function () {
                data = {
                    "time": video.currentTime
                };
                sock.send(JSON.stringify(data));
            }
        }

    };
    document.querySelector('form').onsubmit = function () {
        return false
    };
};