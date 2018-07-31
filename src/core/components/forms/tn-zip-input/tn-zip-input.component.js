'use strict';

require('./tn-zip-input.component.scss');

module.exports = {
	template: require('./tn-zip-input.component.html'),
	controller: TnZipInputController,
	bindings: {
		label: '@',
		fieldName: '@',
		formName: '<',
		fieldValue: '=',
		isRequired: '<',
		isDisabled: '<',
		onUpdate: '&',
		componentId: '<'
	}
};

function TnZipInputController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.fieldValueCopy = angular.copy(ctrl.fieldValue);
	};

	ctrl.$postLink = function() {
		ctrl.input = ctrl.formName[ctrl.fieldName];
	};

	ctrl.update = function(data) {
		if (data && data.length > 5) {
			data = data.replace(/-/g, '');
			ctrl.fieldValue = data.substr(0, 5) + '-' + data.substr(5);
		} else {
			ctrl.fieldValue = data;
		}
	};
}
