google.load('visualization', '1', {packages: ['corechart']});


//initializing variables
{
    var volumeStatisticsData = [];
    var playStatisticsData = [];
    var pauseStatisticsData = [];
    var seekStatisticsData = [];
    var volumeDataArray = [
        ['ID', 'Time', 'Quantity of Watchers', 'Type', 'Difference']
    ];
    var viewsDataArray = [
        ['Time', 'Views']
    ];
    var viewsDataObject = {};
    var volumeUps = [];
    var volumeDowns = [];
    var vAxisMax = 2;
    var vAxisMin = 2;
    var videoId = 0;
}
//getting data from rest
{
    function getVolumeData(id) {
        $.ajax({
            type: "GET",
            dataType: "JSON",
            async: false,
            url: "/api/video/" + id + "/volumechange/",
            success: function (data) {
                volumeStatisticsData = data;
            },
            error: function (errorData) {
//                alert("Something went wrong while performing the operation " + errorData);
            }
        });
    }

    function getPlayData(id) {
        $.ajax({
            type: "GET",
            dataType: "JSON",
            async: false,
            url: "/api/video/" + id + "/play/",
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
            url: "/api/video/" + id + "/pause/",
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
            url: "/api/video/" + id + "/seek/",
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
    function setTestData() {
        playStatisticsData = [
            {"_id": "54976e2d1b13111c2afa7f45", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 0, "video_id": "player2", "__v": 0},
            {"_id": "54b30f811b13111c2afa8354", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 0, "video_id": "player2", "__v": 0},
            {"_id": "54b30f851b13111c2afa8357", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 0.073, "video_id": "player2", "__v": 0},
            {"_id": "54b30f931b13111c2afa8361", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 16.32, "video_id": "player2", "__v": 0},
            {"_id": "54b30f931b13111c2afa8363", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 16.481, "video_id": "player2", "__v": 0},
            {"_id": "54b30f9b1b13111c2afa8365", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 19.04, "video_id": "player2", "__v": 0},
            {"_id": "54bda25e29510cbc022b4d21", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 0, "video_id": "player2", "__v": 0},
            {"_id": "54bda32d29510cbc022b4d2a", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 0, "video_id": "player2", "__v": 0},
            {"_id": "54c4815629510cbc022b5696", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 0, "video_id": "player2", "__v": 0},
            {"_id": "54c4816029510cbc022b569c", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 8.44, "video_id": "player2", "__v": 0},
            {"_id": "54c4816429510cbc022b569f", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 91.232, "video_id": "player2", "__v": 0},
            {"_id": "54c4816829510cbc022b56a1", "_type": "Play", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 92.8, "video_id": "player2", "__v": 0}
        ];
        pauseStatisticsData = [
            {"_id": "54976e351b13111c2afa7f4b", "_type": "Pause", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 7.12, "video_id": "player2", "__v": 0},
            {"_id": "54b30f851b13111c2afa8356", "_type": "Pause", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 0.073, "video_id": "player2", "__v": 0},
            {"_id": "54b30f931b13111c2afa8360", "_type": "Pause", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 16.083, "video_id": "player2", "__v": 0},
            {"_id": "54b30f931b13111c2afa8362", "_type": "Pause", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 16.32, "video_id": "player2", "__v": 0},
            {"_id": "54b30f961b13111c2afa8364", "_type": "Pause", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 18.84, "video_id": "player2", "__v": 0},
            {"_id": "54bda32a29510cbc022b4d28", "_type": "Pause", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 203.84, "video_id": "player2", "__v": 0},
            {"_id": "54bda33829510cbc022b4d2e", "_type": "Pause", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 10.6, "video_id": "player2", "__v": 0},
            {"_id": "54c4816029510cbc022b569b", "_type": "Pause", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 8.44, "video_id": "player2", "__v": 0},
            {"_id": "54c4816129510cbc022b569d", "_type": "Pause", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 47.88, "video_id": "player2", "__v": 0},
            {"_id": "54c4816529510cbc022b56a0", "_type": "Pause", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 92.64, "video_id": "player2", "__v": 0},
            {"_id": "54c4816929510cbc022b56a3", "_type": "Pause", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time": 93.8, "video_id": "player2", "__v": 0}
        ];
        seekStatisticsData = [
            {"_id": "54bda32c29510cbc022b4d29", "_type": "Seek", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time_from": 0, "time_to": 3.44, "video_id": "player2", "__v": 0},
            {"_id": "54c4816029510cbc022b569a", "_type": "Seek", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time_from": 4.55, "time_to": 46.66, "video_id": "player2", "__v": 0},
            {"_id": "54c4816229510cbc022b569e", "_type": "Seek", "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html", "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B", "time_from": 55.04, "time_to": 48.55, "video_id": "player2", "__v": 0}
        ];
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
                "_id": "54976e341b13111c2afa7f49",
                "_type": "VolumeChange",
                "page_url": "http://localhost:63342/VideoStatisticsApp/src/DummyPages/vimeo/vimeo-ex.html",
                "video_url": "http://player.vimeo.com/video/88635031?api=1&player_id=player2&byline=0&portrait=0&color=73848B",
                "from_volume": 0.458,
                "to_volume": 0.583,
                "time": 5.32,
                "video_id": "player2",
                "__v": 0
            }
        ];
    }

}
//views diagram
{
    function formViewsDataForDiagram() {
        viewsDataArray = [
            ['Time', 'Views']
        ];
        viewsDataObject = {};
        for (var i = 0; i < playStatisticsData.length; i++) {
            var data = playStatisticsData[i];
            if (data.time != undefined) {
                data.time = data.time.toFixed(0);
                if (viewsDataObject.hasOwnProperty(data.time)) {
                    viewsDataObject[data.time]++;
                } else {
                    viewsDataObject[data.time] = 1;
                }
            }
        }
        for (var i = 0; i < pauseStatisticsData.length; i++) {
            var data = pauseStatisticsData[i];
            if (data.time != undefined) {
                data.time = data.time.toFixed(0);
                if (viewsDataObject.hasOwnProperty(data.time)) {
                    viewsDataObject[data.time]--;
                } else {
                    viewsDataObject[data.time] = -1;
                }
            }
        }
        ;
        for (var i = 0; i < seekStatisticsData.length; i++) {
            var data = seekStatisticsData[i];

            if ((data.time_to != undefined) && (data.time_from)) {
                data.time_to = data.time_to.toFixed(0);
                data.time_from = data.time_from.toFixed(0);
                if (data.time_to > data.time_from) {
                    if (viewsDataObject.hasOwnProperty(data.time_to)) {
                        viewsDataObject[data.time_to]++;
                    } else {
                        viewsDataObject[data.time_to] = 1;
                    }
                    if (viewsDataObject.hasOwnProperty(data.time_from)) {
                        viewsDataObject[data.time_from]--;
                    } else {
                        viewsDataObject[data.time_from] = -1;
                    }
                } else {
//                    if (viewsDataObject.hasOwnProperty(data.time_to)) {
//                        viewsDataObject[data.time_to]--;
//                    } else {
//                        viewsDataObject[data.time_to] = -1;
//                    }
                    if (viewsDataObject.hasOwnProperty(data.time_to)) {
                        viewsDataObject[data.time_to]++;
                    } else {
                        viewsDataObject[data.time_to] = 1;
                    }
                }
            }
        }
        var quantity = 0;
        for (var time in viewsDataObject) {
            var data = viewsDataObject[time];
            quantity = quantity + data;
            if (quantity < 0) {
                quantity = 0;
            }
            ;
            viewsDataArray.push([parseInt(time), quantity]);
        }
    };
    var viewsOptions = {
        animation: {
            duration: 700
        },
        title: 'Views',
        backgroundColor: "transparent",
        width: 900,
        height: 400,
        hAxis: {title: 'Time'},
        vAxis: {title: 'Views', minValue: 0}
    };
//    formViewsDataForDiagram();
    var chart2 = new google.visualization.AreaChart(document.getElementById('viewsDiagram'));
//    var viewsData = google.visualization.arrayToDataTable(viewsDataArray);
//    chart2.draw(viewsData, viewsOptions);

    function refreshViewsDiagram(id) {
        getPlayData(id);
        getPauseData(id);
        getSeekData(id);
        formViewsDataForDiagram();
        viewsData = google.visualization.arrayToDataTable(viewsDataArray);
        chart2.draw(viewsData, viewsOptions);
    }

}
//volume diagram
{
    var getMaximumVolumeChangers = function (volumeDataArray) {
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
        volumeDataArray = [
            ['ID', 'Time', 'Quantity of Watchers', 'Type', 'Difference']
        ];
        if (volumeStatisticsData.length > 0) {
            document.getElementById("volumeDiagram").style.display = "inline-block";
        } else {
            document.getElementById("volumeDiagram").style.display = "none";
        }
        for (var i = 0; i < volumeStatisticsData.length; i++) {
            var data = volumeStatisticsData[i];
            if (data.time != undefined) {
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

        vAxisMax = getMaximumVolumeChangers(volumeUps) + 1;
        vAxisMin = getMaximumVolumeChangers(volumeDowns) + 1;

//        volumeDataArray = volumeDataArrays[$scope.currentVideo];

    }


    var volumeDiagramOptions = {
        width: 900,
        height: 400,
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

    function refreshVolumeDiagram(id) {
//get data from api
        volumeUps = [];
        volumeDowns = [];
        getVolumeData(id);
        formVolumeDataForDiagram();
        var volumeData = google.visualization.arrayToDataTable(volumeDataArray);
        volumeDiagramOptions.vAxis.viewWindow = {max: vAxisMax, min: -vAxisMin};
        chart.draw(volumeData, volumeDiagramOptions);
    }


    function refreshDiagrams(id) {
        setTestData();
//        var path = window.location.pathname;
//        var splittedPath = path.split("/");
//        var videoId = splittedPath[splittedPath.length - 1];
        refreshVolumeDiagram(id);
        refreshViewsDiagram(id);
    }

//
//    refreshDiagrams();
}
function setVideoId(id) {
//    alert(id);
    videoId = id;
    refreshDiagrams(id);
}