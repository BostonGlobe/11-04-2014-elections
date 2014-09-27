/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp   = require('gulp');
// var config = require('../config');

gulp.task('watch', ['setWatch', 'browserSync'], function() {

	gulp.watch([
		'common/css/*',
		'graphics/summaryresults/css/*'
	], ['sass']);

	// gulp.watch(config.sass.src,   ['sass']);
});