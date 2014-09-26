var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var config      = require('../config.js');

gulp.task('sass', function(done) {
	return gulp.src('css/*', {cwd: config.baseDir()})
		.pipe(sass({compass: true}))
		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
		.pipe(browserSync.reload({stream:true}));
});