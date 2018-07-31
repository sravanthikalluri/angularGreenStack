'use strict';

module.exports = PostTaxDednsService;

/* @ngInject */
function PostTaxDednsService(DS) {
	return DS.defineResource({
		name: 'postTaxDedns',
		idAttribute: 'id',
		belongsTo: {
			detail: {
				localField: 'detail',
				localKey: 'detailId'
			}
		}
	});
}
