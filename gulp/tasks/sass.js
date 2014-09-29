var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var config      = require('../config');

gulp.task('sass', function() {
	return gulp.src('css/*', {cwd: config.baseDir()})
		.pipe(sass())
		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
		.pipe(browserSync.reload({stream:true}));
});