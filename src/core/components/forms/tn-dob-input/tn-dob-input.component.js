'use strict';

require('./tn-dob-input.component.scss');

module.exports = {
	template: require('./tn-dob-input.component.html'),
	controller: ['moment',TnDobInputController],
	bindings: {
		label: '@',
		fieldName: '@',
		formName: '<',
		fieldValue: '<',
		isRequired: '<',
		isDisabled: '<',
		onUpdate: '&',
		componentId: '<'
	}
};

/* @ngInject */
function TnDobInputController(moment) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.fieldValueCopy = angular.copy(ctrl.fieldValue);
	};

	ctrl.$postLink = function() {
		ctrl.input = ctrl.formName[ctrl.fieldName];
	};

	ctrl.update = function(data) {
		ctrl.onUpdate({ data: moment(data, 'MM/DD/YYYY').format('YYYY-MM-DD') });
	};
}
