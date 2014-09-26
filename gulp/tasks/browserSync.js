var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var rewriteModule = require('http-rewrite-middleware');
var fs            = require('fs');
var config        = require('../config.js');

gulp.task('browserSync', function(done) {

	// watch for changes to html
	gulp.watch([
		config.baseDir() + '/template' + config.getUserChoice('template') + '.html',
		config.baseDir() + '/html/*'
	], ['buildHtml']);

	// watch for changes to scss
	gulp.watch([
		'common/css/*',
		config.baseDir() + '/css/*'
	], ['sass']);

	// // watch for changes to templates
	// gulp.watch([
	// 	'common/js/templates/*.template',
	// 	config.baseDir() + '/js/templates/*.template'
	// ], ['compileLoDashtemplates']);

	// // watch for changes to jsx
	// gulp.watch([
	// 	'common/js/jsx/*.jsx',
	// 	config.baseDir() + '/js/jsx/*.jsx'
	// ], ['compileJsxTemplates']);

	var rewriteMiddleware = rewriteModule.getMiddleware(JSON.parse(fs.readFileSync('middleware.json', 'utf8')));

	browserSync({
		server: {
			baseDir: './',
			middleware: rewriteMiddleware
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