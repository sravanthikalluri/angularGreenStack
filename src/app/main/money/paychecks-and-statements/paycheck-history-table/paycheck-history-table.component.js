'use strict';

require('./paycheck-history-table.component.scss');

module.exports = {
	templateUrl: 'app/main/money/paychecks-and-statements/paycheck-history-table/paycheck-history-table.component.html',
	controller: ['$scope', '$filter','moment',paycheckHistoryTableController],
	bindings: {
		checkSummaries: '<',
		selectedCheckIndex: '&',
		viewDetailsClicked: '&',
		filter: '<',
		useDateRange: '<',
		selectedIndex: '='
	}
};
/* @ngInject */
function paycheckHistoryTableController($scope, $filter,moment) {
	var ctrl = this;
	ctrl.titles = [
		'Pay End Date',
		'ADV/CK Date',
		'ADV/CK #',
		'Net Pay',
		'Details'
	];

	//All but company and details sortable
	ctrl.sortableTitles = ctrl.titles.slice(0,6).slice(0,5);

	ctrl.$onInit = function() {
		ctrl.data = ctrl.prepareCheckData(ctrl.checkSummaries);
	};
	ctrl.$onChanges = function(changesObj) {
		var checkSummaries = changesObj.checkSummaries.currentValue;
		ctrl.data = ctrl.prepareCheckData(checkSummaries);
	};

	$scope.onViewDetailsClicked = function(index) {
		ctrl.viewDetailsClicked({$event: {checkIndex: index}});
		ctrl.selectedIndex = index;
	};


	ctrl.prepareCheckData = function(data) {
		var results = [];

		angular.forEach(data, function(key, index) {
			var check = {};

			//This feels... hacky
			var functionString = '$parent.$parent.$parent.$parent.onViewDetailsClicked(' + index + ')';

			check.payEndDate = moment(key.checkKey.payEndDt).format('MM/DD/YYYY');
			check.ckDate = moment(key.checkDt).format('MM/DD/YYYY');
			check.ckNum = key.checkNumber;
			check.netPay = $filter('currency')(key.netPay);
			check.details = '<a href="" id="paycheck-' + index + '" class="paycheck-history-table-view-details-link" ng-click="' + functionString + '"> View </a>';

			results.push(check);
		});

		return results;
	}


}
