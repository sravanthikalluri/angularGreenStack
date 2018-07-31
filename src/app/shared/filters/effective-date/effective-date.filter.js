'use strict';

module.exports = EffectiveDateFilter;

/* @ngInject */
function EffectiveDateFilter(moment) {
	return function(dateString) {
		var today = moment().utc();
		var date = moment(dateString).utc();

		if (date.isBefore(today) || date.isSame(today)) {
			return 'Currently Effective';
		} else {
			return moment(date).format('MM/DD/YYYY');
		}
	};
}
