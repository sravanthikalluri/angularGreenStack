'use strict';

module.exports = MaritalStatusFilter;

/* @ngInject */
function MaritalStatusFilter(DS) {
	var MARITAL_STATUSES = DS.getAll('marital-statuses')[0].marriedStatus;
	return function(key) {
		var obj = MARITAL_STATUSES.filter(function(d) { return d.key === key; })[0];
		return (obj ? obj.value : key);
	}
}
