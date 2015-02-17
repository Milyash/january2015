function initSnippet(token) {
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

            function postData(dataToSend, route) {
                $.post("http://localhost:3000" + route, dataToSend, function (data) {
                    console.log(data);
                });
            }

            function createPostData(video_url, video_name, event_type, time, video_id) {
                var dataToSend = {};
                dataToSend.page_url = $(location).attr('href');
                dataToSend.video_url = video_url;
                dataToSend.video_name = video_name;
                dataToSend.event = event_type;
                dataToSend.time = time;
                dataToSend.video_id = video_id;
                dataToSend.token = token;
                return dataToSend;
            }

            function createPostDataForVideojs(data, event_type, time) {
                return createPostData(getVideoUrl(data.target), getVideoUrl(data.target), event_type, time, data.target.id)
            }

            function getVideoUrl(videoNode) {
                return videoNode.src
                    || $.parseJSON($(videoNode).attr("data-setup")).src
                    || $(videoNode).children("source")[0].src;
            }

            $.getScript('http://a.vimeocdn.com/js/froogaloop2.min.js', function () {
                var iframes = {}
                var current_volume = {};
                var current_time = {};

                $('iframe.video').each(function() {
                    var clone = $($(this)[0].outerHTML).insertAfter($(this))
                    var parser = document.createElement('a')
                    parser.href = clone.attr('src')
                    var id = clone.attr('id') || "video_id_" + Math.random().toString(36).substring(7);
                    clone.attr('id', id)
                    if(parser.search.indexOf('player_id=') === -1)
                        parser.search += "&player_id=" + id
                    if(parser.search.indexOf('api=1') === -1)
                        parser.search += "&api=1"
                    clone.attr('src', parser.href)
                    $(this).remove()
                })
                $('iframe.video').load(function () {
                    iframes[this.id] = this
                    current_volume[this.id]=0
                    current_time[this.id]=0
                    var player = $f(this);
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
                                var dataToSend = createPostData($(location).attr('href'), $(iframes[id]).attr('src'), $(iframes[id]).attr('alt'), "volumechange", current_time[id], id, token);
                                dataToSend.from_volume = current_volume[id];
                                dataToSend.to_volume = new_volume;
                                postData(dataToSend, urlBase + "/api/volumechange");
                                current_volume[id] = new_volume;
                            }
                            current_time[id] = data.seconds;
                        });
                    }

                    function onPlay(id) {
                        console.log("!");
                        var dataToSend = createPostData($(iframes[id]).attr('src'), $(iframes[id]).attr('alt'), "play", current_time[id], id);
                        postData(dataToSend, "/api/play");
                    };
                    function onPause(id) {
                        var dataToSend = createPostData($(iframes[id]).attr('src'), $(iframes[id]).attr('alt'), "pause", current_time[id], id);
                        postData(dataToSend, "/api/pause");
                    };
                    function onSeek(data, id) {
                        var dataToSend = createPostData($(iframes[id]).attr('src'), $(iframes[id]).attr('alt'), "seek", current_time[id], id);
                        dataToSend.time_to = data.seconds;
                        postData(dataToSend, "/api/seek");
                    };
                });
            });

            var EVENT_NONE = 0;
            var EVENT_SEEKING = 1;
            var SEEKING = "seeking";
            var PLAY = "play";
            var PAUSE = "pause";
            var VOLUMECHANGE = "volumechange";
            var MUTED = "muted";

            $("video").each(function () {
                var video = this;
                videojs(video).ready(function () {

                    var current_time = 0;
                    var new_time = 0;
                    var last_event = EVENT_NONE;
                    var myPlayer = this;
                    var volume = myPlayer.volume().toFixed(2);

                    myPlayer
                        .on(SEEKING, function (data) {
                            new_time = myPlayer.currentTime().toFixed(2);
                            var dataToSend = createPostDataForVideojs(data, SEEKING, current_time);
                            dataToSend.time_to = myPlayer.currentTime().toFixed(2);

                            postData(dataToSend, "/api/seek");

                            current_time = new_time;
                            last_event = EVENT_SEEKING;
                        })
                        .on(PLAY, function (data) {
                            console.log(current_time)
                            if (last_event == EVENT_SEEKING) {
                                last_event = EVENT_NONE;
                            }
                            else {
                                var dataToSend = createPostDataForVideojs(data, PLAY, current_time)
                                postData(dataToSend, "/api/play");
                            }
                        })
                        .on(PAUSE, function (data) {
                            console.log(current_time)
                            var playerTime = myPlayer.currentTime().toFixed(2);
                            if(Math.abs(playerTime - current_time) < 1){
                                var dataToSend = createPostDataForVideojs(data, PAUSE, myPlayer.currentTime().toFixed(2))
                                postData(dataToSend, "/api/pause")
                            }
                        })
                        .on(VOLUMECHANGE, function (data) {
                            var dataToSend
                            if (myPlayer.muted()) {
                                dataToSend = createPostDataForVideojs(data, MUTED, myPlayer.currentTime().toFixed(2));
                                dataToSend.from_volume = volume;
                                dataToSend.to_volume = 0
                                volume = 0;
                            } else {
                                dataToSend = createPostDataForVideojs(data, VOLUMECHANGE, myPlayer.currentTime().toFixed(2));
                                dataToSend.from_volume = volume;
                                dataToSend.to_volume = myPlayer.volume().toFixed(2);
                                volume = myPlayer.volume().toFixed(2);
                            }
                            postData(dataToSend, "/api/volumechange");
                        })
                        .on("timeupdate", function (data) {
                            if (Math.abs(myPlayer.currentTime().toFixed(2)-current_time)<1) {
                                current_time = myPlayer.currentTime().toFixed(2);
                            }
                        })
                });
            })
        });
    }
}
