'use strict';

require('./company-directory-modal-table.component.scss');

module.exports = {
	templateUrl: 'app/main/company/company-directory/company-directory-table/company-directory-modal/company-directory-modal-table/company-directory-modal-table.component.html',
	controller: CompanyDirectoryModalTableController,
	bindings: {
		data: '<'
	}
};

/* @ngInject */
function CompanyDirectoryModalTableController() {
	var ctrl = this;

	ctrl.$onInit = function() {

	}
}
