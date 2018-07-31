'use strict';

require('./pay-history-card.component.scss');

module.exports = {
	templateUrl: 'app/main/money/pay-history-card/pay-history-card.component.html',
	controller: ['DS','$state','$filter',PayHistoryCardController]
};

/* @ngInject */
function PayHistoryCardController(DS,$state,$filter) {
	var ctrl = this;
	ctrl.defaultPaychecksSize = 6;
	ctrl.checks = [];
	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		ctrl.loading = true;
		DS.find('paychecks', '').then(function(result) {
			ctrl.onRangeChange(result);
			ctrl.loading = false;
		}).catch(function(error){
			ctrl.errorMessage = error.data._statusCode === '404' ? $filter('translate')('no-pay-history') : error.data._error.message;
			ctrl.loading = false;
		});


	};

	ctrl.onRangeChange = function(allPaychecks) {
		var startIndex, endIndex = 0;
		var today = new Date();

		var startDate = new Date();
		var pastDate = today.setMonth(today.getMonth() - 6);

		for(var i = 0; i < allPaychecks.checkSummaries.length; i++) {
			var date = new Date(allPaychecks.checkSummaries[i].checkDt);

			if(date < startDate && startIndex === undefined) {
				startIndex = i;
			}

			if(date < pastDate) {
				break;
			}
		}
		endIndex = i;

		ctrl.checks = allPaychecks.checkSummaries.slice(startIndex, endIndex);


		if (ctrl.checks.length === 0) {
			ctrl.showSpinner = true;
			ctrl.errorMessage = $filter('translate')('no-recent-pay-history');
		}
		else{
			if (ctrl.checks.length > ctrl.defaultPaychecksSize) {
				ctrl.checks = ctrl.checks.slice(0, ctrl.defaultPaychecksSize);
			}
			ctrl.showSpinner = false;
			ctrl.errorMessage = null;
		}
	};

	ctrl.viewAllPayChecks = function(){
		$state.go('app.main.money.paychecks-and-statements');
	};
}
