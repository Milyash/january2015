var token = '||';
// add video alt

var iframe = $('.video');
$.each(iframe, function (i, video) {
    var player = $f(video);
    var urlBase = "http://localhost:3000";
    player.addEvent('ready', function () {
        var result = $("#result");
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
                    data.video_url = $(iframe[i]).attr('src');
                    data.video_name = $(iframe[i]).attr('alt');
                    data.event = "volumechange";
                    data.from_volume = current_volume;
                    data.to_volume = new_volume;
                    data.time = current_time;
                    data.video_id = id;
                    data.token = token;
                    postData(data, urlBase + "/api/volumechange");
                    result.append("<li>" + id + " muted! from " + current_volume + "to " + new_volume + "</li>");
                    current_volume = new_volume;
                }

                current_time = data.seconds;
            });
        }
        function onPlay(id) {

            var dataToSend = {};
            dataToSend.page_url = $(location).attr('href');
            dataToSend.video_url = $(iframe[i]).attr('src');
            dataToSend.video_name = $(iframe[i]).attr('alt');
            console.log($(location).attr('href'));
            console.log($(iframe[i]).attr('src'));
            dataToSend.event = "play";
            dataToSend.time = current_time;
            dataToSend.video_id = id;
            dataToSend.token = token;
            postData(dataToSend, urlBase + "/api/play");
            result.append("<li>" + id + " -> play!, time = " + current_time + "sec </li>");
        };
        function onPause(id) {

            var dataToSend = {};
            dataToSend.page_url = $(location).attr('href');
            dataToSend.video_url = $(iframe[i]).attr('src');
            dataToSend.video_name = $(iframe[i]).attr('alt');
            dataToSend.event = "pause";
            dataToSend.time = current_time;
            dataToSend.video_id = id;
            dataToSend.token = token;
            postData(dataToSend, urlBase + "/api/pause");
            result.append("<li>" + id + " -> pause!, time = " + current_time + "sec </li>");
        };
        function onSeek(data, id) {

            var dataToSend = {};
            dataToSend.page_url = $(location).attr('href');
            dataToSend.video_url = $(iframe[i]).attr('src');
            dataToSend.video_name = $(iframe[i]).attr('alt');
            dataToSend.event = "seek";
            dataToSend.time_from = current_time;
            dataToSend.time_to = data.seconds;
            dataToSend.video_id = id;
            dataToSend.token = token;
            postData(dataToSend, urlBase + "/api/seek");
            result.append("<li>" + id + " -> seeking! from " + current_time + " to " + data.seconds.toFixed(2) + "sec </li>");
        };
    });
});
function postData(dataToSend, route) {

    $.post(route, dataToSend, function (data) {

        console.log(data);
    });
}