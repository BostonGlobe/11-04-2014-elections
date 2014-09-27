var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var browserSync  = require('browser-sync');
// var handleErrors = require('../util/handleErrors');
// var config       = require('../config').sass;

gulp.task('sass', function () {
	return gulp.src('css/*', {cwd: 'graphics/summaryresults'})
		.pipe(sass({compass: true}))
		.pipe(gulp.dest('.tmp', {cwd: 'graphics/summaryresults'}))
		.pipe(browserSync.reload({stream:true}));


	// return gulp.src(config.src)
	// .pipe(sass({
	// compass: true,
	// bundleExec: true,
	// sourcemap: true,
	// sourcemapPath: '../sass'
	// }))
	// .on('error', handleErrors)
	// .pipe(gulp.dest(config.dest));
});
