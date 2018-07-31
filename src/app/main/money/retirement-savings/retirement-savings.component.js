'use strict';

require('./retirement-savings.component.scss');

module.exports = {
	templateUrl: 'app/main/money/retirement-savings/retirement-savings.component.html',
	controller: ['DS', 'RetirementSavingsDataService', '$window', 'SharedDataService','companyNameService', RetirementSavingsController]
};

/* @ngInject */
function RetirementSavingsController(DS,RetirementSavingsDataService,$window, SharedDataService,companyNameService) {
	var ctrl = this;
	ctrl.ssoUrl = '';
	ctrl.disableButton = true;
	ctrl.isIra = false;
	ctrl.$onInit = function () {
		ctrl.column_names = [
			{
				'name': 'Effective Date',
				'class': 'date'
			},
			{
				'name': 'Plan Type',
				'class': 'plan'
			},
			{
				'name': 'Status',
				'class': 'election'
			},
			{
				'name': 'Payroll Deduction',
				'class': 'payroll'
			},
			{
				'name': 'Annual Maximum/Goal',
				'class': 'amount-allowed'
			}
		];

		var peoId = companyNameService.getPeoId();

		RetirementSavingsDataService.fetchAllRetirementSavingsDetails().then(function (results) {
			ctrl.data = results.data;

			ctrl.isAMBMep  = false;
			ctrl.isPASMep  = false;
			ctrl.isPASSep  = false;
			ctrl.isPASMepEnrolled  = false;
			var planArray = ["SLAVIC","PLNRIGHT","TRANSA"];

			if(ctrl.data.vendorPlan.length > 0) {

				var keepGoing = true;
				angular.forEach(ctrl.data.vendorPlan, function (item, index) {
					if (keepGoing) {
						var result = planArray.filter(function (d) {
							return d === item.vendorId
						});
						if (result.length > 0) {
							keepGoing = false;
							if (!ctrl.data.contributions) {
								ctrl.isPASMepEnrolled = true;
								ctrl.disableButton = false;
							}
							else {
								ctrl.isPASMep = true;
								ctrl.disableButton = false;
							}
						}
					}
				});


				var isHavingMasMutual = ctrl.data.vendorPlan.filter(function (d) {
					return d.vendorId === 'MASSMU'
				});
				if (!ctrl.data.contributions) {
					if (isHavingMasMutual.length > 0 && !ctrl.isPASMepEnrolled) {
						ctrl.isAMBMep = true;
						ctrl.disableButton = false;
					}
					else if (!ctrl.isAMBMep && !ctrl.isPASMepEnrolled) {
						ctrl.isPASSep = true;
						ctrl.disableButton = true;
					}
				}
				else {
					if (isHavingMasMutual.length > 0  && !ctrl.isPASMep) {
						ctrl.isAMBMep = true;
						ctrl.disableButton = false;
					}
					else if (!ctrl.isAMBMep && !ctrl.isPASMep) {
						ctrl.isPASSep = true;
						ctrl.disableButton = true;
					}
				}
			}


			if(SharedDataService.getAppSharedData().isSetGoal){
				ctrl.data['isSetGoal'] = true;
			}else{
				ctrl.data['isSetGoal'] = false;
			}


			console.log(ctrl.data);
		});
		/*DS.find('retirement-savings','').then(function(results){
			ctrl.data = results.data;

		});*/
		DS.find('sso-retirement-savings','').then(function(results){
			var Tempdata = results.ssoRetirementSavingsData.filter(
				function(r) {
					var records = results.ssoRetirementSavingsData;
					for(var i=0;i<=records.length; i++){
						if(records[i] && Object.keys(records[i]).indexOf("ssoName") > -1){
							if(records[i].ssoName ==='Aspire WSE' && records[i].authorized ===true){
								ctrl.isIra = true;
							}
						}
					}
					return (r.authorized?r.authorized:false) && (r.ssoWidgetUrl?r.ssoWidgetUrl:false) && r.ssoWidgetUrl.trim();
				}
			);
			ctrl.ssoUrl = Tempdata[0]? Tempdata[0].ssoWidgetUrl:'';
			if (ctrl.ssoUrl != ''){
				ctrl.disableButton = false;
			}
		});
	};

	ctrl.modal =function(contribution){
		ctrl.contribution = contribution;
		ctrl.federalAmount = ctrl.data.federalAmount;
		ctrl.showModal = true;
	}

    // TODO: To close the banner alert.
	 ctrl.closeAlert = function() {
		  ctrl.errorMessage=null;
	 };

	ctrl.reDirect=function()
	{
		$window.open(ctrl.ssoUrl, '_blank');

	}
}
