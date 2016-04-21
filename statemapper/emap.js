/* global L */
/* global countryData */

(function(root){

    // map helpers
    function onEachFeature(feature, layer) {

        layer.on({
            mouseover: function(e) {
                var layer = e.target;

                layer.setStyle({
                    weight: 2,
                    color: '#000',
                    dashArray: '',
                    fillOpacity: 0.5
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
                if (e.target.feature.properties.admin == "France")
                {
                    window.open("france.html");
                }
            }
        });
    }


    function style(feature) {
        return {
            fillColor: '#FFEDA0',
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.0
        };
    }

    var map = L.map('mapid');

    // set to cover EUROPE
    map.setView([52.6528849,15.5003522], 4);


    /*
    * Add tileLayer, you can use the provider list below
    * http://leaflet-extras.github.io/leaflet-providers/preview/index.html
    */

    var OpenStreetMap_HOT = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
});
    OpenStreetMap_HOT.addTo(map);


    // add GeoLocations
    var geoJson = L.geoJson(countryData, {
        style: style,
        onEachFeature: onEachFeature
    });

    geoJson.addTo(map);

})(this);
