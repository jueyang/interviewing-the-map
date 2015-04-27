var bk = {};

// init map stuff
bk.map = L.map('map').setView([40.692191, -73.972732], 13);

bk.tile = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(bk.map);

// point in polygon! (turf.count)
bk.countPoints = function(polygons,points){
	var polygons = polygons,
		points = points;

	turf.count(polygons,points,'pt_count');
};

// sum a specific field (turf.sum)
// with relevant points only (turf.remove)
bk.sumAmount = function(polygons,points){
	var polygons = polygons,
		pointsWithAmount = turf.remove(points,'Amount','Unknown'); //remove points with spill amount as unknown

	turf.sum(polygons,pointsWithAmount,'Amount','amount_sum');
};

// render the shapes
bk.drawCommunityDistricts = function(featureCollection){
	var polygon = {
		fillColor:'#fff',
		weight:0.8,
		fillOpacity:0.5
	};

	var cd = L.geoJson(featureCollection, {
		style: polygon,
		onEachFeature: function(feature,layer){

			var popup = '<div>' +
				'Spill incidents in CD ' +
				feature.properties.borocd + ': ' +
				feature.properties.pt_count + '</br>' +
				'<strong>Known</strong> Spill Amount: ' +
				feature.properties.amount_sum + ' Gallons' +
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

	var spills = L.geoJson(featureCollection, {
		pointToLayer: function(feature,latlng){
			if (feature.properties.Amount != 'Unknown') {
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
		bk.countPoints(cd,spills);
		bk.sumAmount(cd,spills);				
		bk.drawCommunityDistricts(cd);
		bk.drawSpillPoints(spills);
})
