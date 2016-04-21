/* global L */
/* global statesData */

(function(root){
    
    var stateCount = {
        "Alabama": 100,
        "New York": 50
    };
    
    
    var geoJson;
    
    
    // map helpers
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: function(e) {
                var layer = e.target;
            
                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                });
            
                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
            },
            mouseout: function(e) {
                geoJson.resetStyle(e.target);
            },
            click: function(e){
                console.log(e.target.feature);
            }
        });
    }
    
    function getColor(state) {
        var d = stateCount[state];
        return d > 100 ? '#800026' :
           d > 50  ? '#BD0026' :
           d > 20  ? '#E31A1C' :
           d > 10  ? '#FC4E2A' :
           d > 5   ? '#FD8D3C' :
           d > 2   ? '#FEB24C' :
           d > 1   ? '#FED976' :
                      '#FFEDA0';
    }
    
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.name),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    
    var map = L.map('mapid');

    // set to cover the USA
    map.setView([37.8, -96], 4);
    
    
    /*
    * Add tileLayer, you can use the provider list below
    * http://leaflet-extras.github.io/leaflet-providers/preview/index.html
    */ 
    
    var OpenStreetMap_HOT = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
});
    OpenStreetMap_HOT.addTo(map);
    
    // var Thunderforest_Transport = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    //     maxZoom: 19
    // });
    
    // Thunderforest_Transport.addTo(map);
    
    // add GeoLocations
    var geoJson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    });
    
    geoJson.addTo(map);
    
})(this);    
