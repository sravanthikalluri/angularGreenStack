'use strict';

require('./overview-table.component.scss');

module.exports = {
	templateUrl: 'app/main/company/overview/overview-table/overview-table.component.html',
	controller: OverviewTableController,
	bindings:{
		headquarter:'<'
	}
};

/* @ngInject */
function OverviewTableController () {
	var ctrl = this;

	ctrl.$onInit = function () {
	}

}
