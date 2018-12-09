window.onload = function () {
    var sock = new WebSocket("ws://localhost:1234/video");
    var video = document.querySelector('video');
    var data = {};
    console.log(sock);

    sock.onopen = function() {
        data = {
            "video": video.currentTime,
        };
        sock.send(JSON.stringify(data))
            video.addEventListener("playing",function (){
                console.log(video.currentTime);
                data = {
                    "video": video.currentTime,
                    "play" : true
                };
                sock.send(JSON.stringify(data))
            });
            video.addEventListener("pause", function () {
                console.log('pause');
                data = {
                    "video": video.currentTime,
                    "play" : false
                };
                sock.send(JSON.stringify(data))
            });
            window.addEventListener("beforeunload", function (event) {
                data = {
                    "video" : video.currentTime
                }
            });
            };


    sock.onmessage = function (e) {

        var json = JSON.parse(e.data);

            if (video.currentTime !== json.video) {

                console.log(json.video);
                console.log(video.currentTime);

                video.currentTime = json.video;
            }
        if(json.play === false){
            video.pause()
        }
        if(json.play === true){
            video.play()
        }
        if(json.start === true){
            video.play()
        }
    };
        /* if(json.pause === true){
             video.pause()
         }*/

    document.querySelector('form').onsubmit = function () {
        var videoValue = document.querySelector('input').value;
        console.log(videoValue);
        video.setAttribute('src',videoValue);
        return false
    };
};