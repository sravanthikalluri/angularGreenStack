'use strict';

require('./tn-tooltip.component.scss');

module.exports = {
	template: require('./tn-tooltip.component.html'),
	controller: TooltipController,
	bindings: {
		msg: '<'
	}
};

function TooltipController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.tooltips = false;
	};

	// TODO: Create tooltip component/directive
	ctrl.showTooltip = function() {
		ctrl.tooltips = true;
	};

	ctrl.hideTooltip = function() {
		ctrl.tooltips = false;
	};
}
