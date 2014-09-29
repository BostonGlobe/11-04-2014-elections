var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', function() {

	// watch for changes to html
	gulp.watch([
		config.html().src,
		config.baseDir() + '/html/*'
	], ['html']);

	// watch for changes to sass
	gulp.watch([
		'common/css/*',
		config.baseDir() + '/css/*'
	], ['sass']);
});