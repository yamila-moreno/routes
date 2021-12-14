$(document).ready(function() {

    async function getRoutes(url = '', data = {}) {
      const response = await fetch(url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      return response.json();
    }

    var map = L.map('map').setView([40.8265, -3.9131], 11);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
               attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
               maxZoom: 18,
               id: 'mapbox/outdoors-v11',
               tileSize: 512,
               zoomOffset: -1,
               accessToken: 'pk.eyJ1IjoieWFtaWxhIiwiYSI6IjUzNDE5ZDRkZjBiZjBiZDY0YTBhZjBmNmUyZGYzYTZiIn0.okLJEzGsBQ6IOgn1mhToIQ'
    }).addTo(map);
    var hash = new L.Hash(map);

    map.on('moveend', function() {
      getRoutes('http://localhost:3000/rpc/get_routes', {
        "minx": map.getBounds().getWest(),
        "miny": map.getBounds().getSouth(),
        "maxx": map.getBounds().getEast(),
        "maxy": map.getBounds().getNorth()
      }).then(data => {
        for (let i=0; i < data.length; i++ ) {
          var trackroute = data[i];

          L.geoJSON(trackroute.geom, {
            style: function (feature) {
              return { color: categories[trackroute.category].color };
            }
          }).addTo(map);

          var trackColor = categories[trackroute.category].color;
          var trackIcon = L.AwesomeMarkers.icon({
            "icon": "md-" + categories[trackroute.category].icon,
            "prefix": "ion",
            "markerColor": trackColor,
            "iconColor": "white",
          });

          var coords = trackroute.start_point.coordinates.reverse();
          var popupContent = "<i class='icon ion-md-" + categories[trackroute.category].icon + "'> <strong>" + trackroute.name + "</strong>";
          popupContent = popupContent + "<br/>" + trackroute.date;
          popupContent = popupContent + " " + trackroute.distance + " km";
          if (trackroute.post) {
            popupContent = popupContent + " - <a href='" + trackroute.post + "' target='_new'>POST</a>";
          }
          if(trackroute.photos) {
            popupContent = popupContent + " - <a href='" + trackroute.photos + "' target='_new'>FOTOS</a>";
          }
          L.marker(coords, {
            "icon": trackIcon
          }).bindPopup(popupContent).addTo(map);
        }
      });
    });
});
