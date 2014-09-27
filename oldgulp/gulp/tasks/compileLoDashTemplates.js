// var gulp        = require('gulp');
// var template    = require('gulp-template-compile');
// var concat      = require('gulp-concat');
// var browserSync = require('browser-sync');
// var config      = require('../config.js');

// gulp.task('compileLoDashTemplates', function(done) {
// 	return gulp.src([
// 			'common/js/templates/*.template',
// 			config.baseDir() + '/js/templates/*.template'
// 		])
// 		.pipe(template({
// 			templateSettings: {
// 				interpolate: /{{([\s\S]+?)}}/g,
// 				evaluate:    /{=([\s\S]+?)=}/g
// 			}
// 		}))
// 		.pipe(concat('templates.js'))
// 		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
// 		.pipe(browserSync.reload({stream:true}));
// });