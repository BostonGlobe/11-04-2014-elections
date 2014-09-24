R:

	Rscript -e "rmarkdown::render('data/11-04-2014-elections.Rmd')"
	open data/11-04-2014-elections.html

R_deploy:

	cp data/11-04-2014-elections.html /Volumes/www_html/multimedia/graphics/projectFiles/Rmd/
	rsync -rv data/11-04-2014-elections_files /Volumes/www_html/multimedia/graphics/projectFiles/Rmd
	open http://private.boston.com/multimedia/graphics/projectFiles/Rmd/11-04-2014-elections.html