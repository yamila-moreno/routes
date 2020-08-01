$(document).ready(function() {

    // choose map providers between: https://leaflet-extras.github.io/leaflet-providers/preview/
    var outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieWFtaWxhIiwiYSI6IjUzNDE5ZDRkZjBiZjBiZDY0YTBhZjBmNmUyZGYzYTZiIn0.okLJEzGsBQ6IOgn1mhToIQ', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			         '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			         'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.outdoors'
    });

    var centerMap = [40.6390, -3.1229];

    map = L.map('map', {
        center: centerMap,
        zoom: 9,
        layers: [outdoors]
    });

    var hash = new L.Hash(map);

    routes_bboxes = {};
    for (var id in routes_dict) {
        var customLink = "";
        if (routes_dict[id].link){
            customLink = "<a href='" + routes_dict[id].link + "' target='new'>Ver más</a> <i class='icon ion-md-open'>";
        }
        customIcon = "md-" + routes_dict[id].cat.icon;
        customColor = routes_dict[id].cat.color;

        // Route gpx
        gpx = new L.GPX(routes_dict[id].source, {
            max_point_interval: 7200000,
            gpx_options: {
                parseElements: ['route', 'track']
            },
            async: true,
            marker_options: {
                startIcon: new L.AwesomeMarkers.icon({
                    icon: customIcon,
                    prefix: 'ion',
                    markerColor: customColor,
                    iconColor: 'white',
                }),
                startIconUrl: null,
                endIconUrl: null,
                shadowUrl: null
            },
            polyline_options: {
                color: customColor
            },
            customLink: customLink,
            customIcon: customIcon
        })
        .on('loaded', function(e){
          // Popup
          var link = e.target.options.customLink;
          var icon = e.target.options.customIcon;
          var name = e.target.get_name();
          var distance = (e.target.get_distance() / 1000).toFixed(2);
          var sd = e.target.get_start_time();
          var month = sd.getMonth() + 1;
          var when = sd.getDate() + "/" + month + "/" + sd.getFullYear();
          var content = "<i class='icon ion-" + icon + "'></i> <strong>" + name + "</strong>"
          if (when) {
            content = content + " - " + when;
          }
          content = content + "<br/>" + distance + " km";
          if (link) {
            content = content + " " + link;
          }
          e.target.bindPopup(content);
        });
        routes_bboxes[id] = gpx;
    }

    map.on('moveend', function() {
        // capturar NW y SE y seleccionar qué rutas voy a mostrar
        // console.log("NW: " + map.getBounds().getNorthWest() + " SE: " +  map.getBounds().getSouthEast());
        var bboxMap = map.getBounds();
        for (var id in routes_bboxes) {
            if (isInside(routes_bboxes[id].getBounds(), bboxMap)) {
                routes_bboxes[id].addTo(map);
            }
        }
    });
});

function isInside(bboxRoute, bboxMap) {
    return true;
}
