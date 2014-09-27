var gulp = require('gulp');

// Notes:
// - gulp/tasks/browserify.js handles js recompiling with watchify
// - gulp/tasks/browserSync.js watches and reloads compiled files

gulp.task('watch', ['browserSync'], function(done) {

	// first fire browser sync
	// then start watching files and wire them up to their respective tasks
	// watch for changes to scss
	console.log('watching');
	gulp.watch([
		'common/css/*',
		config.baseDir() + '/css/*'
	], ['sass']);

});

// var gulp   = require('gulp');
// var config = require('../config');

// gulp.task('watch', ['setWatch', 'browserSync'], function() {
// 	gulp.watch(config.sass.src,   ['sass']);
// });