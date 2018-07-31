'use strict';

require('./existing-account.component.scss');

module.exports = {
	templateUrl: 'app/main/money/direct-deposit/existing-account/existing-account.component.html',
	controller: ['$state','$filter','utilService','constants', 'gso', ExistingAccountController],
	bindings: {
		totalAccounts : '<',
		paychecks : '<',
		eligibility:'<'
	}
};

/* @ngInject */
function ExistingAccountController($state,$filter,utilService,constants, gso) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		ctrl.lastPaycheckAmount = utilService.getLastPaycheckAmount(ctrl.paychecks);

		if (Object.keys(ctrl.totalAccounts).length  === 0 ) {
			ctrl.data = [];
		}
		else{
			ctrl.selectedEffectiveDate =  Object.keys(ctrl.totalAccounts)[0];
			ctrl.data = ctrl.totalAccounts[ctrl.selectedEffectiveDate];
		}

		populateObject(ctrl.data,ctrl.lastPaycheckAmount);
		ctrl.showSpinner = false;
	};

	/**
	 * populate the data method
	 */

	ctrl.populateData = function (item) {
		ctrl.selectedEffectiveDate = item;
		ctrl.data = ctrl.totalAccounts[item];
		populateObject(ctrl.data,ctrl.lastPaycheckAmount);
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

	ctrl.editAccount = function(item){
		ctrl.effectiveDate = ctrl.eligibility.minEffectiveDate;
		if(item === constants.currentlyEffective){
			if(Object.keys(ctrl.totalAccounts).length  > 1){
				ctrl.futureEffectiveDate =  Object.keys(ctrl.totalAccounts)[1];
				if(ctrl.totalAccounts[ctrl.futureEffectiveDate][0].effectiveDate === ctrl.effectiveDate){
					ctrl.data = ctrl.totalAccounts[ctrl.futureEffectiveDate];
					populateObject(ctrl.data,ctrl.lastPaycheckAmount);
				}
			}
		}
		else{
			var effArray =  item.split(' ');
			ctrl.effectiveDate = effArray[1];
			ctrl.effectiveDate = gso.getUtilService().filterDate(new Date(ctrl.effectiveDate), constants.dateFormat);
		}

		$state.go('app.main.money.edit-account',{data : {accounts : ctrl.data,paychecks:ctrl.paychecks,remainingAmount : ctrl.remainingAmount,effectiveDate: ctrl.effectiveDate,eligibility:ctrl.eligibility,totalAccounts:ctrl.totalAccounts}});

	};


}
