const conf = require('./gulp.conf');
const reverseProxy = require('./reverse-proxy.conf');

module.exports = function () {
  return {
		server: {
			baseDir: [
				conf.paths.tmp,
				conf.paths.src
			],
			middleware: [reverseProxy]
		},
		open: 'external',
		host: 'greenstack.hrpassport.com',
		port: 8080,
		files: [
			conf.path.src('**/*.html')
		]
	};
};
