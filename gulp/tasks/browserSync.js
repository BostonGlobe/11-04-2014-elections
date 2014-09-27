var gulp           = require('gulp');
var browserSync    = require('browser-sync');
var fs             = require('fs');
var rewriteModule  = require('http-rewrite-middleware');
var config         = require('../config');

gulp.task('browserSync', function(done) {

	// // watch for changes to html
	// gulp.watch([
	// 	'graphics/' + GRAPHIC + '/template' + GRAPHIC_TEMPLATE + '.html',
	// 	'graphics/' + GRAPHIC + '/html/*'
	// ], ['build-html']);

	// watch for changes to scss
	gulp.watch([
		'common/css/*',
		config.baseDir() + '/css/*'
	], ['sass']);

	// // watch for changes to templates
	// gulp.watch([
	// 					  'common/js/templates/*.template',
	// 	'graphics/' + GRAPHIC + '/js/templates/*.template'
	// ], ['compile-templates']);

	browserSync({
		server: {
			baseDir: './',
			middleware: rewriteModule.getMiddleware(JSON.parse(fs.readFileSync('middleware.json', 'utf8')))
		},
		ghostMode: false,
		startPath: config.baseDir(),
		files: [
			// 'common/js/*.js',
			// 'graphics/' + GRAPHIC + '/.tmp/*.js',
			// 'graphics/' + GRAPHIC + '/js/**/*.js'
		]
	});

});