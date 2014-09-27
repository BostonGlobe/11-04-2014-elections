var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var rewriteModule = require('http-rewrite-middleware');
var fs            = require('fs');
var config        = require('../config');

gulp.task('browserSync', function(done) {

	// watch for changes to scss
	gulp.watch([
		'common/css/*',
		config.baseDir() + '/css/*'
	], ['sass']);

	browserSync({
		server: {
			baseDir: './',
			middleware: rewriteModule.getMiddleware(JSON.parse(fs.readFileSync('middleware.json', 'utf8')))
		},
		ghostMode: false,
		startPath: config.baseDir()
		// ,
		// files: [
		// 	'common/js/*.js',
		// 	config.baseDir() + '/.tmp/*.js',
		// 	config.baseDir() + '/js/**/*.js'
		// ]
	});

});