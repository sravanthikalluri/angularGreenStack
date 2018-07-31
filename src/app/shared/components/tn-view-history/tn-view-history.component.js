'use strict';

require('./tn-view-history.component.scss');

module.exports = {
	template: require('./tn-view-history.component.html'),
	bindings: {
		data: '=',
		sectionType: '='
	},
	controller: viewHistoryController
};
function viewHistoryController() {
	var ctrl = this;
	// TODO: Re-factor to use ng-repeat.
	ctrl.$onInit = function () {
		ctrl.openViewHistory = false;
	};
}

