'use strict';

require('./new-account.component.scss');

module.exports = {
	templateUrl: 'app/main/money/direct-deposit/new-account/new-account.component.html',
	controller: ['$rootScope', '$state', 'utilService', 'DS', '$filter','gso','SharedDataService',NewAccountController],
	bindings : {
		data:'<',
		showAmountSection : '<',
		existingAccounts : '=',
		show: '=',
		remainingAmount: '='
	}
};

/* @ngInject */
function NewAccountController($rootScope, $state, utilService, DS, $filter,gso,SharedDataService) {
	var ctrl = this;
	ctrl.addAccount = {};
	ctrl.accountTypes = ['Checking','Savings'];
	ctrl.selectedAmountType = 'dollar';
	ctrl.addAccount.comapnyId = gso.getAppConfig().companyId;

	ctrl.$onInit = function() {
		setTimeout(function () {
			angular.element("i#newAcctCreateClose").focus();
		}, 1000);

		ctrl.showAcct = 'password';
		ctrl.canadianUser = ctrl.setCanadian(gso.getAppConfig().countryCode);
		ctrl.calSelectedEffectiveDate = utilService.filterNextDayDate();
	};

	ctrl.closeModal = function(){
		ctrl.show = false;
	};

	ctrl.setCanadian = function (countryCode) {
	   return countryCode === 'CA' ?  true :  false;
	};

	ctrl.state = function(){
		$state.go('app.main.money.direct-deposit');
	};

	ctrl.resetPriority = function(earningData){
		angular.forEach(earningData, function (value, index) {
			if (!value.netBalance) {
				value.priority = 700 - (index * 25);
			} else if (value.netBalance) {
				value.priority = 700;
			}
		});
		return earningData;
	};
	ctrl.setFocus = function (e) {
		if(e.which == 9){
			angular.element("i#newAcctCreateClose").focus();
		}
	};
	ctrl.showAccountNo = function (checked) {
		if (checked === 'Y') {
			ctrl.showAcct = 'text';
		}
		else {
			ctrl.showAcct = 'password';
		}
	};
	ctrl.addAccountDetails = function(formName){
		if(formName.$valid) {
			ctrl.addAccount.accountName = 'Account Name';
			ctrl.addAccount.uniqueId = null;
			ctrl.addAccount.effectiveDate = utilService.filterNextDayDate();
			ctrl.addAccount.employeeId = sessionStorage.getItem('empId');
			if (ctrl.canadianUser) {
				ctrl.addAccount.routingNumber = null;
			} else {
				ctrl.addAccount.bankId = null;
				ctrl.addAccount.branchId = null;
			}

			if (ctrl.addAccount.accountNumber) {
				ctrl.addAccount.account_number = utilService.mockAccount(ctrl.addAccount);
			}

			if(!ctrl.showAmountSection){
				ctrl.addAccount.fsaAccount = ctrl.addAccount.fsaAccount == undefined ? false : ctrl.addAccount.fsaAccount;
				ctrl.addAccount.apAccount = ctrl.addAccount.apAccount == undefined ? false : ctrl.addAccount.apAccount;

				if((!ctrl.addAccount.fsaAccount && !ctrl.addAccount.apAccount) && ctrl.addAccount.comapnyId == '001'){
					var customIdAlert = {
						_statusMessage: $filter('translate')('pageValidationMessage')
					};
					ctrl.errorAlert = customIdAlert;
					return false;
				}

				ctrl.addAccount.netBalance = true;
				ctrl.addAccount.amountType = 'netBalance';
				ctrl.addAccount.priority = 700;
				ctrl.addAccount.amount = null;
				ctrl.addAccount.effectiveDate = ctrl.data.minEffectiveDate;

				var dataArray = [];
					dataArray.push(ctrl.addAccount);


				var data = {
					'accountList': dataArray
				};

				ctrl.disableSaveButton = true;
				DS.create('create-direct-deposit', data).then(function (results) {
					// we will have already marked this task complete ; uncomment this line when we implement Skip button for DD
					//$rootScope.$emit("onboardingUpdateTask", {taskId: "DIRECT_DEPOSIT"});

					SharedDataService.getAppSharedData().isDDLoaded = true;
					$state.go('app.main.money.direct-deposit',{}, { reload: true });
					ctrl.disableSaveButton = false;
				}).catch(function(error) {
					ctrl.disableSaveButton = false;
					ctrl.errorAlert = utilService.getErrorMessages(error.data);
				});

			}else{
				var saveData = angular.copy(ctrl.existingAccounts);
				ctrl.addAccount.fsaAccount = false;
				ctrl.addAccount.apAccount = false;
				ctrl.addAccount.netBalance = false;
				ctrl.addAccount.priority = 675;
				ctrl.addAccount.amountType = ctrl.selectedAmountType;

				if(ctrl.selectedAmountType === 'percentage' && !ctrl.addAccount.percent){
					ctrl.addAccount.percent = 0;
				}
				// saveData.sort(function (fromObj, toObj) {
				// 	return parseInt(toObj.priority, 10) - parseInt(fromObj.priority, 10);
				// });
				var temp = saveData;
				temp.unshift(ctrl.addAccount);
				saveData = temp;
				saveData = ctrl.resetPriority(saveData);

				ctrl.existingAccounts = angular.copy(saveData);
				ctrl.closeModal();

				// TODO: Remove this and implement one-way data-binding properly
				$rootScope.$broadcast('onNewAccountModalClose', { data: ctrl.existingAccounts });
			}

		}else{
			var customIdAlert = {
				_statusCode: '400',
				_statusMessage: $filter('translate')('pageValidationMessage')
			};
			ctrl.errorAlert = customIdAlert;
			setTimeout(function () {
				angular.element('#alertMessage button').focus();
			},1000)
		}
	};
}
