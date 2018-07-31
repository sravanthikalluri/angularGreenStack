'use strict';

require('./existing-reimbursable-account.component.scss');

module.exports = {
	templateUrl: 'app/main/money/direct-deposit/existing-account/existing-reimbursable-account/existing-reimbursable-account.component.html',
	controller: ['utilService','gso',ExistingReimbursableAccountController],
	bindings:{
		data : "<",
		eligibility:'<'
	}
};

/* @ngInject */
function ExistingReimbursableAccountController(utilService,gso) {
	var ctrl = this;
	ctrl.titles = [
		{
			title: 'Account',
			class: 'number'
		},
		{
			title: 'Reimbursement Type',
			class: 'type'
		}
	];

	ctrl.comapnyId = gso.getAppConfig().companyId;

	ctrl.$onChanges = function() {
		setReimbursements();
	};


	function setReimbursements(){
		ctrl.fsaSelected = ctrl.apSelected = '--';
		if (ctrl.data && ctrl.data.length > 0) {
			angular.forEach(ctrl.data,function(reimbursment){
				if (reimbursment.fsaAccount === true) {
					ctrl.fsaSelected = utilService.mockAccount(reimbursment);
				}
				if (reimbursment.apAccount === true) {
					ctrl.apSelected =  utilService.mockAccount(reimbursment);
				}

			});

		}else{
			ctrl.fsaSelected = ctrl.apSelected = 'Check';
		}
	}
	ctrl.$onInit = function() {
		setReimbursements();
	};
}
