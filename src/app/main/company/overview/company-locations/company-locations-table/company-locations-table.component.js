'use strict';

require('./company-locations-table.component.scss');

module.exports = {
	templateUrl: 'app/main/company/overview/company-locations/company-locations-table/company-locations-table.component.html',
	controller: ['DS',CompanyLocationsTableController],
	bindings:{
		headquarter:'<'
	}
};

/* @ngInject */
function CompanyLocationsTableController (DS) {
	var ctrl = this;
}
