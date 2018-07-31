'use strict';

require('./edit-account.component.scss');

module.exports = {
	templateUrl: 'app/main/money/direct-deposit/edit-account/edit-account.component.html',
	controller: ['$state','$stateParams','utilService','DS','constants','$filter','$uibModal','moment', 'SharedDataService','gso', EditAccountController]
};

/* @ngInject */
function EditAccountController($state,$stateParams,utilService,DS,constants,$filter,$uibModal,moment,SharedDataService,gso) {
	var ctrl = this;
	ctrl.doAnyChanges = false;
	ctrl.invalid = false;

	ctrl.cancel = function() {
		if(ctrl.doAnyChanges){
			ctrl.prompt()
				.then(function() {
					ctrl.goToView();
				})
				.catch(function() {});
		}else{
			ctrl.goToView();
		}

	};

	ctrl.prompt = function() {
		ctrl.confirmData = {};
		ctrl.confirmData.messsage = 'money.direct_deposit.dd-cancel-changes-text';
		ctrl.confirmData.yesButton = 'money.direct_deposit.dd-discard-changes';
		ctrl.confirmData.noButton = 'preferences-card-email-toggle-false-label';

		var modal = $uibModal.open({
			template  : '<tn-confirmation-modal></tn-confirmation-modal>',
			component : 'tnConfirmationModal',
			windowClass: 'direct_deposit_confirm_modal',
			resolve   : {
				data: function() { return angular.merge({}, ctrl.confirmData); }
			}
		});

		return modal.result;

	};
	ctrl.goToView = function(){
		$state.go('app.main.money.direct-deposit');
	};

	ctrl.alertError = function(response){
		ctrl.errorAlert = response;
	};
	ctrl.$onInit = function() {
		ctrl.showFullSpinner = false;
		if($stateParams.data){
			var data = $stateParams.data;

			data.accounts.map(function(account){
				ctrl.effDate = account.effectiveDate;
			});
			ctrl.data = data.accounts;
			ctrl.paychecks = data.paychecks;
			ctrl.eligibility = data.eligibility;
			ctrl.remainingAmount = data.remainingAmount;
			ctrl.lastPayCheckAmount = utilService.getLastPaycheckAmount(ctrl.paychecks);
			ctrl.effectiveDate = moment(data.effectiveDate).format('MM/DD/YYYY');
			ctrl.minDate = moment(ctrl.eligibility.minEffectiveDate).format('MM/DD/YYYY');
			ctrl.maxDate = moment().add(60,'days').format('MM/DD/YYYY');
			ctrl.minDateMsg = "Earliest possible effective date is "+ctrl.minDate;
			ctrl.totalAccounts = data.totalAccounts;
			ctrl.lastPaycheckAmount = utilService.getLastPaycheckAmount(ctrl.paychecks);

			var keysInToArray = Object.keys(ctrl.totalAccounts);
			ctrl.datesArray = [];
			ctrl.datesArray =  keysInToArray.map(function mapper(value,index){
				var objKey = ctrl.totalAccounts[value][index];
				return objKey.effectiveDate;
			});

		}else{
			$state.go('app.main.money.direct-deposit');
		};
	};

	ctrl.addAccount = function(){
		if(ctrl.data.length >= 10){
			var customIdAlert = {
				_statusCode: constants.warning,
				_statusMessage: 'You should not add more than 10 accounts.'
			};
			ctrl.errorAlert = customIdAlert;

		}else{
			ctrl.showAddAccountModal = true;
		}

	};


	ctrl.setPriorities = function(accList){

		var priorityDifference = 25, count = 0;
		var effectiveDate = moment(new Date(ctrl.effectiveDate)).format('YYYY-MM-DD');

		accList.forEach(function(account){
			account.effectiveDate = effectiveDate;
			if(account.netBalance){
				account.amount = null;
				account.percent = null;
				account.priority = 700;
				account.amountType = "netBalance";
			}
			else{
				count++;
				account.priority =  700 - (priorityDifference * count);
			}
		});

		return accList;
	}

	ctrl.saveChanges = function(){
		if(!ctrl.invalid){
			ctrl.showFullSpinner = true;

			var prioritisedData = ctrl.setPriorities(ctrl.data);

			if(!ctrl.eligibility.apeligible){
				ctrl.data.forEach(function(item){
					item.apAccount = false;
				});
			}
			if(!ctrl.eligibility.fsaeligible){
				ctrl.data.forEach(function(item){
					item.fsaAccount = false;
				})
			}

			var data = {
				'accountList': prioritisedData//ctrl.data
			};
			ctrl.disableSaveButton = true;
			if(ctrl.data.length > 0){
				DS.create('create-direct-deposit', data).then(function (results) {
					ctrl.disableSaveButton = false;
					SharedDataService.getAppSharedData().isDDLoaded = true;
					$state.go('app.main.money.direct-deposit',{}, { reload: true });
					ctrl.showFullSpinner = false;
				}).catch(function(error) {
					ctrl.disableSaveButton = false;
					ctrl.errorAlert = utilService.getErrorMessages(error.data);
					ctrl.showFullSpinner = false;
				});
			}else{
				DS.destroy('delete-direct-deposit','',{ headers: { 'Content-Type': 'application/json;charset=UTF-8'},params: {
					effectiveDate: ctrl.effDate
				}}).then(function (results) {
					ctrl.disableSaveButton = false;
					SharedDataService.getAppSharedData().isDDLoaded = true;
					$state.go('app.main.money.direct-deposit',{}, { reload: true });
					ctrl.showFullSpinner = false;
				}).catch(function(error) {
					ctrl.disableSaveButton = false;
					ctrl.errorAlert = utilService.getErrorMessages(error.data);
					ctrl.showFullSpinner = false;
				});
			}

		}else{
			var customIdAlert = {
				_statusCode: '400',
				_statusMessage: $filter('translate')('pageValidationMessage')
			};
			ctrl.errorAlert = customIdAlert;
		}

	};

	ctrl.onDateChange = function(date){
		var selectedDate = gso.getUtilService().filterDate(new Date(date),constants.dateFormat);
		var invalidDate = gso.getUtilService().checkTwoDates(ctrl.eligibility.minEffectiveDate, selectedDate);

		if(ctrl.datesArray.length > 1 && !invalidDate) {
			ctrl.populateData(date);
		}
	}


	ctrl.populateData = function (item) {
		ctrl.selectedEffectiveDate = gso.getUtilService().filterDate(new Date(item),constants.dateFormat);
		ctrl.data = ctrl.totalAccounts["Effective " + gso.getUtilService().filterDate(new Date(item),constants.dateFormatUS)];

		if(!ctrl.data) {
			var effectiveDate = new Date(ctrl.selectedEffectiveDate);
			var accounts = [];

			var keepGoing = true;
			angular.forEach(ctrl.datesArray, function (value, key) {
				if(keepGoing) {
					var hasFutureDate = gso.getUtilService().checkTwoDates(value, ctrl.selectedEffectiveDate);
					if (hasFutureDate) {
						keepGoing = false;
						var effKey = Object.keys(ctrl.totalAccounts)[key - 1];
						if (effKey) {
							ctrl.data = ctrl.totalAccounts[effKey];
						}
						else {
							ctrl.data = ctrl.totalAccounts['Currently Effective'];
						}
					}
				}
			});

			if(keepGoing){
				var effectiveKey =  Object.keys(ctrl.totalAccounts)[Object.keys(ctrl.totalAccounts).length - 1];
				ctrl.data = ctrl.totalAccounts[effectiveKey];
			}
		}
		populateObject(ctrl.data,ctrl.lastPayCheckAmount);
		ctrl.reloadAccounts();
	};

	function populateObject(data, lastPaycheckAmount) {
		var remPayCheck = 0;
		angular.forEach(data, function (input) {
			if (typeof input.amount !== 'undefined' && input.amount !== null && input.amount !== '' && !input.netBalance) {
				input.amountType = 'dollar';
				input.remAmount = parseFloat(input.amount);
				remPayCheck = angular.extend(lastPaycheckAmount - input.remAmount);
				lastPaycheckAmount = parseFloat(lastPaycheckAmount) - parseFloat(input.remAmount);
				input.payCheck = remPayCheck;
				input.actualAmount = '';
			} else if (typeof input.percent !== 'undefined' && input.percent !== null && input.percent !== ''  && !input.netBalance) {
				input.amountType = 'percentage';
				lastPaycheckAmount = parseFloat(lastPaycheckAmount).toFixed(2);
				input.percAmout = lastPaycheckAmount < 0 ? 0.00 : lastPaycheckAmount;
				input.remAmount =  parseFloat(((input.percent / 100) * lastPaycheckAmount).toFixed(2)) < 0 ?  0.00 :  parseFloat(((input.percent / 100) * lastPaycheckAmount).toFixed(2));
				remPayCheck = lastPaycheckAmount = angular.extend(lastPaycheckAmount - parseFloat((input.remAmount.toFixed(2))));
				input.payCheck = parseFloat(remPayCheck.toFixed(2));
				input.actualAmount = input.percent +'% of '+ $filter('currency')(input.percAmout);
			} else{
				input.payCheck = input.remAmount =  parseFloat(lastPaycheckAmount).toFixed(2) < 0 ? 0.00 : lastPaycheckAmount;
				ctrl.remainingAmount = parseFloat(lastPaycheckAmount.toFixed(2));
				input.amountType = null;
				input.amount = null;
				input.actualAmount = data.length === 1 ? $filter('translate')('money.direct_deposit.full_amount'): $filter('translate')('money.direct_deposit.remaining_account');
			}
		});
	}

	ctrl.reloadAccounts = function(){
		$state.go('app.main.money.edit-account',{data : {accounts : ctrl.data,paychecks:ctrl.paychecks,remainingAmount : ctrl.remainingAmount,effectiveDate: ctrl.selectedEffectiveDate,eligibility:ctrl.eligibility,totalAccounts:ctrl.totalAccounts,lastPayCheckAmount:ctrl.lastPaycheckAmount}});
	};

}
