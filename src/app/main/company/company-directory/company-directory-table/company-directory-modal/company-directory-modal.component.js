'use strict';

require('./company-directory-modal.component.scss');

module.exports = {
	templateUrl: 'app/main/company/company-directory/company-directory-table/company-directory-modal/company-directory-modal.component.html',
	controller: ['$state','DS',CompanyDirectoryModalController],
	bindings: {
		show: '=',
		modalData: '<'
	}
};

/* @ngInject */
function CompanyDirectoryModalController($state,DS) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.chipStyle = {'background-color' :'rgb(110,185,122)'};
	}

	ctrl.closeModal = function () {
		ctrl.show = false;
	};

	ctrl.profile = function () {
		$state.go('app.main.profile');
	};


}
