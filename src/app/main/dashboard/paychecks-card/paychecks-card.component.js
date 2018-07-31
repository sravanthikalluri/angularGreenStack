'use strict';

require('./paychecks-card.component.scss');

module.exports = {
	templateUrl: 'app/main/dashboard/paychecks-card/paychecks-card.component.html',
	controller: ['DS', 'PaycheckDataService', '$timeout','SharedDataService',PaychecksCardController]
}

/* @ngInject */
function PaychecksCardController(DS, PaycheckDataService, $timeout,SharedDataService) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.showSpinner=true;
		ctrl.showPayChecksSpinner = true;
		PaycheckDataService.fetchAllPaychecksWithDetails().then(function(result) {
			if(!result._error) {
				var payCheckId = result.checkSummaries[0].id;
				PaycheckDataService.fetchAllPaycheckDetails(payCheckId).then(function (result) {
					ctrl.checkDetails = result[0];
					ctrl.showPayChecksSpinner = false;
				});
			}else{
				ctrl.errorMessage = result._error.message;
			}
		});

		if (SharedDataService.getAppSharedData().payCheckBackUp){
			ctrl.payCheckData = SharedDataService.getAppSharedData().payCheckBackUp;
			ctrl.nextPaycheck = ctrl.payCheckData.nextCheckDt;
			ctrl.lastPaycheck = ctrl.payCheckData !== undefined ? ctrl.payCheckData.checkSummaries[0].checkDt : "";
		}
		else {
			DS.find('paychecks', '').then(function (results) {
				SharedDataService.getAppSharedData().payCheckBackUp = results;
				ctrl.nextPaycheck = results.nextCheckDt;
				ctrl.lastPaycheck = results.checkSummaries[0].checkDt ? results.checkSummaries[0].checkDt : "";
			}).catch(function(error) {
				ctrl.errorMessage = error.message;
			});
		}
	};

	ctrl.btnClick = function(){
		ctrl.showModal = true;
	};

	$timeout(function () {
		ctrl.showSpinner = false;
	}, 2000);

}
