'use strict';

module.exports = 'trinet.core.filters';

var angular = require('angular');
angular.module('trinet.core.filters', [])
	.filter('tel', require('./telephone/telephone.filter'))
	.filter('acronym', require('./acronym/acronym.filter'))
	.filter('initials', require('./name-filters/initials.filter'))
	.filter('firstName', require('./name-filters/first-name.filter'))
	.filter('phonenumber', require('./tn-phone-filter'));
