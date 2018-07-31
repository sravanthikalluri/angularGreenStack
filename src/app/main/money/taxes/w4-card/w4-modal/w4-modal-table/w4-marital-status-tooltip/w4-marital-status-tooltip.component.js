'use strict';

require('./w4-marital-status-tooltip.component.scss');

module.exports = {
	template: require('./w4-marital-status-tooltip.component.html'),
	controller: W4MaritalStatusTooltipController,
	bindings: {
		item: '<'
	}
};

function W4MaritalStatusTooltipController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.tooltips = {
			'Federal tax' : false,
			'State tax'   : false,
			'Local tax'   : false
		};
	};

/*	// TODO: Create tooltip component/directive
	ctrl.showTooltip = function(item) {
		ctrl.tooltips[item.data.type] = true;
	};

	ctrl.hideTooltip = function(item) {
		ctrl.tooltips[item.data.type] = false;
	};*/
}
