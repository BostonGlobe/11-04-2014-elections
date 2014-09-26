var gulp        = require('gulp');
var browserSync = require('browser-sync');
var fileinclude = require('gulp-file-include');
var rename      = require('gulp-rename');
var config      = require('../config.js');

gulp.task('buildHtml', function(done) {
	return gulp.src(config.baseDir() + '/template' + config.getUserChoice('template') + '.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest(config.baseDir()))
		.pipe(browserSync.reload({stream:true}));
});