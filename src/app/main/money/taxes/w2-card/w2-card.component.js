'use strict';

require('./w2-card.component.scss');

module.exports = {
	template: require('./w2-card.component.html'),
	controller: ['$window', 'taxWithholdingUrls', 'moment',W2CardController]
};

/* @ngInject */
function W2CardController($window, taxWithholdingUrls, moment) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.w2Year = moment().subtract(1, 'year').format('YYYY');
		ctrl.w2FormUrl = taxWithholdingUrls.w2Form;
	};

	ctrl.download = function(url) {
		$window.open(url, '_blank');
	};
}
