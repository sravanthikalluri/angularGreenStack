'use strict';

require('./benefits-summary-view.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/benefits-summary-view/benefits-summary-view.component.html',
	controller: ['DS','gso','$uibModal',BenefitsSummaryView]
};
/* @ngInject */
function BenefitsSummaryView(DS,gso,$uibModal) {
	var ctrl = this;
	ctrl.error = null;
	ctrl.showSpinner = true;
	ctrl.benefitsSummaryData = [];
	ctrl.benefitsSummaryNew = {};
	ctrl.customindicator = ctrl.benefitProgramArray = ctrl.head = ctrl.payFrquencyListArrayMain = ctrl.fromDate = ctrl.toDate = null;
	ctrl.cobraDisplay = true;
	ctrl.employeeBenefitProgram = ctrl.employeePayFrequency = "";
	ctrl.filteredBenefitsSummary = ctrl.filteredBenefitsSummary1 = [];
	ctrl.filteredBenefits = [];
	/*getting plan start date & quarter start*/

	ctrl.$onInit = function() {
		DS.find('benefits-summary-view-plans','').then(function(response) {
				ctrl.showSpinner = false;
				//--filtering the plans which are not related to the employee\
				if(response.benefitsSummaryViewPlans){
					response.benefitsSummaryViewPlans.benefitProgramList =  ctrl.filterBenefitPrograms(response);
				}
				if(ctrl.filterPayFrequencyList(response).length>0){
					response.benefitsSummaryViewPlans.payFrequencyList=ctrl.filterPayFrequencyList(response);
				}
				ctrl.benefitProgramArray = ctrl.filterBenefitPrograms(response);

				ctrl.response = response.benefitsSummaryViewPlans;
				ctrl.currentPlanStartDate = response.benefitsSummaryViewPlans.currentPlanStartDate;
				ctrl.currentPlanEndDate = response.benefitsSummaryViewPlans.currentPlanEndDate;
				ctrl.futurePlanStartDate = response.benefitsSummaryViewPlans.planStartDate;
				ctrl.futurePlanEndDate = response.benefitsSummaryViewPlans.planEndDate;
				ctrl.fromDate = gso.getUtilService().filterDate(ctrl.currentPlanStartDate, "MMMM dd,yyyy"); //TODO: constantsConfig.fullDateFormat
				ctrl.toDate = gso.getUtilService().filterDate(ctrl.currentPlanEndDate, "MMMM dd,yyyy");
				ctrl.futureFromDate = gso.getUtilService().filterDate(ctrl.futurePlanStartDate, "MMMM dd,yyyy");
				ctrl.futureToDate = gso.getUtilService().filterDate( ctrl.futurePlanEndDate , "MMMM dd,yyyy");
				ctrl.payFrquencyListArray = response.benefitsSummaryViewPlans;
				ctrl.customindicator = response.benefitsSummaryViewPlans.customIndicator;
				ctrl.subHeading = response.benefitsSummaryViewPlans.groupDesc;
				if (response.benefitsSummaryViewPlans.employeeBenefitProgram !== "undefined" && response.benefitsSummaryViewPlans.employeeBenefitProgram !== null &&
					response.benefitsSummaryViewPlans.employeePayFrequency !== "undefined" && response.benefitsSummaryViewPlans.employeePayFrequency !== null) {
					ctrl.employeeBenefitProgram = response.benefitsSummaryViewPlans.employeeBenefitProgram;
					ctrl.employeePayFrequency = response.benefitsSummaryViewPlans.employeePayFrequency;
				}
				else {
					ctrl.employeeBenefitProgram = "";
					ctrl.employeePayFrequency = "";
				}
				/*fetching links data */


				DS.find('benefits-summary-links','').then(function (response) {
						angular.forEach(response.benefitsSummaryLinks, function (val1) {
							ctrl.benefitsSummaryData.push(val1);
						});
						ctrl.displayLinks(ctrl.benefitsSummaryData, ctrl.payFrquencyListArray, ctrl.customindicator, ctrl.benefitProgramArray);
					},
					function (data) {
						ctrl.childParentAlertMsg(data);
					}).catch(function(err) {
						ctrl.error = err;
						ctrl.errorMessage = err.data._error.message;
					});


				/*fetching links data end*/
				ctrl.displayLinks = function (benefitsSummaryData, payFrquencyListArray, customindicator, benefitProgramArray) {
					var k = 0;
					ctrl.payFrquencyListArrayMain = payFrquencyListArray.payFrequencyList;
					ctrl.filteredBenefitsSummary1=[];
					angular.forEach(ctrl.payFrquencyListArrayMain, function (value) {
						angular.forEach(benefitProgramArray, function (program, programKey) {
							ctrl.someArray = [];
							ctrl.filteredBenefits = [];
							ctrl.someArray = angular.copy(benefitsSummaryData);
							for (k = 0; k < ctrl.someArray.length; k++) {
								if (ctrl.someArray[k].key === value) {
									if (ctrl.someArray[k].heading !== "") {
										if (ctrl.someArray[k].heading.indexOf(':') !== -1) {
											ctrl.someArray[k].heading = ctrl.someArray[k].heading.substr(0, ctrl.someArray[k].heading.indexOf(':'));
										}
										ctrl.someArray[k].heading = ctrl.someArray[k].heading + "for " + payFrquencyListArray.benefitProgramList[programKey].description;
										if (ctrl.customindicator === true && ctrl.someArray[k].type === 'cop') {
											ctrl.someArray[k].heading = '';
										}
									}
									if (program.defaultProgram === 'Y') {
										ctrl.someArray[k].subhead = "Default Benefit Program";
									}else{
										ctrl.apply = ctrl.appliesToYou(value,programKey);
										if (ctrl.apply === true) {
											ctrl.someArray[k].subhead = "This one applies to you";
										}
									}

									ctrl.someArray[k].PlanCode = program.benefitProgram;
									ctrl.filteredBenefits.push(ctrl.someArray[k]);
								}
							}
							ctrl.filteredBenefits.benefitProgram = program.benefitProgram;
							ctrl.filteredBenefits.description = program.description;
							ctrl.filteredBenefitsSummary1.push(ctrl.filteredBenefits);
						});
						ctrl.filteredBenefitsSummary = ctrl.filteredBenefitsSummary1;
					});
				};
				/*display links end*/
			},
			function (data) {
				ctrl.childParentAlertMsg(data);
			}).catch(function(err) {
				ctrl.error = err;
				ctrl.errorMessage = err.data._error.message;
				ctrl.showSpinner = false;
			});
	};
	//--filtering the payFrequencyList
	ctrl.filterPayFrequencyList=function(response) {
		var result = new Array();
		if(response && response.benefitsSummaryViewPlans && response.benefitsSummaryViewPlans.payFrequencyList)	{
				result = response.benefitsSummaryViewPlans.payFrequencyList.filter(function(item) {
						if(item.toLowerCase()==response.benefitsSummaryViewPlans.employeePayFrequency.toLowerCase()){
							return item;
						}
				});
		}
		return result;

	}
	//--filtering the plans which are not related to the employee
	ctrl.filterBenefitPrograms=function(response) {
		var result = new Array();
		if( response && response.benefitsSummaryViewPlans && response.benefitsSummaryViewPlans.benefitProgramList) {
			result = response.benefitsSummaryViewPlans.benefitProgramList.filter(function (item) {
				if(response.benefitsSummaryViewPlans.employeeBenefitProgram) {
					if(item.benefitProgram.toLowerCase()===response.benefitsSummaryViewPlans.employeeBenefitProgram.toLowerCase()) {
						return item;
					}
				}
				else{
					if(item.defaultProgram == "Y") {
						return item;
					}
				}
			})
		}
		return result;
	}
	ctrl.reOrderId = function (benefitsSummaryNew) {
		angular.forEach(benefitsSummaryNew, function (value2, key2) {
			value2.id = key2;
		});
	};

	ctrl.appliesToYou = function (val,index) {
		var programList= ctrl.payFrquencyListArray.benefitProgramList;
				if(Array.isArray(programList)) {
					return ((programList[index].benefitProgram === ctrl.employeeBenefitProgram) && (ctrl.employeePayFrequency === val)) ? true : false;
				}
	};

	ctrl.openCobraSummaryModal = function(startDate, endDate) {
		var dataForModal = {
			startDate: startDate,
			endDate: endDate
		}
		$uibModal.open({
				animation: true,
				template: '<cobra-summary></cobra-summary>',
				component: 'cobraSummary',
				controllerAs: 'ctrl',
				windowClass: 'benefits-modal-dialog',
				resolve: {
					modalData: function() {
						return dataForModal;
					}
				}
			}
		)
	};

	ctrl.openBuildMaintainCustomModal = function(dataForModal) {
		$uibModal.open({
				animation: true,
				template: '<build-maintain-custom></build-maintain-custom>',
				component: 'buildMaintainCustom',
				controllerAs: 'ctrl',
				windowClass: 'benefits-custom-modal-dialog',
				resolve: {
					programData: function() {
						return dataForModal;
					}
				}
			}
		)
	};

}
