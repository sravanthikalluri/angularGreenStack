'use strict';

require('./edit-reimbursable-account-table.component.scss');

module.exports = {
	templateUrl: 'app/main/money/direct-deposit/edit-account/edit-reimbursable-account/edit-reimbursable-account-table.component.html',
	controller: ['$rootScope','utilService','gso',editReimbursableAccountTable],
	bindings: {
		data: '=',
		doAnyChanges: '=',
		eligibility:'='
	}
};

/* @ngInject */
function editReimbursableAccountTable($rootScope,utilService,gso) {
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

	$rootScope.$on('onChangeAccounts', function(e, data) {
		ctrl.data = data.data;
		setReimbursements();
	});

	ctrl.comapnyId = gso.getAppConfig().companyId;
	ctrl.$onInit = function() {
		setReimbursements();
	};



	function makeFSAAPAccount(earningsData){
			var isHavingFSAAccount = havingFSAAccount(earningsData);
			var isHavingAPAccount = havingAPAccount(earningsData);

		angular.forEach(earningsData, function (account, key) {
			if (account.netBalance && !isHavingFSAAccount) {
				account.fsaAccount = true;
			}
			if (account.netBalance && !isHavingAPAccount) {
				account.apAccount = true;
			}

		});
		return earningsData;
	};


	function setReimbursements(){
		if (ctrl.data && ctrl.data.length > 0) {
			var reimbursements = [{key : 0, value : ''}];
			ctrl.fsaSelected = {key : 0, value : ''};
			ctrl.apSelected = {key : 0, value : ''};

			//ctrl.data = makeFSAAPAccount(ctrl.data);
			angular.forEach(ctrl.data,function(reimbursment,index){
				if (reimbursment.fsaAccount === true) {
					ctrl.fsaSelected = {key : index + 1, value : utilService.mockAccount(reimbursment)};
				}
				if (reimbursment.apAccount === true) {
					ctrl.apSelected =  { key : index + 1, value : utilService.mockAccount(reimbursment)};
				}

				reimbursements.push({key : index + 1,value : utilService.mockAccount(reimbursment)});
			});

			ctrl.reimbursements = angular.copy(reimbursements);
		}else{
			ctrl.fsaSelected = ctrl.apSelected = 'Check';
		}
	}


	function havingFSAAccount(acounts){
		var isHavingFSAAccount = false;
		angular.forEach(acounts, function (input) {
			if(input.fsaAccount) {
				isHavingFSAAccount = true;
			}
		});

		return isHavingFSAAccount;
	}

	function havingAPAccount(acounts){
		var isHavingAPAccount = false;
		angular.forEach(acounts, function (input) {
			if(input.apAccount) {
				isHavingAPAccount = true;
			}
		});

		return isHavingAPAccount;
	}


	function selectAccount(id,isSelectAPAccount){
		angular.forEach(ctrl.data,function(reimbursment,index){
			if(isSelectAPAccount){
				if(id === 0 || index !== (id - 1)){
					ctrl.data[index].fsaAccount = false;
				}
				else {
					ctrl.data[index].apAccount = true;
				}
			}else{
				if(id === 0 || index !== (id - 1)){
					ctrl.data[index].fsaAccount = false;
				}
				else {
					ctrl.data[index].fsaAccount = true;
				}
			}
		});

		ctrl.doAnyChanges = true;
	}
	/**
	 * select fsa account method
	 * @param id
	 */
	ctrl.selectFSAAccount = function (selectedObject) {
		selectAccount(selectedObject.key,false);
	};

	/**
	 * select ap account method
	 * @param id
	 */
	ctrl.selectAPAccount = function (selectedObject) {
		selectAccount(selectedObject.key,true);
	};


}
