'use strict';

require('./tn-benefits-forms-item.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/tn-benefits-forms-item/tn-benefits-forms-item.component.html',
	bindings:{
		benefitFormItem: '<',
		index:'<'
	},
	controller: ['imageConfig','carrierUrlConfig','DS',BenefitFormItemController]
};
/* @ngInject */
function BenefitFormItemController(imageConfig,carrierUrlConfig,DS){
	var ctrl = this;
	ctrl.indexId = ctrl.index;

	ctrl.$onInit = function(){
		ctrl.benefitFormItem.isOpen = false;
		DS.find('benefits-summary-plan','').then(function(response) {
			ctrl.summaryPlanData = response;
		});
	};


	ctrl.bindImgUrl = function (data) {
		var imageUrl = imageConfig.images[data];
		return imageUrl;
	};
	ctrl.bindUrl = function (data) {
		var url = carrierUrlConfig.url[data];
		return url;
	};
	ctrl.carrierlist =[
		{ id: 0, resourceName: 'Plan Coverage Summaries', isOpen: false, hideOthersOnExpand: true},
		{ id: 1, resourceName: 'In-Depth Plan Description', isOpen: false, hideOthersOnExpand: false},
		{ id: 2, resourceName: 'Forms', isOpen: false, hideOthersOnExpand: false}
		];
	ctrl.showFormSection = '';
	ctrl.setResourceItem = function(index){

		if (ctrl.carrierlist[index].isOpen){
			ctrl.closeAll();
			ctrl.showAll = true;
		}
		else{
			ctrl.carrierlist = ctrl.carrierlist.map(function(item){
				return {
					id: item.id,
					isOpen: item.id === index ? true : false,
					resourceName: item.resourceName,
					hideOthersOnExpand: item.hideOthersOnExpand
				}
			});
			ctrl.currentResourcesItem = ' > ' + ctrl.carrierlist[index].resourceName;
			ctrl.showIndex = index;

			ctrl.showAll = !ctrl.carrierlist[index].hideOthersOnExpand;
		}
	};
	ctrl.closeAll = function(){
		ctrl.carrierlist = ctrl.carrierlist.map(function(item){
			return {
				id: item.id,
				isOpen: false,
				resourceName: item.resourceName,
				hideOthersOnExpand: item.hideOthersOnExpand
			}
		});
		ctrl.currentResourcesItem = '';
	};

	ctrl.toggleCarriersList = function(index){
		ctrl.carrierlist[index].isOpen = !ctrl.carrierlist[index].isOpen;
		if(ctrl.carrierlist[index].isOpen){
			angular.forEach(ctrl.carrierlist, function(value, key){
				if(value.id !== index){
					value.isOpen = false;
				}
			});
		}
};

}
