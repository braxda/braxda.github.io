if (typeof map !== "undefined") {
    map.remove();
}

var map = L.map('map').setView([39.8283, -98.5795], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load player locations
    fetch('geojson/players.geojson')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
              radius: 5,
              fillColor: "red",
              color: "black",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            });
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup(`<b>Player:</b> ${feature.properties.name}<br>
                             <b>Position:</b> ${feature.properties.position}<br>
                             <b>Hometown:</b> ${feature.properties.hometown}`);
          }
        }).addTo(map);
      });
