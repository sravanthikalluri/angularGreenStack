'use strict';

module.exports = TaxWithholdingsService;

/* @ngInject */
function TaxWithholdingsService($q, DS) {
	var me = this;

	me._create = function(results) {
		return {
			taxWithholdings : results[0],
			hasI9Status     : results[1].data
		};
	};

	me.fetch = function() {
		var promises = [
			DS.find('taxes', ''),
			DS.find('i9-status', ''),
		];

		return $q.all(promises).then(me._create);
	};

	me._getW2Information = function () {
		return DS.find('w2-status', '');
	};

	return me;
}
