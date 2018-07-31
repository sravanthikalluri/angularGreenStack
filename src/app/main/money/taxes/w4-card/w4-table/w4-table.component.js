'use strict';

require('./w4-table.component.scss');

module.exports = {
	template: require('./w4-table.component.html'),
	controller: ['$element',W4TableController],
	bindings: {
		taxForm: '<'
	}
};

/* @ngInject */
function W4TableController($element) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.titles = ['Type', 'Allowances', 'Additional Amount'];

		var statesArray = ctrl.taxForm.items.filter(function(d) { return d.data && d.data.type === 'State tax'; });
		ctrl.federal = ctrl.taxForm.items.filter(function(d) { return d.data && d.data.type === 'Federal tax'; })[0];
		ctrl.state = statesArray.length > 0 ? ctrl.stateDynamicFields(statesArray) : angular.noop();
	};

	ctrl.stateDynamicFields = function(states){
		var dynamicFields = {
			percentageGross : null,
			dependentAllowances: null,
			marriedFileSingle: null,
			maritalAllowance: null,
			annualExemptionAmount: null
		};

		return  states.reduce(function(currentState,nextState){
			nextState.data.percentageGross !== null ?  currentState.percentageGross = nextState.data.percentageGross : angular.noop();
			nextState.data.dependentAllowances !== null ?  currentState.dependentAllowances = nextState.data.dependentAllowances : angular.noop();
			nextState.data.marriedFileSingle !== null ?  currentState.marriedFileSingle = nextState.data.marriedFileSingle : angular.noop();
			nextState.data.maritalAllowance !== null ?  currentState.maritalAllowance = nextState.data.maritalAllowance : angular.noop();
			nextState.data.annualExemptionAmount !== null ?  currentState.annualExemptionAmount = nextState.data.annualExemptionAmount : angular.noop();

			return currentState;

		},dynamicFields);

	};

}
