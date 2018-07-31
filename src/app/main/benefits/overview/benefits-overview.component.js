'use strict';
require('./benefits-overview.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/overview/benefits-overview.component.html',
	controller: ['$rootScope', 'DS', 'gso', '$uibModal', BenefitsOverviewController]
};

/* @ngInject */
function BenefitsOverviewController($rootScope, DS, gso, $uibModal) {
	var ctrl = this;

	ctrl.$onInit = function () {
		ctrl.showSpinner = true;
		ctrl.showPopup = false;
		//Current Benefits
		DS.find('benefits-overview', '/current-benefits').then(function (result) {
			ctrl.benefits = result.benefits.filter(function (item) { return item.planType.charAt(0) !== '4' });
			ctrl.uhcPopupData = ctrl.benefits.filter(function (item) { return item.planInfo.providerName === 'UHC' });
			ctrl.dependents = result.dependents;
			ctrl.benefitsCards = result.benefitsCards;
			ctrl.guideBooks = result.guideBooks;			
			ctrl.show = true;								
			//Begin Best Doctors
			ctrl.isBestDoctors = false;
			if (gso.getAppConfig().peoId === 'AMB') {
				ctrl.benefits.filter(function (item) {
					if (item.planType === '10') {
						ctrl.isBestDoctors = true;
					}
				})
			} else if (gso.getAppConfig().companyId === '001') {
				ctrl.benefits.filter(function (item) {
					if (item.planType === 'A4') {						
						ctrl.isBestDoctors = true;
					}
				})
			}			
			if (ctrl.isBestDoctors) {				
				DS.find('benefits-best-doctors', '/best-doctors').then(function (result) {
					ctrl.bestDoctorsInfo = result.bestDoctorsInfo;				
				}).catch(function (error) {
					ctrl.errorStatus = error;	
				});
			}
			//End Best Doctors
			ctrl.showSpinner = false;
		}).catch(function (error) {
			ctrl.errorStatus = error.data._error.message;
			ctrl.showSpinner = false;
		});

		//Future Benefits
		DS.find('benefits-overview', '/current-future-benefits').then(function (result) {
			DS.find('benefits-overview', '/enrollmentDeadline').then(function (response) {
				ctrl.enrollBeginDt = response.enrollmentDeadline.enrollBeginDt;
				ctrl.enrollEndDt = response.enrollmentDeadline.enrollEndDt;
				ctrl.payBeginDt = response.enrollmentDeadline.planYearBeginDt;
				if (gso.getUtilService().todayBtnTwoDates(gso.getUtilService().filterCurrentDate(), ctrl.enrollBeginDt, ctrl.payBeginDt)) {
					ctrl.enableFutureBenefits = true;
					if ("Y" === response.enrollmentDeadline.systemDefaultedElection) {
						ctrl.futureBenefitDescriptionText = true;
					}
				}
			});
			ctrl.futureBenefits = result.benefits;
			ctrl.futureDependents = result.dependents;
			ctrl.showSpinner = false;
		});
	};
	ctrl.popUp = function () {
		ctrl.confirmData = {};
		//ctrl.confirmData.headerName= 'future-benefit-headerName';
		ctrl.confirmData.messsage = 'future-benefit-Detail-text';
		var modal = $uibModal.open({
			template: '<tn-future-modal></tn-future-modal>',
			component: 'tnFutureModal',
			resolve: {
				data: function () { return angular.merge({}, ctrl.confirmData); }
			}
		});
		return modal.result;
	}

	$rootScope.$on('UHCPopup',function(){
		ctrl.showPopup = true;
	});

}
