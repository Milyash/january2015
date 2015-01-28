var token = '||';
$('iframe.video').load(function () {
    var iframe = this
    var player = $f(iframe);
    var urlBase = "http://85.143.216.173";
    player.addEvent('ready', function () {
        var current_volume;
        var current_time = 0;
        player.api("getVolume", function (volume) {
            current_volume = volume;
        });
        player.addEvent('play', onPlay);
        player.addEvent('pause', onPause);
        player.addEvent('seek', onSeek);
        player.addEvent('playProgress', onPlayProgress);
        function onPlayProgress(data, id) {
            var new_volume;
            player.api("getVolume", function (volume) {
                new_volume = volume;
                if (current_volume != new_volume) {
                    data = {};
                    data.page_url = $(location).attr('href');
                    data.video_url = $(iframe).attr('src');
                    data.video_name = $(iframe).attr('alt');
                    data.event = "volumechange";
                    data.from_volume = current_volume;
                    data.to_volume = new_volume;
                    data.time = current_time;
                    data.video_id = id;
                    data.token = token;
                    postData(data, urlBase + "/api/volumechange");
                    current_volume = new_volume;
                }
                current_time = data.seconds;
            });
        }

        function onPlay(id) {
            var dataToSend = {};
            dataToSend.page_url = $(location).attr('href');
            dataToSend.video_url = $(iframe).attr('src');
            dataToSend.video_name = $(iframe).attr('alt');
            console.log($(location).attr('href'));
            console.log($(iframe).attr('src'));
            dataToSend.event = "play";
            dataToSend.time = current_time;
            dataToSend.video_id = id;
            dataToSend.token = token;
            postData(dataToSend, urlBase + "/api/play");
        };
        function onPause(id) {
            var dataToSend = {};
            dataToSend.page_url = $(location).attr('href');
            dataToSend.video_url = $(iframe).attr('src');
            dataToSend.video_name = $(iframe).attr('alt');
            dataToSend.event = "pause";
            dataToSend.time = current_time;
            dataToSend.video_id = id;
            dataToSend.token = token;
            postData(dataToSend, urlBase + "/api/pause");
        };
        function onSeek(data, id) {
            var dataToSend = {};
            dataToSend.page_url = $(location).attr('href');
            dataToSend.video_url = $(iframe).attr('src');
            dataToSend.video_name = $(iframe).attr('alt');
            dataToSend.event = "seek";
            dataToSend.time_from = current_time;
            dataToSend.time_to = data.seconds;
            dataToSend.video_id = id;
            dataToSend.token = token;
            postData(dataToSend, urlBase + "/api/seek");
        };
    });
});
function postData(dataToSend, route) {
    $.post(route, dataToSend, function (data) {
        console.log(data);
    });
}