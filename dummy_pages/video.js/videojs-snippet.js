var EVENT_NONE = 0;
var EVENT_SEEKING = 1;
var EVENT_SEEKING_PAUSE = 2;
var SERVER_URL = "http://localhost:3000/api/plays";
var SEEKING = "seeking";
var PLAY = "play";
var PAUSE = "pause";
var VOLUMECHANGE = "volumechange";
var MUTED = "muted";
var FULLSCREENCHANGE = "fullscreenchange";

$("#clear").click(function () {
    $("#result").empty();
});

$(document).ready(function () {

    var videos = $("video");
    $.each(videos, function (i, video) {
        videojs(video).ready(function () {

            var current_time = 0;
            var new_time = 0;
            var last_event = EVENT_NONE;
            var myPlayer = this;
            var result = $("#result");
            var volume = myPlayer.volume().toFixed(2);
            var video_id = video.id;
            var page = window.location.pathname;
            var video_url = video.src
                || jQuery.parseJSON($(video).attr("data-setup")).src
                || $(video).children("source")[0].src;


            var request_params = {
                page: page,
                video_id: video_id,
                video_url: video_url
            };

            //console.log(video_url);
            console.log(video_id + " " + page + " " + video_url);
            function set_basic_request_params(){
                request_params = {
                    page: page,
                    video_id: video_id,
                    video_url: video_url
                };
            }
            function add_to_results(new_line) {
                result.append("<li>"
                    + new_line +
                    "</li>");
            }

            function send_event() {
                $.post(SERVER_URL,
                    request_params);
                console.log(request_params);
                add_to_results(JSON.stringify(request_params));
            }
            myPlayer
                //SEEKING
                .on(SEEKING, function () {
                    new_time = myPlayer.currentTime().toFixed(2);
                    set_basic_request_params();
                    request_params.event = SEEKING;
                    request_params.time_from = current_time;
                    request_params.time_to = myPlayer.currentTime().toFixed(2);


                    send_event();

                    current_time = new_time;
                    last_event = EVENT_SEEKING;
                })

                //PLAY
                .on(PLAY, function () {
                    if (last_event == EVENT_SEEKING) last_event = EVENT_NONE;
                    else {
                        set_basic_request_params();
                        request_params.event = PLAY;
                        request_params.time = myPlayer.currentTime().toFixed(2);

                        send_event();
                    }
                })
                //PAUSE
                .on(PAUSE, function () {
                    // if (last_event == EVENT_SEEKING) last_event = EVENT_SEEKING_PAUSE;
                    // else {
                    var playerTime = myPlayer.currentTime().toFixed(2);
                    if(Math.abs(playerTime - current_time) < 1){
                        set_basic_request_params();
                        request_params.event = PAUSE;
                        request_params.time = myPlayer.currentTime().toFixed(2);

                        send_event();
                    }

                    // }
                })
                //VOLUME CHANGE
                .on(VOLUMECHANGE, function () {
                    if (myPlayer.muted()) {
                        set_basic_request_params();
                        request_params.event = MUTED;
                        request_params.from_volume = volume;
                        request_params.time = myPlayer.currentTime().toFixed(2);

                        volume = 0;
                    } else {
                        set_basic_request_params();
                        request_params.event = VOLUMECHANGE;
                        request_params.from_volume = volume;
                        request_params.to_volume = myPlayer.volume().toFixed(2);
                        request_params.time = myPlayer.currentTime().toFixed(2);
                        volume = myPlayer.volume().toFixed(2);
                    }
                    send_event();
                })
                //FULL SCREEN CHANGE
                .on(FULLSCREENCHANGE, function () {
                    set_basic_request_params();
                    request_params.event = FULLSCREENCHANGE;
                    request_params.is_fillscreen = myPlayer.isfullScreen();
                    send_event();
                })
                //progress update

                .on("timeupdate", function () {
                    if (Math.abs(myPlayer.currentTime().toFixed(2)-current_time)<1){
                        current_time = myPlayer.currentTime().toFixed(2);
                    }
//                    $("#variable").text(current_time);


                })
        });
    })

})