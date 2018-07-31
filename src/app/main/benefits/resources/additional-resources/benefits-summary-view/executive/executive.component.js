'use strict';

require('./executive.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/benefits-summary-view/executive/executive.component.html',
	controller: ['DS',ExecutiveController],
	bindings: {
		planData:'<',
		resolve: '<',
		modalInstance: '<',
		modalData: '<'
	}
};
/* @ngInject */
function ExecutiveController(DS) {
	var ctrl = this;

	ctrl.showResults = null;
	ctrl.executiveData = null;
	ctrl.planCode = ctrl.resolve.modalData.planCode;
	ctrl.planKey = ctrl.resolve.modalData.planKey;
	ctrl.planType = ctrl.resolve.modalData.planType;
	ctrl.startDate = ctrl.resolve.modalData.startDate;
	ctrl.endDate = ctrl.resolve.modalData.endDate;
	ctrl.fetchData = null;
	ctrl.dateList = {};
	ctrl.fetchData = function (planCode, planKey, planType) {

		if (planType === 'cop') {
			ctrl.planType = 'custom';
		}
		else if (planType === 'soap') {
			ctrl.planType = 'all';
		}

		var options = {
			params: {
				type: ctrl.planType,
				benefitPlanId: ctrl.planCode,
				payFrequency: ctrl.planKey,
				startDate: ctrl.startDate,
				endDate: ctrl.endDate
			}
		}

		console.log('options');
		console.log(options);

		ctrl.$onInit = function() {
			DS.find('benefits-executive-plan-details', '', options).then(function(response) {
				ctrl.executiveData = response.executiveData;
				ctrl.showResults = true;
			}).catch(function(err) {
				console.log(err);
			});
		};

	};

	ctrl.printSection = function () {
		var prtContent = document.getElementById('$ctrl.executiveData.idAttribute');
		if (prtContent) {
			var WinPrint = window.open('','left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
			WinPrint.document.write('<html><head><title>Print Plan Costs</title>');
			WinPrint.document.write('<link rel="stylesheet" href="./#/app/main/benefits/resources/additional-resources/benefits-summary-view/executive/executive.component.scss" media="print" type="text/css" />');
			WinPrint.document.write('</head><body >');
			WinPrint.document.write(prtContent.innerHTML);
			WinPrint.document.write('</body></html>');

			WinPrint.document.close();
			WinPrint.focus();
			WinPrint.print();
			WinPrint.close();
		}
	};

	if (ctrl.planCode !== null && ctrl.planKey !== null && ctrl.planType !== null) {
		ctrl.fetchData(ctrl.planCode, ctrl.planKey, ctrl.planType);
	}

	ctrl.closeModal = function(){
		ctrl.showModal = false;
		ctrl.modalInstance.dismiss("cancel");
		ctrl.modalInstance.close("cancel");
	}
}
