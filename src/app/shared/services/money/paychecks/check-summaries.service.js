'use strict';

module.exports = CheckSummariesService;

/* @ngInject */
function CheckSummariesService(DS) {
	return DS.defineResource({
		name: 'checkSummaries',
		idAttribute: 'id',
		relations: {
			belongsTo: {
				paychecks: {
					localField: 'paychecks',
					localKey: 'paychecksId'
				}
			}
		}
	});
}
