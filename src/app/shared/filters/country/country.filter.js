'use strict';

module.exports = CountryFilter;

/* @ngInject */
function CountryFilter(DS) {
	var COUNTRIES = DS.getAll('countries')[0].countries;
	return function(key) {
		var obj = COUNTRIES.filter(function(d) { return d.key === key; })[0];
		return (obj ? obj.value : key);
	}
}
