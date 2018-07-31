'use strict';

require('./taxes.component.scss');

module.exports = {
	templateUrl: 'app/main/money/taxes/taxes.component.html',
	controller: ['taxWithholdings', '$rootScope','$state','gso',TaxesController]
};

/* @ngInject */
function TaxesController(taxWithholdings, $rootScope,$state,gso) {
	var ctrl = this;
	ctrl.$onInit = function(){
		if(gso.getAppConfig().countryCode === 'CA') {
			$state.go('app.main.money.forms-and-policies', {data: 'taxes'});
		}
	}
	$rootScope.$on('setMessage', function (event, args) {
		ctrl.errorAlert = args;
	});
	taxWithholdings._getW2Information().then(function (result) {
		ctrl.w2CardStatus = result.status;
	})
}
