window.onload = function () {
    var sock = new WebSocket("ws://" + window.location.host + ":1234/video");
    var video = document.querySelector('#video');
    var data = {};
    console.log(sock);

    console.log(document.querySelector('#nul'));
    document.querySelector('#nul').onclick = function (ev) {
        console.log(video);
    };

    sock.onopen = function() {
        data = {
            "video": video.currentTime
        };
        sock.send(JSON.stringify(data));
            video.addEventListener("playing",function (){
                data = {
                    "video": video.currentTime,
                    "play" : true
                };
                sock.send(JSON.stringify(data))
            });
            video.addEventListener("pause", function () {
                data = {
                    "video": video.currentTime,
                    "play" : false
                };
                sock.send(JSON.stringify(data))
            });
            };


    sock.onmessage = function (e) {

        var json = JSON.parse(e.data);
        if(json.link){
            console.log(video.currentTime);
            video.setAttribute('src',json.link);
        }
        if (video.currentTime !== json.video) {

            console.log(json.video);
            console.log(video.currentTime);

            video.currentTime = json.video;
        }
        if (json.play === false) {
            video.pause()
        }
        if (json.play === true) {
            video.play()
        }
        if (json.start === true) {
            video.play()
        }
    };
        /* if(json.pause === true){
             video.pause()
         }*/

    document.querySelector('form').onsubmit = function () {
        data = {
            "link" : document.querySelector('input').value,
            "video": video.currentTime
        };
        document.querySelector('body').removeChild(video);
        video = document.createElement('video');
        document.querySelector('body').appendChild(video);
        video.id = 'video';
        video.setAttribute('controls',true);
        console.log(video.currentTime);
        sock.send(JSON.stringify(data));
        return false
    };
};