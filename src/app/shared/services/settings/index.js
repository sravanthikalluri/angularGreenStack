'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.settings';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./preferences'),
		require('./roles'),
		require('./security'),
		require('./proxy')
	]);
