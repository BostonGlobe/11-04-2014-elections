// var dest = "./build";
// var src = './src';

var rewriteModule = require('http-rewrite-middleware');
var fs            = require('fs');

module.exports = {
  browserSync: {
	server: {
		// We're serving the src folder as well
		// for sass sourcemap linking
		// baseDir: ['./', src]
		baseDir: ['./'],
		middleware: rewriteModule.getMiddleware(JSON.parse(fs.readFileSync('middleware.json', 'utf8')))
	},
	startPath: 'graphics/summaryresults',
	files: [
		// './graphics/summaryresults/**.js',
		// '/**'
		// dest + "/**",
		// Exclude Map files
		// "!" + dest + "/**.map"
	]
  },

 //  sass: {
	// src: src + "/sass/*.{sass, scss}",
	// dest: dest
 //  },
 //  images: {
	// src: src + "/images/**",
	// dest: dest + "/images"
 //  },
 //  markup: {
	// src: src + "/htdocs/**",
	// dest: dest
 //  },
 //  browserify: {
	// // Enable source maps
	// debug: true,
	// // Additional file extentions to make optional
	// extensions: ['.coffee', '.hbs'],
	// // A separate bundle will be generated for each
	// // bundle config in the list below
	// bundleConfigs: [{
	//   entries: './src/javascript/app.coffee',
	//   dest: dest,
	//   outputName: 'app.js'
	// }, {
	//   entries: './src/javascript/head.coffee',
	//   dest: dest,
	//   outputName: 'head.js'
	// }]
 //  }
};
