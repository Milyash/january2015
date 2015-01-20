$("#clear").click(function () {
    $("#result").empty();
});

var iframe = $('.video');
$.each(iframe, function (i, video) {
    var player = $f(video);
    var urlBase = "http://localhost:8080";
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
                    data.event = "volumechange";
                    data.from_volume = current_volume;
                    data.to_volume = new_volume;
                    data.time = current_time;
                    data.video_id = id;
                    postData(data, urlBase + "/api/volumechanges");
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
            console.log($(location).attr('href'));
            console.log($(iframe[i]).attr('src'));
            dataToSend.event = "play";
            dataToSend.time = current_time;
            dataToSend.video_id = id;
            postData(dataToSend, urlBase + "/api/plays");
            result.append("<li>" + id + " -> play!, time = " + current_time + "sec </li>");
        };
        function onPause(id) {

            var dataToSend = {};
            dataToSend.page_url = $(location).attr('href');
            dataToSend.video_url = $(iframe[i]).attr('src');
            dataToSend.event = "pause";
            dataToSend.time = current_time;
            dataToSend.video_id = id;
            postData(dataToSend, urlBase + "/api/pauses");
            result.append("<li>" + id + " -> pause!, time = " + current_time + "sec </li>");
        };
        function onSeek(data, id) {

            var dataToSend = {};
            dataToSend.page_url = $(location).attr('href');
            dataToSend.video_url = $(iframe[i]).attr('src');
            dataToSend.event = "seek";
            dataToSend.time_from = current_time;
            dataToSend.time_to = data.seconds;
            dataToSend.video_id = id;
            postData(dataToSend, urlBase + "/api/seeks");
            result.append("<li>" + id + " -> seeking! from " + current_time + " to " + data.seconds.toFixed(2) + "sec </li>");
        };
    });
});
function postData(dataToSend, route) {

    $.post(route, dataToSend, function (data) {

        console.log(data);
    });
}