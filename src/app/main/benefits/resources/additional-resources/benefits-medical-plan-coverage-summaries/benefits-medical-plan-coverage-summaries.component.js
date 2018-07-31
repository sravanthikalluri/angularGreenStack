'use strict';

require('./benefits-medical-plan-coverage-summaries.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/benefits-medical-plan-coverage-summaries/benefits-medical-plan-coverage-summaries.component.html',
	controller: ['DS','$uibModal', 'imageConfig',BenefitsMedicalPlanCoverageSummaries],
	bindings: {
		selectItem: '<',
		index:'<',
		resourceName:'<',
		response:'<'
	}
};
/* @ngInject */
function BenefitsMedicalPlanCoverageSummaries(DS,$uibModal, imageConfig) {
	var ctrl = this;

	ctrl.error = null;

	ctrl.$onInit = function() {
			var response = ctrl.response;
			ctrl.summaryPlanPdfData = response.benefitsSummaryPlan;
			ctrl.getPdfLink = function (num) {
				return new Array(num);
			};
			ctrl.visionData = response.benefitsSummaryPlan.vision;
			ctrl.lifeData = response.benefitsSummaryPlan.life;
			ctrl.dentalData = response.benefitsSummaryPlan.dental;
			ctrl.disability = response.benefitsSummaryPlan.disability;
			ctrl.medicalData = response.benefitsSummaryPlan.medical;
			ctrl.criticalIllnessData = response.benefitsSummaryPlan.criticalIllness;
			ctrl.legalServicesData = response.benefitsSummaryPlan.legalServices;
			ctrl.flexibleSpendingAmountsData = response.benefitsSummaryPlan.flexibleSpendingAccounts;
			if(response.benefitsSummaryPlan.employeeAssistancePlan){
				ctrl.employeeAssistancePlan = response.benefitsSummaryPlan.employeeAssistancePlan[0].sub[0].subpanes;
			}
			ctrl.atenaPopUp(ctrl.index,'medical','sbc');
			ctrl.atenaPopUp(ctrl.index,'dental','sbc');
			ctrl.atenaPopUp(ctrl.index,'vision','sbc');
			ctrl.atenaPopUp(ctrl.index,'life','sbc');
			ctrl.atenaPopUp(ctrl.index,'disability','sbc');
			ctrl.atenaPopUp(ctrl.index,'flexibleSpendingAccounts','sbc');
			ctrl.atenaPopUp(ctrl.index,'legalServices','sbc');
			ctrl.atenaPopUp(ctrl.index,'criticalIllness','sbc');
	};

	function getPlanData(plan){
		var planData;
		if(plan){
			plan.map(function (data) {
				data.text === ctrl.resourceName ? planData = data : angular.noop();
			});
			return planData;
		}	
	}
	
	ctrl.atenaPopUp = function (index, type, sbc) {
		if (type === 'medical') {
			ctrl.planData = getPlanData(ctrl.medicalData);
			ctrl.planData ? ctrl.planName = ctrl.planData.text : angular.noop();
			ctrl.planType = 'Medical';
			ctrl.sbcValue = sbc;
			ctrl.medicalDataForModal = {
				planData: ctrl.planData,
				planName: ctrl.planName,
				planType: ctrl.planType,
				summaryPlanPdfData: ctrl.summaryPlanPdfData,
				sbcValue: ctrl.sbcValue
			};
		}
		else if (type === 'vision') {
			ctrl.planData = getPlanData(ctrl.visionData);
			ctrl.planData ? ctrl.planName = ctrl.planData.text : angular.noop();
			ctrl.planType = 'Vision';
			ctrl.sbcValue = sbc;
			ctrl.visionDataForModal = {
				planData: ctrl.planData,
				planName: ctrl.planName,
				planType: ctrl.planType,
				summaryPlanPdfData: ctrl.summaryPlanPdfData,
				sbcValue: ctrl.sbcValue
			};
		}
		else if (type === 'life') {
			ctrl.planData = getPlanData(ctrl.lifeData);
			ctrl.planData ? ctrl.planName = ctrl.planData.text : angular.noop();
			ctrl.planType = 'Life';
			ctrl.sbcValue = sbc;
			ctrl.lifeDataForModal = {
				planData: ctrl.planData,
				planName: ctrl.planName,
				planType: ctrl.planType,
				summaryPlanPdfData: ctrl.summaryPlanPdfData,
				sbcValue: ctrl.sbcValue
			};
		}
		else if (type === 'dental') {
			ctrl.planData = getPlanData(ctrl.dentalData);
			ctrl.planData ? ctrl.planName = ctrl.planData.text : angular.noop();
			ctrl.planType = 'Dental';
			ctrl.sbcValue = sbc;
			ctrl.dentalDataForModal = {
				planData: ctrl.planData,
				planName: ctrl.planName,
				planType: ctrl.planType,
				summaryPlanPdfData: ctrl.summaryPlanPdfData,
				sbcValue: ctrl.sbcValue
			};
		} else if (type === 'disability') {
			ctrl.planData = getPlanData(ctrl.disability);
			ctrl.planData ? ctrl.planName = ctrl.planData.text : angular.noop();
			ctrl.planType = 'Disability';
			ctrl.sbcValue = sbc;
			ctrl.disabilityDataForModal = {
				planData: ctrl.planData,
				planName: ctrl.planName,
				planType: ctrl.planType,
				summaryPlanPdfData: ctrl.summaryPlanPdfData,
				sbcValue: ctrl.sbcValue
			};
		} else if (type === 'criticalIllness') {
			ctrl.planData = getPlanData(ctrl.criticalIllnessData);
			ctrl.planData ? ctrl.planName = ctrl.planData.text : angular.noop();
			ctrl.planType = 'Critical Illness';
			ctrl.sbcValue = sbc;
			ctrl.criticalIllnessDataForModal = {
				planData: ctrl.planData,
				planName: ctrl.planName,
				planType: ctrl.planType,
				summaryPlanPdfData: ctrl.summaryPlanPdfData,
				sbcValue: ctrl.sbcValue
			};
		} else if (type === 'legalServices') {
			ctrl.planData = getPlanData(ctrl.legalServicesData);
			ctrl.planData ? ctrl.planName = ctrl.planData.text : angular.noop();
			ctrl.planType = 'Legal Services';
			ctrl.sbcValue = sbc;
			ctrl.legalDataForModal = {
				planData: ctrl.planData,
				planName: ctrl.planName,
				planType: ctrl.planType,
				summaryPlanPdfData: ctrl.summaryPlanPdfData,
				sbcValue: ctrl.sbcValue
			};
		} else if (type === 'flexibleSpendingAccounts') {
			ctrl.planData = getPlanData(ctrl.flexibleSpendingAmountsData);
			ctrl.planData ? ctrl.planName = ctrl.planData.text : angular.noop();
			ctrl.planType = 'Flexible Spending Accounts';
			ctrl.sbcValue = sbc;
			ctrl.fsaDataForModal = {
				planData: ctrl.planData,
				planName: ctrl.planName,
				planType: ctrl.planType,
				summaryPlanPdfData: ctrl.summaryPlanPdfData,
				sbcValue: ctrl.sbcValue
			};
		}
		
		//ctrl.openModal();
	};


	ctrl.openModal = function(data,dataForModal) {

		$uibModal.open({
				animation: true,
				template: '<summary-modal></summary-modal>',
				component: 'summaryModal',
				controllerAs: 'ctrl',
				windowClass: 'benefits-modal-dialog',
				resolve: {
					modalData: function() {
						return dataForModal;
					},
					modalObject:function () {
						return data;
					}
				}
			}
		)
	};

	ctrl.bindImgUrl = function (data) {
		var imageUrl = imageConfig.images[data];
		return imageUrl;
	};


}
