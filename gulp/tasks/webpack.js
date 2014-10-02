var gulp            = require('gulp');
var webpack         = require('gulp-webpack');
var webpackPlugins  = require('gulp-webpack/node_modules/webpack');
var rename          = require('gulp-rename');
var browserSync     = require('browser-sync');
var config          = require('../config');
var path            = require('path');

gulp.task('webpack', function() {

	var isProd = config.getUserChoice('packageToJpt');

	var plugins = [
		new webpackPlugins.ResolverPlugin(
			new webpackPlugins.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
		)
	];

	if (isProd) {
		plugins.push(new webpackPlugins.optimize.UglifyJsPlugin());
		plugins.push(new webpackPlugins.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}));
	}

	return gulp.src(config.baseDir() + '/js/entry.js')
		.pipe(webpack({
			watch: !isProd,
			module: {
				loaders: [
					{ test: /\.jsx$/, loader: 'jsx-loader' },
					{ test: /\.css$/, loader: 'style-loader!css-loader' }
				]
			},
			plugins: plugins,
			resolve: {
				root: [path.join(__dirname, '../../libs')]
			}
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('.tmp', {cwd: config.baseDir()}))
		.pipe(browserSync.reload({stream:true}));
});