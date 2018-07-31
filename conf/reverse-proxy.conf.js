const proxy = require('http-proxy-middleware');
const https = require('https');
const api = require('./trinet-api.conf');

module.exports = createProxy();

function createProxy() {
	const options = {
		target: api.target,
		agent: https.globalAgent,
		changeOrigin: true,
		logLevel: 'debug'
	};
	const regex = api.urls.join('|');
	const filter = function(pathname, req) {
		return pathname.match(regex);
	};
	return proxy(filter, options);
}
