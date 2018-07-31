'use strict';

module.exports = EthnicitiesFilter;

/* @ngInject */
function EthnicitiesFilter(DS) {
	var ethnicities = DS.getAll('ethnicities')[0] && DS.getAll('ethnicities')[0].ethnicity;
	return function(key) {
		if (ethnicities) {
			var obj = ethnicities.filter(function(d) { return d.key === key; })[0];
			return (obj ? obj.value : key);
		} else {
			return key;
		}
	}
}
