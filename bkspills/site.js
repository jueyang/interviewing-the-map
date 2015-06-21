var bk = {};

// init map stuff
bk.map = L.map('map').setView([40.692191, -73.972732], 13);
// http://a.tile.stamen.com/toner
bk.tile = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
	attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
}).addTo(bk.map);

// point in polygon! (turf.count)
bk.countPoints = function(polygons,points){
	turf.count(polygons,points,'pt_count');
};

// sum a specific field (turf.sum)
bk.sumAmount = function(polygons,points){
	turf.sum(polygons,points,'Amount','amount_sum');
};

// render the shapes
bk.drawCommunityDistricts = function(featureCollection){
	var polygon = {
		fillColor:'#fff',
		weight:0.8,
		fillOpacity:0.5
	};

	L.geoJson(featureCollection, {
		style: polygon,
		onEachFeature: function(feature,layer){

			var popup = '<div>' +
				'Spill incidents in CD <strong>' +
				feature.properties.borocd + '</strong>: <strong>' +
				feature.properties.pt_count + '</strong></br>' +
				'KNOWN Spill Amount: <strong>' +
				feature.properties.amount_sum + '</strong> Gallons' +
				'</div>';

			layer.bindPopup(popup);
		}
	}).addTo(bk.map);
};


bk.drawSpillPoints = function(featureCollection){
	// circle marker
	var circleAmount = {
		radius: 3,
		fillColor: '#f00',
		weight:0,
		fillOpacity: 0.8
	};

	var circleUnknown = {
		radius: 3,
		fillColor: '#333',
		weight:0,
		fillOpacity: 0.8	
	};

	L.geoJson(featureCollection, {
		pointToLayer: function(feature,latlng){
			if (feature.properties.Amount != 'Unknown') { //hint: render differenciation != partial dataset
				return L.circleMarker(latlng, circleAmount)
			} else {
				return L.circleMarker(latlng, circleUnknown)
			}
		}
	}).addTo(bk.map);
};

// start up
queue()
	.defer(d3.json, 'cd.geojson')
	.defer(d3.json, 'spills.geojson')
	.await(function(err,cd,spills){

		var spillsWithAmount = turf.remove(spills,'Amount','Unknown'); // get relevant points only (turf.remove)

		bk.countPoints(cd,spills);
		bk.sumAmount(cd,spillsWithAmount);				
		bk.drawCommunityDistricts(cd);
		bk.drawSpillPoints(spills); // explain why passing in the whole collection rather than spillsWithAmount
})
