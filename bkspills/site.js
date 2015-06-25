var bk = {};

// init map stuff
bk.map = L.map('map').setView([40.692191, -73.972732], 13);
L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
	attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
}).addTo(bk.map);
// style specification for different geometries
bk.styles = {
	"polygon":{
		fillColor:'#fff',
		weight:3,
		fillOpacity:0.5
	},
	"circleAmount":{
		radius: 3,
		fillColor: '#f00',
		weight:0,
		fillOpacity: 0.8
	},
	"circleUnknownAmount":{
		radius: 3,
		fillColor: '#333',
		weight:0,
		fillOpacity: 0.8	
	},
	"buffered":{
		fillColor: '#ff0',
		fillOpacity: 0.9,
		stroke: 0
	}
};
bk.layerGroup = L.layerGroup().addTo(bk.map);

bk.drawPolygons = function(featureCollection){
	return L.geoJson(featureCollection, {
		style: bk.styles.polygon,
		onEachFeature: function(feature,layer){
			var pt_count = feature.properties.pt_count,
				amount_sum = feature.properties.amount_sum,
				geoname = feature.properties.BoroCT2010 ? 'Census Tract ' + feature.properties.BoroCT2010 + ' in ' + feature.properties.NTAName : feature.properties.ntaname,
				population = feature.properties.BoroCT2010 ? feature.properties.pop_2010_2_Population : feature.properties.population;


			var popup = '<div><strong>' +
				geoname + '</strong> spills: <strong>' +
				pt_count + '</strong></br>' +
				'Known Spill Amount: <strong>' +
				amount_sum + '</strong> Gallons</br>' +
				'Population: <strong>'+ population +'</div>';

			layer.bindPopup(popup);
		}
	})
};

bk.drawPoints = function(featureCollection){
	return L.geoJson(featureCollection, {
		pointToLayer: function(feature,latlng){
			if (feature.properties.Amount != 'Unknown') { //hint: render differenciation != partial dataset
				return L.circleMarker(latlng, bk.styles.circleAmount)
			} else {
				return L.circleMarker(latlng, bk.styles.circleUnknownAmount)
			}
		}
	});
};

bk.trigger = function(elId, layer){
	var button = document.getElementById(elId);

	button.onclick = function(e){
		e.preventDefault();
		e.stopPropagation();

		if (bk.layerGroup.hasLayer(layer)){
			bk.layerGroup.removeLayer(layer);
			this.className = '';
		} else {
			bk.layerGroup.addLayer(layer);
			this.className = 'active';
		}
	};
}
// start up
queue()
	.defer(d3.json, 'neighborhood_tabulation_area_bk.geojson')
	.defer(d3.json, 'census_tract_bk.geojson')
	.defer(d3.json, 'spills.geojson')
	.await(function(err,nta,tract,allSpills){

		var spillsWithAmount = turf.remove(allSpills,'Amount','Unknown'); // get relevant points only
			buffered = turf.buffer(allSpills,100,'meters'); //note caveats

		// regarding cd
		turf.count(nta,allSpills,'pt_count');
		turf.sum(nta,spillsWithAmount,'Amount','amount_sum');

		// regarding tracts
		turf.count(tract,allSpills,'pt_count');
		turf.sum(tract,spillsWithAmount,'Amount','amount_sum');

		var ntaLayer = bk.drawPolygons(nta),
			tractLayer = bk.drawPolygons(tract),
			pointsLayer = bk.drawPoints(allSpills),
			bufferedLayer = L.geoJson(buffered,bk.styles.buffered);

		bk.trigger('nta',ntaLayer);
		bk.trigger('tract',tractLayer);
		bk.trigger('points',pointsLayer);
		bk.trigger('buffer',bufferedLayer);
});
