'use strict';

module.exports = StateFilter;

/* @ngInject */
function StateFilter(US_STATES) {
	return function(key) {
		var obj = US_STATES.filter(function(d) { return d.key === key; })[0];
		return (obj ? obj.value : key);
	}
}
