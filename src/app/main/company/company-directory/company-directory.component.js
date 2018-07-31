'use strict';

require('./company-directory.component.scss');

module.exports = {
	templateUrl: 'app/main/company/company-directory/company-directory.component.html',
	controller: CompanyDirectoryController
};

/* @ngInject */
function CompanyDirectoryController() {
	var ctrl = this;
	ctrl.$onInit=function(){

	}
}
