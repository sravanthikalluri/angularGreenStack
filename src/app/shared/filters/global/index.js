'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.global';

module.exports = moduleName;

angular.module(moduleName, [])
	.filter('contentUrl', require('./content-url.filter'))
	.filter('emptyCheckFilter', require('./empty-check.filter'))
	.filter('currencyFilter', require('./currency.filter'))
	.filter('yesOrNo', require('./yes-no.filter'))
	.filter('trusted', require('./trusted.filter'))
	.filter('propsWithFilter', require('./props-with.filter'))
	.filter('propsFilter', require('./props.filter'))
	.filter('SearchCheckboxFilter', require('./search-check-box.filter'))
	.filter('unique', require('./unique.filter'))
	.filter('tel', require('./tel.filter'))
	.filter('dateFormat', require('./date-format.filter'))
	.filter('decimal', require('./decimal.filter'))
	.filter('breakFilter', require('./break.filter'))
	//.filter('limitTo', require('./limit-to.filter'))
	.filter('telFormat', require('./tel-format.filter'))
	.filter('telMfaFormat', require('./tel-mfa-format.filter'))

;
