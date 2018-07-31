'use strict';

module.exports = EllipsizeFilter;

/* @ngInject */
function EllipsizeFilter($filter) {
	return function(input, length) {
		var maxLength = length || 20;

		if (!input) {
			return input;
		}

		if (input.length > maxLength) {
			return $filter('limitTo')(input, maxLength) + '...';
		}

		return input;
	};
}
