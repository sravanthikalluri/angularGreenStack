'use strict';

require('./last-paycheck-card.component.scss');

module.exports = {
	templateUrl: 'app/main/money/last-paycheck-card/last-paycheck-card.component.html',
	controller: ['PaycheckDataService','$timeout',LastPaycheckCardController],
	bindings:{
		small: '<?',
		btnClick: '&'
	}
};

/* @ngInject */
function LastPaycheckCardController(PaycheckDataService,$timeout) {
	var ctrl = this;
	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		PaycheckDataService.fetchAllPaychecksWithDetails().then(function(result) {
			if(!result._error){
				var payCheckId = result.checkSummaries[0].id; //TODO: Find latest paycheck;

				PaycheckDataService.fetchAllPaycheckDetails(payCheckId).then(function(result) {
					ctrl.paycheckDetails = result[0]; //TODO: Find latest paycheck;
				});
			}else{
				ctrl.errorMessage = result._error.message;
			}

			ctrl.showSpinner = false;

		});

	};

	ctrl.btnClick = function(){
		ctrl.showModal = true;
	}
}
