var gulp        = require('gulp');
var browserSync = require('browser-sync');
var fileinclude = require('gulp-file-include');
var rename      = require('gulp-rename');

gulp.task('html', function() {

	var config = require('../config').html();

	return gulp.src(config.src)
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.reload({stream:true}));
});