# Fallout GIS
Applying GIS concepts to find out how many schools are close to active nucelar reactors.

![](http://media.giphy.com/media/e9KXZZpYXm8eY/giphy.gif)

## What's in here

+ **Girl with Daisy and Atomic Bomb Explosion (1964) - Lyndon B. Johnson Campaign Ad.mkv**: A perennial campaign ad about the terrors of nuclear disasters near children. (It's technically an atomic bomb, not a nuclear reactor which explodes, but it's still an amazing political ad to watch — especially since campaign season is ramping up).
+ **fallout.qgs**: QGIS project file for viewing shapefiles, GeoJSON, and doing medium-scale analysis
+ `data.gz` a zip file containing data files and an XML to geoJSON python script
  + **2011enigma-public-primary-secondary-schools.csv**: a listing of all US public primary and secondary schools courtesy of [enigma.io](http://enigma.io/)
  + **convert-xml.py**: basic python script to read XML and convert it to GeoJSON
  + **operatingreactors.geojson**: A GeoJSON file of all operating reactors in the US
  + **operatingreactors.json**: A JSON file of all operating reactors in the US. Not readable by QGIS, but provided for you to compare the differences between JSON and GeoJSON
  + **operatingreactors.xml**: A crappy XML file with latitudes and longitudes and some basic data about nuclear reactors
  + **requirements.txt**: A textfile listing Python libraries used in the Python conversion script. To install `pip install -r requirements.txt`
+ `shp.gz` a zip file containing buffers, spatially joined points, and a voronoi analysis shapefiles.
  + **5m-nuke-zone.shp**: A five mile buffer, in this case a big circle, around operating nuclear reactors.
  + **reactors-voronoi.shp**: A shapefile of a quick network analysis of operating reactor clusters.
  + **schools-within-5m.shp**: Shapefile that's been spatially joined, taking the data from the reactors and combining it with the data from each school. (It's like a data join, but with maps.)

## Data Sources

### Operating Reactors in the US

+ [Site with all nuclear reactors in the U.S.](http://www.nrc.gov/info-finder/reactor/)
![](https://cloud.githubusercontent.com/assets/1578563/8269488/7c2d0698-1778-11e5-9d3d-0696c7a31f0e.png)

+ [JavaScript for the site](http://www.nrc.gov/admin/js/gmap_operatingreactors.js)
![](https://cloud.githubusercontent.com/assets/1578563/8269489/8e68e93a-1778-11e5-875a-5f019d57502f.png)

+ [XML of active reactors](http://www.nrc.gov/admin/data/gmaps/operatingreactors.xml)
![](https://cloud.githubusercontent.com/assets/1578563/8269490/94975cc4-1778-11e5-8239-320d13ffa226.png)


### Public Primary and Secondary Schools in the US

+ [enigma.io dataset](https://app.enigma.io/table/us.gov.ed.ccd.pessusd.2011?row=0&col=21&page=1)
![](https://cloud.githubusercontent.com/assets/1578563/8269492/ac4db2b4-1778-11e5-8685-0da3634dfcb7.png)
