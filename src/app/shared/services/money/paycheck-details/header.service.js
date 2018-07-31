'use strict';

module.exports = HeaderService;

/* @ngInject */
function HeaderService(DS, moment) {
	return DS.defineResource({
		name: 'header',
		idAttribute: 'checkNumber',
		relations: {
			belongsTo: {
				paycheckDetails: {
					localField: 'paycheckDetails',
					localKey: 'paycheckDetailsId'
				}
			}
		},
		computed: {
			payPeriod: ['earnsBegDt', 'earnsEndDt', function(earnsBegDt, earnsEndDt) {
				var dateFormat = 'MMMM D';

				return moment(earnsBegDt).format(dateFormat) + ' - ' + moment(earnsEndDt).format(dateFormat);
			}]
		}
	});
}
