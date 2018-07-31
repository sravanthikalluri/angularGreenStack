'use strict';

require('./tn-checkbox.component.scss');

module.exports = {
	template: require('./tn-checkbox.component.html'),
	controller: TnCheckboxController,
	bindings: {
		label: '@',
		fieldValue: '<',
		trueValue: '<',
		falseValue: '<',
		onUpdate: '&'
	}
};

function TnCheckboxController() {
	var ctrl = this;

	ctrl.update = function() {
		ctrl.onUpdate({ value: ctrl.fieldValue });
	};
}
