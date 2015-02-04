if (!window.jQuery) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "//code.jquery.com/jquery-1.11.2.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);

    var loadHandlerAlreadyRun = false;
    script.onload = function () {
        if (!loadHandlerAlreadyRun) {
            loadHandlerAlreadyRun = true;
            snippet();
        }
    };
    script.onreadystatechange = function () {
        if (!loadHandlerAlreadyRun && (this.readyState === "loaded" || this.readyState === "complete")) {
            loadHandlerAlreadyRun = true;
            snippet();
        }
    }
}
else
    snippet();

function snippet() {
    $(document).ready(function () {
        console.log("jquery loaded");
        $.getScript('http://a.vimeocdn.com/js/froogaloop2.min.js', function () {
            var token = '|||';
			var iframes = {}
			var current_volume = {};
			var current_time = {};
            $('iframe.video').each(function () {
                iframes[this.id] = this
				current_volume[this.id]=0
				current_time[this.id]=0
                var player = $f(this);
                var urlBase = "http://localhost:3000";
                console.log(player)
                player.api("getVolume", function (volume, id) {
                    current_volume[id] = volume;
                });
                player.addEvent('play', onPlay);
                player.addEvent('pause', onPause);
                player.addEvent('seek', onSeek);
                player.addEvent('playProgress', onPlayProgress);
                function onPlayProgress(data, id) {
                    var new_volume;
                    $f(iframes[id]).api("getVolume", function (volume) {
                        new_volume = volume;
                        if (current_volume[id] != new_volume) {
                            data = createPostData($(location).attr('href'), $(iframes[id]).attr('src'), $(iframes[id]).attr('alt'), "volumechange", current_time[id], id, token);
                            data.from_volume = current_volume[id];
                            data.to_volume = new_volume;
                            postData(data, urlBase + "/api/volumechange");
                            current_volume[id] = new_volume;
                        }
                        current_time[id] = data.seconds;
                    });
                }

                function onPlay(id) {
                    console.log("!");
                    var dataToSend = data = createPostData($(location).attr('href'), $(iframes[id]).attr('src'), $(iframes[id]).attr('alt'), "play", current_time[id], id, token);
                    postData(dataToSend, urlBase + "/api/play");
                };
                function onPause(id) {
                    var dataToSend = data = createPostData($(location).attr('href'), $(iframes[id]).attr('src'), $(iframes[id]).attr('alt'), "pause", current_time[id], id, token);
                    postData(dataToSend, urlBase + "/api/pause");
                };
                function onSeek(data, id) {
                    var dataToSend = createPostData($(location).attr('href'), $(iframes[id]).attr('src'), $(iframes[id]).attr('alt'), "seel", current_time[id], id, token);
                    dataToSend.time_to = data.seconds;
                    postData(dataToSend, urlBase + "/api/seek");
                };
            });
            function postData(dataToSend, route) {
                console.log("send");
                $.post(route, dataToSend, function (data) {
                    console.log(data);
                });
            }
            function createPostData(page_url, video_url, video_name, event_type, time, video_id, token) {
                var dataToSend = {};
                dataToSend.page_url = page_url;
                dataToSend.video_url = video_url;
                dataToSend.video_name = video_name;
                dataToSend.event = event_type;
                dataToSend.time = time;
                dataToSend.video_id = video_id;
                dataToSend.token = token;
                return dataToSend;
            }
        });
    });
}