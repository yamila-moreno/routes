$(document).ready(function() {

    // choose map providers between: https://leaflet-extras.github.io/leaflet-providers/preview/
    var outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			         '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			         'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.outdoors'
    });

    var centerMap = [40.428132, -3.686999];

    map = L.map('map', {
        center: centerMap,
        zoom: 3,
        layers: [outdoors]
    });

    var hash = new L.Hash(map);

    //// Creates a red marker with the coffee icon
    //var myIcon = new L.AwesomeMarkers.icon({
    //    icon: 'coffee',
    //    prefix: 'fa',
    //    markerColor: 'blue',
    //    iconColor: 'white'
    //});
    ////L.marker(centerMap, {icon: myIcon}).addTo(map);
    //var gpx = new L.GPX(routes[0].gpx[0].source, {
    //    async: false,
    //    marker_options: {
    //        icon: myIcon,
    //        startIconUrl: null,
    //        endIconUrl: null,
    //        shadowUrl: null
    //    }
    //});
    //gpx.addTo(map);

    for (i = 0; i < routes.length; i++) {
        for (j = 0; j < routes[i].gpx.length; j++){
            // Route gpx
            var gpx = new L.GPX(routes[i].gpx[j].source, {
                async: false,
                marker_options: {
                    startIconUrl: null,
                    endIconUrl: null,
                    shadowUrl: null
                },
                polyline_options: {
                    color: routes[i].color
                }
            });

            // Popup
            var icon = routes[i].icon;
            var name = gpx.get_name();
            var distance = (gpx.get_distance() / 1000).toFixed(2);
            var content = "<i class='" + icon + "'></i> <strong>" + name + "</strong> (" + distance + " km)";
            if (routes[i].hasOwnProperty('link')){
                var link = routes[i].gxp[j].link;
                content = content + "<br/><a href='" + link + "' target='new'>Ver historia</a>";
            }
            gpx.bindPopup(content).addTo(map);
        }
    }

});
