# Fallout GIS
Applying GIS concepts to find out how many schools are close to active nucelar reactors.

![](http://media.giphy.com/media/e9KXZZpYXm8eY/giphy.gif)

## What's in here

+ `data.gz` a zip file containing data files and an XML to geoJSON python script
+ `shp.gz` a zip file containing buffers, spatially joined points, and a voronoi analysis

## Tools

+ [Python](https://www.python.org/)
+ [QGIS](http://www.qgis.org/en/site/)
+ [MMQGIS plugin](http://michaelminn.com/linux/mmqgis/): particularly handy for quickly creating buffers with radii in metric or English units

*Optional*
Best for spatial joins on large datasets, or if you're more comfortable with Python and SQL

+ [PostgreSQL](http://www.postgresql.org/)
+ [PostGIS](http://postgis.net/)

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
