'use strict';

require('./w4-card.component.scss');

module.exports = {
	template: require('./w4-card.component.html'),
	controller: ['taxWithholdings', 'taxWithholdingForm', 'taxWithholdingUrls', '$uibModal','constants','moment','utilService','gso',W4CardController]
};

/* @ngInject */
function W4CardController(taxWithholdings, taxWithholdingForm, taxWithholdingUrls, $uibModal,constants,moment,utilService,gso) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.dateMenuObject = [];
		taxWithholdings
			.fetch()
			.then(ctrl.initCard);
	};

	ctrl.initCard = function(data) {
		ctrl.irsCalculatorUrl = taxWithholdingUrls.irsCalculator;
		ctrl.taxWithholdings = data.taxWithholdings;
		ctrl.selectedEffectiveDate = constants.currentlyEffective;
		angular.forEach(ctrl.taxWithholdings,function(taxWithHoldingData,index){

			var currentDate = gso.getUtilService().filterDate(new Date(),constants.dateFormat);
			var isValidCurrentDate = gso.getUtilService().checkTwoDates(currentDate, taxWithHoldingData.effectiveDate);

			if(index === 0 && isValidCurrentDate){
				ctrl.dateMenuObject.push(constants.currentlyEffective);
			}else{
				ctrl.dateMenuObject.push(constants.effective+''+ moment(taxWithHoldingData.effectiveDate, "YYYY-MM-DD").format('MM/DD/YYYY'));
				if(index === 0){
					ctrl.selectedEffectiveDate =ctrl.dateMenuObject[0];
				}
			}
		});

		ctrl.selectedTaxWithholding = ctrl.taxWithholdings[0];

		ctrl.getTaxForm(ctrl.selectedTaxWithholding);
	};

	ctrl.taxWithHoldingDataDisplay = function (selectedEffectiveDate) {
		 var index = ctrl.dateMenuObject.indexOf(selectedEffectiveDate);
		ctrl.selectedTaxWithholding = ctrl.taxWithholdings[index];
		ctrl.getTaxForm(ctrl.selectedTaxWithholding);

	};

	ctrl.getTaxForm = function(tax) {
		if (tax) {
			taxWithholdingForm
				.fetch(tax)
				.then(function(data) {
					ctrl.taxForm = data;
				});
		}

	};

	ctrl.edit = function() {
		var effectiveDate = moment(utilService.filterCurrentEffectiveDate(), "YYYY-MM-DD").format('MM/DD/YYYY');
		if(ctrl.selectedEffectiveDate  !== constants.currentlyEffective){
			var effArray =  ctrl.selectedEffectiveDate.split(' ');
			effectiveDate = effArray[1];
		}

		ctrl.taxForm.effectiveDate = effectiveDate;

		ctrl.prompt(ctrl.taxForm)
			.then(ctrl.$onInit)
			.catch(function() {});
	};

	ctrl.prompt = function(data) {
		var modal = $uibModal.open({
			template  : '<w4-modal></w4-modal>',
			component : 'w4Modal',
			windowClass : 'w4Modal-tax',
			backdrop: 'static',
			resolve   : {
				data: function() { return angular.merge({}, ctrl.taxForm); }
			}
		});

		return modal.result;
	};
}
