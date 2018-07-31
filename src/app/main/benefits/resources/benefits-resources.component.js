'use strict';


require('./benefits-resources.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/benefits-resources.component.html',
	controller: ['$window', 'gso','DS','$stateParams',BenefitsResourcesController]
};

/* @ngInject */
function BenefitsResourcesController($window, gso,DS,$stateParams) {
	var ctrl = this;
	ctrl.planCarriersCtrldocMeta = [];
	ctrl.planCarriersCtrlGeneral = [];
	ctrl.countryCode = gso.getAppConfig().countryCode;
	ctrl.hideGeneralForm = false;
	if(gso.getAppConfig().peoId === 'AMB'){
		ctrl.hideGeneralForm = true;
	}
	ctrl.employmentStatus = gso.getAppConfig().empStatus;
	ctrl.$onInit = function(){
		ctrl.showSpinner = true;
		ctrl.showWhatChaning = false;
		ctrl.showTrinetForm = false;
		ctrl.isAmbrose =  (gso.getAppConfig().peoId === 'AMB') ? true : false;
		if($stateParams.response){
			ctrl.lableVaule = $stateParams.response;
			ctrl.resourcesItems.map(function(value){
				if(value.resourceName === ctrl.lableVaule){
					value.isOpen = true;
				}
			});
		}
		if(ctrl.employmentStatus !== 'T' && gso.getAppConfig().countryCode !== 'CA'){
			DS.find('benefits-plans-carriers','').then(function(results) {
				ctrl.planCarriersCtrldocMeta = results.planCarriersCtrldocMeta;
				ctrl.planCarriersCtrlGeneral = results.planCarriersCtrlGeneral;
				ctrl.showSpinner=false;
				ctrl.planCarriersCtrldocMeta.map(function (value) {
					ctrl.resourcesItems.map(function(item){
						if(value.title === item.resourceName) {
							item.isShow = true;
							item.planCarrier = value;
							if(item.resourceName === "Plan Costs" && gso.getAppConfig().peoId ==='AMB'){
								item.isShow = false;
							}
						}
						if(value.title === "Summary of Medical Plan Changes" &&  item.resourceName==="What’s Changing"){
							item.isShow = true;
							item.planCarrier = value;
						}
					});
				});
				ctrl.planCarriers = ctrl.resourcesItems;
			}).catch(function(err) {
				ctrl.showSpinner=false;
				ctrl.error = err;
				ctrl.errorMessage = err.data._error.message;
			});
		}
	};

	ctrl.isActiveEmployee = true;
	ctrl.isCanadian = false;
	if (ctrl.employmentStatus === 'T') {
		DS.find('benefit-resources','').then(function(results) {
			ctrl.benefitResources = results.benefitResources;
			ctrl.showSpinner = false;
		}).catch(function(err) {
			ctrl.error = err;
			ctrl.errorMessage = err.data._error.message;
			ctrl.showSpinner = false;
		});
		ctrl.isActiveEmployee = false;
	}
	if(gso.getAppConfig().countryCode === 'CA'){
		ctrl.isCanadian = true;
		ctrl.resourcesItems = [
			{ id: 0, resourceName: 'Benefits Guidebook', isOpen: false, hideOthersOnExpand: false},
			{ id: 1, resourceName: 'Benefits Summary', isOpen: false, hideOthersOnExpand:false},
			{ id: 2, resourceName: 'Benefits Forms', isOpen: false, hideOthersOnExpand:false}
			];
		DS.find('formsService','/forms?countryCode=' + ctrl.countryCode +'&formType=benefitForms').then(function (result) {
			ctrl.benefitForms = result.formsDetails.employeeForm;
		}).catch(function(error){
			ctrl.errorMessage = error.data._error.message;
		});

	}else if(ctrl.employmentStatus === 'T'){
		ctrl.resourcesItems = [
			{ id: 0, resourceName: 'Benefits Guidebook', isOpen: false, hideOthersOnExpand:false},
			{ id: 1, resourceName: 'Benefits Carrier Contact Information', isOpen: false, hideOthersOnExpand:false},
			{ id: 2, resourceName: 'Life and Disability Coverage', isOpen: false, hideOthersOnExpand: true},
			{ id: 3, resourceName: 'Flexible Spending Account', isOpen: false, hideOthersOnExpand: true},
			{ id: 4, resourceName: 'Life Status Change', isOpen: false, hideOthersOnExpand: true}
		];
	}else{
		ctrl.resourcesItems = [
			{ id: 0, resourceName: 'Benefit Options', isOpen: false, hideOthersOnExpand: true},
			{ id: 1, resourceName: 'TriNet Forms', isOpen: false, hideOthersOnExpand:false},
			{ id: 2, resourceName: 'What’s Changing', isOpen: false, hideOthersOnExpand:false},
			{ id: 3, resourceName: 'Benefits Guidebook', isOpen: false, hideOthersOnExpand:false},			
			{ id: 4, resourceName: 'Customized Comparison and Plan Details', isOpen: false, hideOthersOnExpand:false},
			{ id: 5, resourceName: 'Plan Costs', isOpen: false, hideOthersOnExpand:false}
			];
	}

	ctrl.showAll = true;

	ctrl.currentResourcesItem= '';

	ctrl.setResourceItem = function(index , value){
		if (ctrl.resourcesItems[index].isOpen){
			ctrl.closeAll();
			ctrl.showAll = true;
		}
		else{
			ctrl.resourcesItems = ctrl.resourcesItems.map(function(item){
			 	item.isOpen = item.id === index ? true : false;
			 	return item;
			});
			ctrl.currentResourcesItem = ' > ' + ctrl.resourcesItems[index].resourceName;
			ctrl.showIndex = index;

			ctrl.showAll = !ctrl.resourcesItems[index].hideOthersOnExpand;
		}
		ctrl.lableVaule = value;
	};
	ctrl.closeAll = function(){
		ctrl.resourcesItems = ctrl.resourcesItems.map(function(item){
			item.isOpen = false;
			return item;
		});
		ctrl.currentResourcesItem = '';
	};

	ctrl.openWin = function (url) {
		$window.open(url);
	};
}
