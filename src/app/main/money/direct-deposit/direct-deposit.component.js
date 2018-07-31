'use strict';

require('./direct-deposit.component.scss');

module.exports = {
	templateUrl: 'app/main/money/direct-deposit/direct-deposit.component.html',
	controller: ['DirectDepositDataService', '$filter', '$rootScope', 'SharedDataService', DirectDepositController]
};

/* @ngInject */
function DirectDepositController(DirectDepositDataService,  $filter, $rootScope, SharedDataService ) {
	var ctrl = this;
	ctrl.noPreviousPaychecks = false;
	ctrl.havingAccounts = false;

	ctrl.$onInit = function() {
	   ctrl.showSpinner = true;
		if (SharedDataService.getAppSharedData().isDDLoaded) {
			SharedDataService.getAppSharedData().isDDLoaded = false;

			var customIdAlert = {
				_statusCode: '200',
				_statusMessage: $filter('translate')("money.direct_deposit.successSaveMsg")
			};
			ctrl.errorAlert = customIdAlert;
		}

		DirectDepositDataService.fetchAllDirectDepositAccountsWithDetails().then(function(results) {
			var accounts = results.accounts;
			if (Object.keys(accounts).length > 0){
				// we will have already marked this task complete ; uncomment this line when we implement Skip button for DD
				$rootScope.$emit("onboardingUpdateTask", {taskId: "DIRECT_DEPOSIT"});
			}
			ctrl.paychecks = results.paychecks;
			ctrl.eligibility = {fsaeligible:results.fsaeligible,apeligible: results.apeligible,minEffectiveDate:results.minEffectiveDate};

			if(ctrl.paychecks._error){
				ctrl.noPreviousPaychecks = true;
				noPaychecks(ctrl.paychecks._error.message);
			}
			if(results.accounts._error){
				ctrl.havingAccounts = true;
				noAccounts(results.accounts._error.message);
			}
			else {
			  	ctrl.totalAccounts = accounts;
				if (Object.keys(accounts).length  === 0 ) {
					ctrl.havingAccounts = false;
				}else{
					ctrl.havingAccounts = true;
				}
			}
			ctrl.showSpinner = false;
		});
	};

	function noPaychecks(message){
	  ctrl.noPreviousPaychecks = true;
	  ctrl.noPreviousPaychecksMsg = message;

	}

	function noAccounts(message){
	  ctrl.havingAccounts = false;
	  ctrl.noPreviousPaychecks = false;
	  ctrl.noPreviousPaychecksMsg = message;

	}


	ctrl.addAccount = function(){
		ctrl.showAddAccountModal = true;
	};


}
