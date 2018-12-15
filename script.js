window.onload = function () {
    //var sock = new WebSocket("wss:/" + "/" + pakopac.me + ":8443/video");
    var sock = new WebSocket("ws://" + window.location.host + ":1234/video");
    var video = document.querySelector('#video');
    console.log(sock);
    sock.onopen = function () {
        data = {};
        sock.send(JSON.stringify(data));
        video.addEventListener("playing", function () {
            data = {
                "video": video.currentTime,
                "play": true
            };
            sock.send(JSON.stringify(data))
        });
        video.addEventListener("pause", function () {
            data = {
                "video": video.currentTime,
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
        if (video.currentTime !== json.video) {

            console.log(json.video);
            console.log(video.currentTime);

            video.currentTime = json.video;
        }
        if (json.play === false) {
            if(video.play) {
                video.pause()
            }
        }
        if (json.play === true) {
            if(video.pause){
                video.play()
            }
        }

    };
    document.querySelector('form').onsubmit = function () {
        return false
    };
};