'use strict';

require('./tn-toggle.component.scss');

module.exports = {
	template: require('./tn-toggle.component.html'),
	controller: TnToggleController,
	bindings: {
		trueLabel: '@',
		trueSublabel: '@',
		falseLabel: '@',
		falseSublabel: '@',
		isToggled: '<',
		onToggle: '&',
		readerValue: '@'
	}
};

function TnToggleController() {
	var ctrl = this;

	ctrl.onToggleChange = function() {
		ctrl.onToggle({ isToggled: ctrl.isToggled });
	};
}
