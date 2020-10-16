$(document).ready(function() {

    var map = L.map('map').setView([40.8265, -3.9131], 11);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
               attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
               maxZoom: 18,
               id: 'mapbox/streets-v11',
               tileSize: 512,
               zoomOffset: -1,
               accessToken: 'pk.eyJ1IjoieWFtaWxhIiwiYSI6IjUzNDE5ZDRkZjBiZjBiZDY0YTBhZjBmNmUyZGYzYTZiIn0.okLJEzGsBQ6IOgn1mhToIQ'
    }).addTo(map);
    var hash = new L.Hash(map);

    routes_bboxes = {};
    for (var id in routes_dict) {
        var customLink = ""; if (routes_dict[id].link){ customLink = "<a href='" + routes_dict[id].link + "' target='new'>Ver más</a> <i class='icon ion-md-open'>"; } customIcon = "md-" + routes_dict[id].cat.icon;
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
        var bboxMap = map.getBounds();
        for (var id in routes_bboxes) {
            routes_bboxes[id].addTo(map);
        }
    });
});
