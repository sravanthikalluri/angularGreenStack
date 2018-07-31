'use strict';

require('./build-maintain-custom.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/benefits-summary-view/build-maintain-custom/build-maintain-custom.component.html',
	controller: ['DS','gso', 'sharedProperties', '$http',BuildMaintainCustomController],
	bindings: {
		planData:'<',
		resolve: '<',
		modalInstance: '<',
		programData:'<'
	}
};

/* @ngInject */
function BuildMaintainCustomController(DS,gso, sharedProperties, $http) {
	var ctrl = this;

	ctrl.buildmaintainData = null;
	ctrl.stateElements = null;
	ctrl.check = true;
	ctrl.checkedList = [];
	ctrl.showResults = false;
	ctrl.gettingResults = false;
	ctrl.benefitProgram = ctrl.resolve.programData.benefitProgram;
	ctrl.description = ctrl.resolve.programData.description;

	ctrl.$onInit = function () {
		DS.find('benefits-build-maintain-custom', '').then(function (response) {
				ctrl.buildmaintainData = response.benefitOptions;
				ctrl.stateElements = document.getElementsByClassName("states");
				ctrl.isChecked = function(state) {
					for (var i=0; i < ctrl.buildmaintainData.states.length; i++) {
						if (state.value === ctrl.buildmaintainData.states[i]) {
							ctrl.checkedList.push(ctrl.buildmaintainData.states[i])
							return true;
						}
					}
					return false;
				};
			},
			function (data) {
				ctrl.errorAlert = data;
			}).catch(function (err) {
				console.log(err);
			});
	};

	ctrl.addRemoveStates = function (stateValue){
		if (ctrl.checkedList.indexOf(stateValue) >= 0){
			ctrl.checkedList.pop(stateValue);
		}
		else {
			ctrl.checkedList.push(stateValue);
		}
	};

		ctrl.submitForm = function () {
		ctrl.gettingResults = true;
		var selectedDefinitions = ctrl.states.filter(function(def) {
			return def.checked;
		});

		selectedDefinitions.forEach( function (arrayItem) {
			if (arrayItem.checked) {
				ctrl.checkedList.push(arrayItem.value);
			}
		});

		var data = {};
		data.company = ctrl.buildmaintainData.company;
		data.states = ctrl.checkedList;
		data.payFrequency = ctrl.buildmaintainData.payFrequency;
		data = JSON.stringify(data);

		var res = $http({
			url: '/api-benefits/v1/benefit-plan/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/benefit-states',
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			data: data
		});

		res.success(function() {
			DS.find('benefits-summary-view-plans', '').then(function (response) {
					ctrl.payFrequencyData = response.benefitsSummaryViewPlans;
					ctrl.payFrequencyType = ctrl.payFrequencyData.employeePayFrequency;

					var options = {
						params: {
							type: 'custom',
							benefitPlanId: ctrl.benefitProgram,
							payFrequency: ctrl.payFrequencyType,
							startDate: ctrl.payFrequencyData.currentPlanStartDate,
							endDate: ctrl.payFrequencyData.currentPlanEndDate
						}
					}
					DS.find('benefits-executive-plan-details', '', options).then(function (response) {

							ctrl.statesBuildData = response.executiveData;;
							var data = {
								"data": ctrl.statesBuildData
							};
							ctrl.showFiled = sharedProperties.getStringValue();
							ctrl.benefitsDynamicfield = data.data[sharedProperties.getStringValue()];
							ctrl.gettingResults = false;
							ctrl.showResults = true;
						},
						function (data) {
							ctrl.errorAlert = data;
						}
					);
				},
				function (data) {
					ctrl.errorAlert = data;
				});
		});
		res.error(function(data, status, headers, config) {
			console.log( "failure message: " + JSON.stringify({data: data}));
		});
	};

	ctrl.printSection = function () {
		var prtContent = document.getElementById('$ctrl.statesBuildData.idAttribute');
		if (prtContent) {
			var WinPrint = window.open('','left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
			WinPrint.document.write('<html><head><title>Print Plan Costs</title>');
			WinPrint.document.write('<link rel="stylesheet" href="./#/app/main/benefits/resources/additional-resources/benefits-summary-view/build-maintain-custom/build-maintain-custom.component.scss" media="print" type="text/css" />');
			WinPrint.document.write('</head><body >');
			WinPrint.document.write(prtContent.innerHTML);
			WinPrint.document.write('</body></html>');

			WinPrint.document.close();
			WinPrint.focus();
			WinPrint.print();
			WinPrint.close();
		}
	};

	ctrl.closeModal = function () {
		ctrl.showModal = false;
		ctrl.modalInstance.dismiss("cancel");
		ctrl.modalInstance.close("cancel");
	};

	ctrl.states = [
		{id: 'stateAL', value:'AL', name: 'alabama', checked: false},
		{id: 'stateAK', value:'AK', name: 'alaska', checked: false},
		{id: 'stateAZ', value:'AZ', name: 'arizona', checked: false},
		{id: 'stateAR', value:'AR', name: 'arkansas', checked: false},
		{id: 'stateCAN', value:'CAN', name: 'california_northern', checked: false},
		{id: 'stateCAS', value:'CAS', name: 'california_southern', checked: false},
		{id: 'stateCO', value:'CO', name: 'colorado', checked: false},
		{id: 'stateCT', value:'CT', name: 'connecticut', checked: false},
		{id: 'stateDE', value:'DE', name: 'delaware', checked: false},
		{id: 'stateDC', value:'DC', name: 'district_columbia', checked: false},
		{id: 'stateFLC', value:'FLC', name: 'florida_central', checked: false},
		{id: 'stateFLN', value:'FLN', name: 'florida_north', checked: false},
		{id: 'stateFLS', value:'FLS', name: 'florida_south', checked: false},
		{id: 'stateGA', value:'GA', name: 'georgia', checked: false},
		{id: 'stateHI', value:'HI', name: 'hawaii', checked: false},
		{id: 'stateID', value: 'ID', name: 'idaho', checked: false},
		{id: 'stateIL', value:'IL', name: 'illinois', checked: false},
		{id: 'stateIN', value:'IN', name: 'indiana', checked: false},
		{id: 'stateIA', value:'IA', name: 'iowa', checked: false},
		{id: 'stateKS', value:'KS', name: 'kansas', checked: false},
		{id: 'stateKY', value:'KY', name: 'kentucky', checked: false},
		{id: 'stateLA', value:'LA', name: 'louisiana', checked: false},
		{id: 'stateMA', value:'MA', name: 'massachusetts', checked: false},
		{id: 'stateMI', value:'MI', name: 'michigan', checked: false},
		{id: 'stateMN', value:'MN', name: 'minnesota', checked: false},
		{id: 'stateMS', value:'MS', name: 'mississippi', checked: false},
		{id: 'stateMO', value:'MO', name: 'missouri', checked: false},
		{id: 'stateMT', value:'MT', name: 'montana', checked: false},
		{id: 'stateME', value:'ME', name: 'maine', checked: false},
		{id: 'stateMD', value:'MD', name: 'maryland', checked: false},
		{id: 'stateNE', value:'NE', name: 'nebraska', checked: false},
		{id: 'stateNV', value:'NV', name: 'nevada', checked: false},
		{id: 'stateNH', value:'NH', name: 'new_hampshire', checked: false},
		{id: 'stateNJ', value:'NJ', name: 'new_jersey', checked: false},
		{id: 'stateNM', value:'NM', name: 'new_mexico', checked: false},
		{id: 'stateNY', value:'NY', name: 'new_york', checked: false},
		{id: 'stateNC', value:'NC', name: 'north_carolina', checked: false},
		{id: 'stateND', value:'ND', name: 'north_dakota', checked: false},
		{id: 'stateOH', value:'OH', name: 'ohio', checked: false},
		{id: 'stateOK', value:'OK', name: 'oklahoma', checked: false},
		{id: 'stateOR', value:'OR', name: 'oregon', checked: false},
		{id: 'statePA', value:'PA', name: 'pennsylvania', checked: false},
		{id: 'statePR', value:'PR', name: 'puerto_rico', checked: false},
		{id: 'stateRI', value:'RI', name: 'rhode_island', checked: false},
		{id: 'stateSC', value:'SC', name: 'south_carolina', checked: false},
		{id: 'stateSD', value:'SD', name: 'south_dakota', checked: false},
		{id: 'stateTXH', value:'TXH', name: 'texas', checked: false},
		{id: 'stateTXA', value:'TXA', name: 'texas_austin', checked: false},
		{id: 'stateTXD', value:'TXD', name: 'texas_dallas', checked: false},
		{id: 'stateTN', value:'TN', name: 'tennessee', checked: false},
		{id: 'stateUT', value:'UT', name: 'utah', checked: false},
		{id: 'stateVT', value:'VT', name: 'vermont', checked: false},
		{id: 'stateVA', value:'VA', name: 'virginia', checked: false},
		{id: 'stateWA', value:'WA', name: 'washington', checked: false},
		{id: 'stateWV', value:'WV', name: 'west_virginia', checked: false},
		{id: 'stateWI', value:'WI', name: 'wisconsin', checked: false},
		{id: 'stateWY', value:'WY', name: 'wyoming', checked: false}
	];
}
