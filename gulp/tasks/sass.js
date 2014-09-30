var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var config      = require('../config');

gulp.task('sass', function() {
	return gulp.src('css/*', {cwd: config.baseDir()})
		.pipe(sass({
			compass: true
		}))
		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
		.pipe(browserSync.reload({stream:true}));
});