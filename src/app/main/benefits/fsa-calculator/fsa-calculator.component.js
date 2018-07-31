'use strict';


require('./fsa-calculator.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/fsa-calculator/fsa-calculator.component.html',
	controller: ['DS','$location', 'gso',FSACalculatorController]
};

/* @ngInject */
function FSACalculatorController(DS,$location,gso) {
	var ctrl = this;

	// fetch tab name from query string
	if (!$location.search().tab) {
		ctrl.tabState = 'Home';
	}
	else {
		ctrl.tabState = $location.search().tab;
	}

	ctrl.listFilingStatus = [
		{ label: 'Single', value: 0 },
		{ label: 'Married (joint)', value: 1 },
		{ label: 'Married (separate)', value: 2 },
		{ label: 'Head of household', value: 3 }
	];

	ctrl.$onInit=function(){
	}

	ctrl.openTab = function (tabName) {
		ctrl.tabState = tabName;
	}
}
