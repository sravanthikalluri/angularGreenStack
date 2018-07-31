'use strict';

module.exports = MilitaryStatusFilter;

/* @ngInject */
function MilitaryStatusFilter(DS) {
	var Military_Statuses = DS.getAll('military-statuses')[0].militaryStatus;
	return function(key) {
		var obj = Military_Statuses.filter(function(d) { return d.key === key; })[0];
		return (obj ? obj.value : key);
	}
}
