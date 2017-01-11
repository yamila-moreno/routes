$(document).ready(function() {

    // choose map providers between: https://leaflet-extras.github.io/leaflet-providers/preview/
    var outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			         '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			         'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.outdoors'
    });

    map = L.map('map', {
        center: [40.428132, -3.686999],
        zoom: 3,
        layers: [outdoors]
    });

    var hash = new L.Hash(map);

    for (i = 0; i < routes.length; i++) {
        var gpx = new L.GPX(routes[i].gpx, {
            async: false,
            marker_options: {
                startIconUrl: null,
                endIconUrl: null,
                shadowUrl: null
            },
            polyline_options: {
                color: 'red'
            }
        });
        var name = gpx.get_name();
        var distance = (gpx.get_distance() / 1000).toFixed(2);
        var content = "<strong>" + name + "</strong> (" + distance + " km)";
        if (routes[i].hasOwnProperty('link')){
            content = content + "<br/><a href='" + routes[i].link + "' target='new'>Ver historia</a>";
        }
        gpx.bindPopup(content).addTo(map);
    }

});
