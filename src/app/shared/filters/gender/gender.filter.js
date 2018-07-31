'use strict';

module.exports = GenderFilter;

/* @ngInject */
function GenderFilter(DS) {
	var GENDERS = DS.getAll('genders')[0].genders;
	return function(key) {
		var obj = GENDERS.filter(function(d) { return d.key === key; })[0];
		return (obj ? obj.value : key);
	}
}
