google.load('visualization', '1', {packages: ['corechart']});
//initializing variables
{
    var volumeStatisticsData = [];
    var playStatisticsData = [];
    var pauseStatisticsData = [];
    var seekStatisticsData = [];
    var volumeDataArray = [
        ['ID', 'Time', 'Quantity of Watchers', 'Type', 'Difference'],
    ];
    var volumeUps = [];
    var volumeDowns = [];
    var vAxisMax = 2;
    var vAxisMin = 2;
}
//getting data from rest
{
    function getVolumeData(id) {
        $.ajax({
            type: "GET",
            dataType: "JSON",
            async: false,
            url: "/api/volumechange/" + id,
            success: function (data) {
                volumeStatisticsData = data;
            },
            error: function (errorData) {
                alert("Something went wrong while performing the operation " + errorData);
            }
        });
    }

    function getPlayData(id) {
        $.ajax({
            type: "GET",
            dataType: "JSON",
            async: false,
            url: "/api/play/" + id,
            success: function (data) {
                playStatisticsData = data;
            },
            error: function (errorData) {
                alert("Something went wrong while performing the operation " + errorData);
            }
        });
    }

    function getPauseData(id) {
        $.ajax({
            type: "GET",
            dataType: "JSON",
            async: false,
            url: "/api/pause/" + id,
            success: function (data) {
                pauseStatisticsData = data;
            },
            error: function (errorData) {
                alert("Something went wrong while performing the operation " + errorData);
            }
        });
    }

    function getSeekData(id) {
        $.ajax({
            type: "GET",
            dataType: "JSON",
            async: false,
            url: "/api/seek/" + id,
            success: function (data) {
                seekStatisticsData = data;
            },
            error: function (errorData) {
                alert("Something went wrong while performing the operation " + errorData);
            }
        });
    }


}
//for test
{
    volumeStatisticsData = [
        {
            "_id": "54976d801b13111c2afa7f34",
            "_type": "VolumeChange",
            "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html",
            "video_url": "http://player.vimeo.com/video/24285155?api=1&player_id=player1&byline=0&portrait=0&color=d4400e",
            "from_volume": 0.042,
            "to_volume": 0.5,
            "time": 5.298,
            "video_id": "player1",
            "__v": 0
        },
        {
            "_id": "54976db01b13111c2afa7f39",
            "_type": "VolumeChange",
            "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html",
            "video_url": "http://player.vimeo.com/video/24285155?api=1&player_id=player1&byline=0&portrait=0&color=d4400e",
            "from_volume": 0.5,
            "to_volume": 0.792,
            "time": 8.968,
            "video_id": "player1",
            "__v": 0
        },
        {
            "_id": "54976db21b13111c2afa7f3a",
            "_type": "VolumeChange",
            "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html",
            "video_url": "http://player.vimeo.com/video/24285155?api=1&player_id=player1&byline=0&portrait=0&color=d4400e",
            "from_volume": 0.792,
            "to_volume": 0.417,
            "time": 11.303,
            "video_id": "player1",
            "__v": 0
        },
        {
            "_id": "54976e2d1b13111c2afa7f46",
            "_type": "VolumeChange",
            "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html",
            "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B",
            "from_volume": 0.042,
            "to_volume": 0.417,
            "time": 0,
            "video_id": "player2",
            "__v": 0
        },
        {
            "_id": "54976e301b13111c2afa7f47",
            "_type": "VolumeChange",
            "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html",
            "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B",
            "from_volume": 0.417,
            "to_volume": 0.75,
            "time": 1.28,
            "video_id": "player2",
            "__v": 0
        },
        {
            "_id": "54976e311b13111c2afa7f48",
            "_type": "VolumeChange",
            "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html",
            "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B",
            "from_volume": 0.75,
            "to_volume": 0.458,
            "time": 2.64,
            "video_id": "player2",
            "__v": 0
        },
        {
            "_id": "54976e341b13111c2afa7f49",
            "_type": "VolumeChange",
            "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html",
            "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B",
            "from_volume": 0.458,
            "to_volume": 0.583,
            "time": 5.32,
            "video_id": "player2",
            "__v": 0
        },
        {
            "_id": "54976e341b13111c2afa7f4a",
            "_type": "VolumeChange",
            "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html",
            "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B",
            "from_volume": 0.583,
            "to_volume": 0.75,
            "video_id": "player2",
            "__v": 0
        }
    ];
}
//volume diagram
{
    var getMaximumWatchersQuantity = function (volumeDataArray) {
        var maxQuantity = 0;
        for (var time in volumeDataArray) {
            var volumeUp = volumeDataArray[time];
            if (volumeUp.quantity_of_watchers > maxQuantity) {
                maxQuantity = volumeUp.quantity_of_watchers;
            }
        }
        return maxQuantity;
    };


    function formVolumeDataForDiagram() {
        for(var i=0; i< volumeStatisticsData.length;i++) {
            var data = volumeStatisticsData[i];
            if (data.time != undefined)  {
                data.time = data.time.toFixed(0);
                if (data.from_volume > data.to_volume) {
                    if (volumeDowns.hasOwnProperty(data.time)) {
                        volumeDowns[data.time].quantity_of_watchers += 1;
                        volumeDowns[data.time].sum_of_differences += Math.abs(data.from_volume - data.to_volume);
                    } else {
                        volumeDowns[data.time] = {quantity_of_watchers: 1, sum_of_differences: Math.abs(data.from_volume - data.to_volume)};
                    }
                } else {
                    if (volumeUps.hasOwnProperty(data.time)) {
                        volumeUps[data.time].quantity_of_watchers += 1;
                        volumeUps[data.time].sum_of_differences += Math.abs(data.from_volume - data.to_volume);
                    } else {
                        volumeUps[data.time] = {quantity_of_watchers: 1, sum_of_differences: Math.abs(data.from_volume - data.to_volume)};
                    }
                }
            }
        }
        for (var time in volumeUps) {
            var volumeUp = volumeUps[time];
            volumeDataArray.push(['', parseInt(time), volumeUp.quantity_of_watchers, 'Volume Up',
                parseInt(100 * (volumeUp.sum_of_differences / volumeUp.quantity_of_watchers).toFixed(2))]);
        }
        for (var time in volumeDowns) {
            var volumeDown = volumeDowns[time];
            volumeDataArray.push(['', parseInt(time), -(volumeDown.quantity_of_watchers), 'Volume Down',
                parseInt(100 * (volumeDown.sum_of_differences / volumeDown.quantity_of_watchers).toFixed(2))]);
        }

        vAxisMax = getMaximumWatchersQuantity(volumeUps) + 1;
        vAxisMin = getMaximumWatchersQuantity(volumeDowns) + 1;

//        volumeDataArray = volumeDataArrays[$scope.currentVideo];

    }


    var volumeDiagramOptions = {
        width: 600,
        height:400,
        animation: {
            duration: 700
        },
        backgroundColor: "transparent",
        title: "Volume change statistics",
        hAxis: {title: 'Time', viewWindowMode: 'pretty'},
        vAxis: {title: 'Quantity of Watchers'},
        bubble: {textStyle: {fontSize: 11}, opacity: 0.4}
    };
    var chart = new google.visualization.BubbleChart(document.getElementById('volumeDiagram'));

    function refreshVolumeDiagram() {
//get data from api
        volumeUps = [];
        volumeDowns = [];
        formVolumeDataForDiagram();
        var volumeData = google.visualization.arrayToDataTable(volumeDataArray);
        volumeDiagramOptions.vAxis.viewWindow = {max: vAxisMax, min: -vAxisMin};
        chart.draw(volumeData, volumeDiagramOptions);
    }

//    refreshVolumeDiagram();
    //it is called for a second time to fire animation
    refreshVolumeDiagram();

}