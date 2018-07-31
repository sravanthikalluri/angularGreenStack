'use strict';

require('./retirement-savings-modal.component.scss');

module.exports = {
	templateUrl: 'app/main/money/retirement-savings/retirement-savings-modal/retirement-savings-modal.component.html',
	controller: ['DS','$filter','gso','moment', 'SharedDataService', RetirementSavingsModalController],
	bindings: {
		show: '=',
		data: '=',
		federalAmount :'<'
	}
};

/* @ngInject */
function RetirementSavingsModalController(DS,$filter,gso,moment, SharedDataService) {
	var ctrl = this;
	ctrl.selectedType = 'federal';
	ctrl.savingsData = { };
	ctrl.$onInit = function () {
		ctrl.savingsData['federalAmount'] = ctrl.federalAmount;

		ctrl.savingsData.priorContributions = 0;
		if (SharedDataService.getAppSharedData().isSetGoal) {
			if (SharedDataService.getAppSharedData().setGoalAmount) {
				ctrl.goalAmount = parseFloat(SharedDataService.getAppSharedData().setGoalAmount);
			} else {
				ctrl.goalAmount = '';
			}

			ctrl.radioClickFn('goal');
		}else{
			if (SharedDataService.getAppSharedData().setPriorAmount) {
				ctrl.savingsData.priorContributions = parseFloat(SharedDataService.getAppSharedData().setPriorAmount);
			} else {
				ctrl.savingsData.priorContributions = 0;
			}
			ctrl.radioClickFn('federal');
		}

		ctrl.maximumContribution = getMaximumContribution(ctrl.savingsData.federalAmount, ctrl.savingsData.priorContributions);
	};

	ctrl.closeModal = function(){
		ctrl.show = false;
	}
	ctrl.radioClickFn = function(type){
		ctrl.selectedType = type;
		ctrl.setGoal = '';
		ctrl.maximumContribution = getMaximumContribution(ctrl.savingsData.federalAmount, ctrl.savingsData.priorContributions);
	}
	ctrl.goalChangeFn = function(goalAmount){
		ctrl.goalAmount = goalAmount;
	}

	ctrl.priorChangeFn = function(priorAmount){
		var changeAmount = getMaximumContribution(ctrl.savingsData.federalAmount,priorAmount);
		if (changeAmount >= 0) {
			ctrl.maximumContribution = parseFloat(changeAmount).toFixed(2);
		}else{
			ctrl.maximumContribution = 0;
		}

		ctrl.savingsData.priorContributions = priorAmount;

	}
	ctrl.saveMethod = function (formName) {
		if(formName.$valid) {
			var goalAmount = ctrl.maximumContribution;

			if (ctrl.selectedType === 'goal') {
				goalAmount = ctrl.goalAmount;
			}
			var retirementPlanObject = {
				goalAmount: goalAmount,
				employeeId: gso.getAppConfig().userId,
				company: gso.getAppConfig().companyId,
				calendarYear:  moment().year()
			};

			DS.update('update-retirement-savings', '', retirementPlanObject).then(function (results) {
				console.log('results are : ', results);

				ctrl.data.contributions.map(function(item){
					item.details.goalAmount = goalAmount;
				});

				if (ctrl.selectedType === 'goal') {
					SharedDataService.getAppSharedData().isSetGoal = true;
					SharedDataService.getAppSharedData().setGoalAmount = goalAmount;
					ctrl.data.isSetGoal = true;
				} else {
					SharedDataService.getAppSharedData().isSetGoal = false;
					SharedDataService.getAppSharedData().setPriorAmount = ctrl.savingsData.priorContributions;
					ctrl.data.isSetGoal = false;
				}
				ctrl.show = false;

				ctrl.data.errorAlert = results.response;

			}).catch(function (error) {
				ctrl.errorAlert=error.data;
			});
		}else{
			var customIdAlert = {
				_statusCode: '400',
				_statusMessage: $filter('translate')('pageValidationMessage')
			};
			ctrl.errorAlert = customIdAlert;

		}

	}

	function getMaximumContribution(federalAmount,priorContributions){
		return federalAmount - priorContributions;
	}

}
