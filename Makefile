R:

	Rscript -e "rmarkdown::render('data/11-04-2014-elections.Rmd')"
	open data/11-04-2014-elections.html

R_deploy:

	cp data/11-04-2014-elections.html /Volumes/www_html/multimedia/graphics/projectFiles/Rmd/
	rsync -rv data/11-04-2014-elections_files /Volumes/www_html/multimedia/graphics/projectFiles/Rmd
	open http://private.boston.com/multimedia/graphics/projectFiles/Rmd/11-04-2014-elections.html

download:
	cd data; \
		rm -rf input; \
		mkdir input; \
		cd input; \
		curl http://wsgw.mass.gov/data/gispub/shape/state/towns.zip > towns.zip; \
		unzip towns.zip;

reproject:
	cd data; \
		rm -rf output; \
		mkdir output; \
		mkdir output/MA; \
		cd output; \
		ogr2ogr -s_srs EPSG:26986 -t_srs EPSG:4326 MA/REPORTING_UNITS.shp ../input/TOWNS_POLYM.shp; \
		topojson -p REPORTING_UNIT=TOWN,POPULATION=POP2010 -o MA/REPORTING_UNITS.json --simplify-proportion 0.1 --bbox MA/REPORTING_UNITS.shp;	