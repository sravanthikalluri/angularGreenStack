'use strict';

require('./paychecks-and-statements.component.scss');

module.exports = {
	templateUrl: 'app/main/money/paychecks-and-statements/paychecks-and-statements.component.html',
	controller: ['DS', 'SharedDataService','PaycheckDataService', 'moment','gso',paychecksAndStatementsController]
};

/* @ngInject */
function paychecksAndStatementsController(DS, SharedDataService,PaycheckDataService, moment,gso) {

	var ctrl = this;
	ctrl.selectedIndex = 0;
	ctrl.paychecks = [];
	ctrl.selectedPaycheck = 0;
	ctrl.defaultPaychecksSize = 10;
	ctrl.selectedHistory = "sixMonths";
	ctrl.details = {};
	ctrl.isEstPayActive = false;
	ctrl.isCompStatemnetsActive = false;
	ctrl.payFrame = false;
	ctrl.w2Url = "/#/ssowidget/jat";
	ctrl.historyOptions = {
		"paychecks-history-all": "all",
		"paychecks-history-3-months": "threeMonths",
		"paychecks-history-6-months": "sixMonths",
		"paychecks-history-current-year": "currentYear",
		"paychecks-history-last-year": "lastYear",
		"paychecks-history-date-range": "dateRange"
	};

	ctrl.noPercentStates  =  ['CT','DC','DE','HI','KY','LA','MA','MS','NJ','PR','UT'];
	ctrl.noW2FormStates  =  ['PR', 'GU', 'VI'];
	ctrl.symmetryPaycheckCityInfo = {
		"style":{"body":{"background-color":"#ebebec"},"labels":{"color":"#f47b2a"}},
		"model" : {}};
	ctrl.dataMessage = '';

	ctrl.w2LableName = null;

	ctrl.setw2LableName = function (countryCode) {
		if((countryCode === 'US' && ctrl.noW2FormStates.indexOf(gso.getAppConfig().stateCode) >= 0)){
			ctrl.isShowW2Form = false;
		}else{
			ctrl.isShowW2Form = true;
			ctrl.w2LableName = countryCode === 'CA' ? 'paychecks-view-t4' : 'paychecks-view-w2';
		}
	};

	ctrl.clicked = function(){
		ctrl.isEstPayActive = false;
		ctrl.isCompStatemnetsActive = false;
	}



	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		ctrl.loading = true;
		ctrl.setw2LableName(gso.getAppConfig().countryCode);
		ctrl.getCompensationStatements();
		PaycheckDataService.fetchAllPaychecksWithDetails().then(function(checks) {
			if(!checks._error){
				ctrl.allPaychecks = checks;
				ctrl.onRangeChange();

				ctrl.showSpinner = false;
			}else{
				ctrl.errorMessage = checks._error.message;
			}

			ctrl.loading = false;
		});
		var pastDate = new Date();
		ctrl.filter = {};
		ctrl.filter.filterOnField = 'payEndDate';
		ctrl.filter.endDate = moment(pastDate, "MM/DD/YYYY").format('MM/DD/YYYY');
		pastDate.setMonth(pastDate.getMonth() - 6);
		ctrl.filter.startDate = moment(pastDate, "MM/DD/YYYY").format('MM/DD/YYYY');
		ctrl.getPaycheckCity();
	};



	function mapObjectData(mainIndex,obj,dataName,mapedKeyName,isKeyIndex){
		var keys = Object.keys(obj);
		keys.map(function (keyName,index) {
			isKeyIndex ? mainIndex = index : angular.noop();
			dataName[mapedKeyName+'['+ (mainIndex ) +']['+keyName+']'] = obj[keyName];
		});
	}
	function filterRes(arr,mapedKeyName,isKeyIndex) {
		var voluntaryDeductions = {};
		arr.map(function (obj,index) {
			mapObjectData(index,obj,voluntaryDeductions,mapedKeyName,isKeyIndex);

		});
		return voluntaryDeductions;

	}


	function mapData(obj,dataName){
		var voluntaryDeductions = {};
		var keys = Object.keys(obj);
		keys.map(function (keyName,index) {
			if(keyName === 'isResident') {
				voluntaryDeductions[dataName+'[resident]'] = obj[keyName];
			}
			else if(keyName === 'isExempt') {
				voluntaryDeductions[dataName+'[exempt]'] = obj[keyName];
			}
			else{
				voluntaryDeductions[dataName+'['+keyName+']'] = obj[keyName];
			}
		});
		return voluntaryDeductions;
	}


	ctrl.getPaycheckCity = function(){
		DS.find('paycheck-city', '').then(function (response) {
			ctrl.isShowPayrollEstimate = true;
			/* Removing the special characters from deductionName */
			if(response.data.voluntaryDeductions && response.data.voluntaryDeductions.length > 0){
				response.data.voluntaryDeductions.map(function(item){
					item.deductionName = item.deductionName.replace(/[^a-zA-Z0-9 ]/g,'');
					return item
				});
			}

			(response.data.voluntaryDeductions && response.data.voluntaryDeductions.length > 0) ? angular.extend(response.data,filterRes(response.data.voluntaryDeductions,'voluntaryDeductions',false))   : angular.noop();
			(response.data.stateValues && response.data.stateValues.length > 0) ? angular.extend(response.data,filterRes(response.data.stateValues,'stateValues',true))   : angular.noop();
			response.data.locale ? angular.extend(response.data,mapData(response.data.locale,'locale'))   : angular.noop();
			response.data.print ? angular.extend(response.data,mapData(response.data.print,'print'))   : angular.noop();
			(response.data.otherIncome && response.data.otherIncome.length > 0) ? angular.extend(response.data,filterRes(response.data.otherIncome,'otherIncome',false))   : angular.noop();
			(response.data.rates && response.data.rates.length > 0) ? angular.extend(response.data,filterRes(response.data.rates,'rates',false))   : angular.noop();

			response.data['voluntaryDeductions'] ? delete response.data['voluntaryDeductions'] : angular.noop();
			response.data['stateValues'] ? delete response.data['stateValues'] : angular.noop();
			response.data['locale'] ? delete response.data['locale'] : angular.noop();
			response.data['otherIncome'] ? delete response.data['otherIncome'] : angular.noop();
			response.data['print'] ? delete response.data['print'] : angular.noop();
			response.data['rates'] ? delete response.data['rates'] : angular.noop();

			ctrl.symmetryPaycheckCityInfo["model"] = response.data;

			var currentState = ctrl.symmetryPaycheckCityInfo.model.state;
			ctrl.symmetryCalculators = [
				{name : 'symmetry-salary',title : 'money.earnings_statements.sal-paycheck-cal'},
				{name : 'symmetry-hourly',title : 'money.earnings_statements.hour-paycheck-cal'},
				{name : 'symmetry-gross-up',title : 'money.earnings_statements.gross-up-cal'}
			];

			ctrl.isBonusPayAggregate = ctrl.noPercentStates.indexOf(currentState) >= 0 ? true : false;
			ctrl.isBonusPayAggregate ? ctrl.symmetryCalculators.splice(2, 0,{name : 'symmetry-bonus-pay-aggregate',title : 'money.earnings_statements.bonus-cal'})
				       : ctrl.symmetryCalculators.splice(2, 0,{name : 'symmetry-bonus-pay-percent',title : 'money.earnings_statements.bonus-percent-cal'});

		}).catch(function(error) {
			ctrl.isShowPayrollEstimate = false;
		});
	};
	/***
	 *  Func: An api call for getting compensation statements.
	 */
	ctrl.getCompensationStatements = function () {
		DS.find('compensation-statements', '').then(function (response) {
			ctrl.compensationStatementsData = response;
		}).catch(function(error) {
			ctrl.errorMessage = error.data._statusText;
		});
	};

	ctrl.goToCustomTCSReport = function(){
        var clientReportsUrl = SharedDataService.getAppSharedData().reportsuiBaseUrl+'/UIGateway.jsp?source=TCS';
        window.open(clientReportsUrl, 'Custom TCS Report');

	};


	ctrl.onRangeChange = function() {
		var startIndex, endIndex = 0;
		var today = new Date();
		var startDate = ctrl.getStartDate(ctrl.selectedHistory);
		var pastDate = ctrl.getEndDate(ctrl.selectedHistory);

		if(ctrl.selectedHistory !== "all" && ctrl.selectedHistory !== "dateRange")
		{
			for(var i = 0; i < ctrl.allPaychecks.checkSummaries.length; i++) {
				var date = new Date(ctrl.allPaychecks.checkSummaries[i].checkDt);

				if(date < startDate && startIndex === undefined) {
					startIndex = i;
				}

				if(date < pastDate) {
					break;
				}
			}
			endIndex = i;
			ctrl.paychecks.checkSummaries = ctrl.allPaychecks.checkSummaries.slice(startIndex, endIndex);
		}
		else {
			ctrl.paychecks.checkSummaries = angular.copy(ctrl.allPaychecks.checkSummaries);
		}

		if (ctrl.paychecks.checkSummaries.length === 0) {
			ctrl.dataMessage = ctrl.errorMessage = 'There are no paychecks for this date range. Please select another option.';
			ctrl.details = [];
			ctrl.updateSpinner = false;
		}
		else{
			ctrl.onSelectedCheckChange(0);
			ctrl.errorMessage = null;
			ctrl.dataMessage = '';
		}
		var updatedMessage = 'Paychecks loaded for '+ctrl.selectedHistory+ '.';
		if(ctrl.selectedHistory === "dateRange"){
			updatedMessage+= ' Please select a date to get paychecks';
		}
		angular.element('#sortable').text(updatedMessage);
		setTimeout(function() {
			angular.element('#sortable').html('');
		}, 1000);
	};

	ctrl.onSelectedCheckChange = function(index) {
		ctrl.selectedPaycheck = index;
		ctrl.updateSpinner = true;
		angular.element(document.querySelector('span.modal-close')).focus();
		var paycheckID = null;
		if (ctrl.paychecks.checkSummaries[index]) {
			paycheckID = ctrl.paychecks.checkSummaries[index].id
		}
		else {
			paycheckID = ctrl.allPaychecks.checkSummaries[0].id;
		}
		PaycheckDataService.fetchAllPaycheckDetails(paycheckID).then(function (result) {
			ctrl.details = result[0];
			ctrl.updateSpinner = false;
		}).catch(function(error) {
			ctrl.errorMessage = error.data._statusText;
		});
	};




	/**
	 * Func: An api call for getting estimated pays urls.
	 */
	ctrl.toggleSymmetryVisibility = function (selectedSymmetry) {
		ctrl.payFrame = true;
		ctrl.selectedSymmetryCalc = selectedSymmetry;
	};



	ctrl.getStartDate = function(option) {
		var startDate = new Date();
		ctrl.showDateRange = false;
		switch(option) {
			case "threeMonths":
			case "sixMonths":
			case "currentYear":
				return startDate;
				break;
			case "lastYear":
				return new Date(new Date().getFullYear(), 0, 1);
				break;
			case "dateRange":
				ctrl.showDateRange = true;
				break;
		}
	};

	ctrl.getEndDate = function(option) {
		var pastDate = new Date();
		ctrl.showDateRange = false;

		switch(option) {
			case "threeMonths":
				pastDate.setMonth(pastDate.getMonth() - 3);
				break;

			case "sixMonths":
				pastDate.setMonth(pastDate.getMonth() - 6);
				break;

			case "currentYear":
				pastDate = new Date(new Date().getFullYear(), 0, 1);
				break;

			case "lastYear":
				pastDate = new Date(new Date().getFullYear() - 1, 0, 1);
				break;

			case "dateRange":
				ctrl.showDateRange = true;
				break;
		}

		return pastDate;
	};
	ctrl.onDateChange = function(data,key){
		var startDate = ctrl.filter.startDate,
				endDate		=	ctrl.filter.endDate;

		ctrl.dateErrorMessage = " ";

		if(key === 'START'){
			startDate = data;
		}else{
			endDate	=	data;
		}

		startDate = moment(startDate, "MM/DD/YYYY").format('YYYY-MM-DD');
		endDate = moment(endDate, "MM/DD/YYYY").format('YYYY-MM-DD');

		if(startDate > endDate){
			ctrl.dateErrorMessage = "End Date should be greater than Start Date.";
		}else{
			ctrl.dateErrorMessage = null;
		}
	}

}
