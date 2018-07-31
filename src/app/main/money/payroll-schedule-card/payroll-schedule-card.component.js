'use strict';

require('./payroll-schedule-card.component.scss');

module.exports = {
	template: require('./payroll-schedule-card.component.html'),
	controller: ['DS','moment','utilService', '$timeout', 'gso', 'sharedProperties',PayrollScheduleCardController]
};

/* @ngInject */
function PayrollScheduleCardController(DS,moment,utilService, $timeout, gso, sharedProperties) {
	var ctrl = this;
	var payrollMonth = null,
		payrollMonthData = [],
		beginDate = null,
		currentMonthYr = 0,
		previousMonthYr = 0,
		prevPayrollSchedule = null,
		lastRecord = false;
	ctrl.componentsPermissions = sharedProperties.getComponentPermissions();

	ctrl.isPayrollAdmin = false;
	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		var payChecksFinished = false;
		var payrollScheduleFinished = false;
		var currentDate = new Date(),
			startDate = currentDate.getFullYear() + '-' + '01' + '-' + '01',
			endDate = (currentDate.getFullYear() + 1 ) + '-' + '12' + '-' + '31';

		DS.find('paychecks', '').then(function(result) {
			ctrl.nextCheckDate = result.nextCheckDt;
			ctrl.showSpinner = payrollScheduleFinished ? true : false;
		});

		DS.find('payrollSchedule','payrollschedule?startDate='+startDate+'&endDate='+endDate).then(function(result) {
			var keys = [];
			var arr = [];
			if(ctrl.componentsPermissions) {
				ctrl.isPayrollAdmin = ctrl.isPayrollAdmin('payrollDueDate');
				ctrl.checkDates = arr;
				ctrl.payrollData = result;
				ctrl.payDateSorting(result);
				ctrl.keys = keys;
				ctrl.showSpinner = payChecksFinished ? true : false;
			}else{
				$timeout(function(){
					ctrl.isPayrollAdmin = ctrl.isPayrollAdmin('payrollDueDate');
					ctrl.checkDates = arr;
					ctrl.payrollData = result;
					ctrl.payDateSorting(result);
					ctrl.keys = keys;
					ctrl.showSpinner = payChecksFinished ? true : false;
				},5000);
			}
		});
	};
	ctrl.isPayrollAdmin = function(name){
		var isPayrollAdmin = false;
		ctrl.selectedMenuComponentPermissions = gso.getUtilService().splitSubComponentsPermissions(ctrl.componentsPermissions['35']);
		if (ctrl.selectedMenuComponentPermissions && ctrl.selectedMenuComponentPermissions.length > 0) {
			angular.forEach(ctrl.selectedMenuComponentPermissions, function (selectedMenu) {
				if (selectedMenu.name === name && selectedMenu.permission.canView) {
					isPayrollAdmin = true;
				}
			});
		}
		return isPayrollAdmin;
	};
	ctrl.payDateSorting = function (payrollData) {
		angular.forEach(payrollData,function (payrollSchedule, i) {
			lastRecord = i === payrollData.length - 1;
			beginDate = new Date(payrollSchedule.periodEndDate);
			// set values to detect yr/month for current record
			currentMonthYr = beginDate.getFullYear() + '' + beginDate.getMonth();
			// write record on month break or last record if it wasn't a break
			ctrl.isMonthChange(payrollSchedule);
			// set break value
			previousMonthYr = beginDate.getFullYear() + '' + beginDate.getMonth();

		});
		ctrl.payrollMonthData = payrollMonthData;
	};

	ctrl.isMonthChange = function (payrollSchedule) {
		if (currentMonthYr !== previousMonthYr) {
			// add first prev payrollRecord, which will be the needed month or add previous record to array of recs to add to store
			if (previousMonthYr === 0) {
				prevPayrollSchedule = payrollSchedule;
			}
			else {
				payrollMonthData.push(payrollMonth);
			}
			payrollMonth = {
				firstDateOfMonth: moment(beginDate).startOf('month').format('L'),
				payFrequencyName: prevPayrollSchedule.payFrequencyName,
				datesOfInterest: []
			};
		}
		payrollMonth = processDatesOfInterest(payrollMonth, payrollSchedule);
		prevPayrollSchedule = payrollSchedule;
		if (lastRecord) {
			payrollMonthData.push(payrollMonth);
		}
	};

	function processDatesOfInterest(payrollMonth, payrollSchedule) {
		var currentMonthArray = payrollMonth.firstDateOfMonth.split('/'),
			currentMonth = currentMonthArray[0],
			currentYear = currentMonthArray[2];

		// process all fields in the payrollSchedule record
		// for applicable fields and values, create many Date of Interest records for one PayrollMonth

		var data = ctrl.payrollData;

		angular.forEach(data, function (pay) {
				payrollSchedule = pay;
				angular.forEach(payrollSchedule,function (value, key) {
						var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
						// there may be non-date items
						var match;
						if (typeof value === "string" && (match = value.match(regexIso8601))) {
							addDateIfInSameMonth(key, currentMonth, currentYear, utilService.filterDate(value, 'MM/dd/yyyy'), payrollMonth);
						}
						// handle benefitsDeducted date creation
						else if (value === "Y") {
							// need to pass in last day of month since this field is a boolean
							var date =utilService.filterDate(payrollSchedule.periodBeginDate, 'MM/dd/yyyy');
							var curArray = date.toString().split('/');
							if (curArray[0] === currentMonth && curArray[2] === currentYear) {
								addDateIfInSameMonth(key, currentMonth, currentYear,utilService.filterDate(payrollSchedule.periodEndDate, 'MM/dd/yyyy'), payrollMonth);
							}

						}
					});
			});
		return payrollMonth;
	}

	function addDateIfInSameMonth(key, currentMonth, currentYear, date, payrollMonth) {
		var datesOfInterest = payrollMonth.datesOfInterest;
		// search store for potentially duplicate record
		var foundIndex = findBy(datesOfInterest, key, 'dateType', date);
		// avoid adding duplicate records
		if (foundIndex !== -1) {
			return;
		}
		var curArray = date.toString().split('/');
		if (curArray[0] === currentMonth && curArray[2] === currentYear) {
			datesOfInterest.push({
				dateOfInterest: date,
				dateType: key
			});
		}
	}

	function findBy(myArray, searchTerm, property, date) {
		for (var i = 0, len = myArray.length; i < len; i++) {
			if (myArray[i][property] === searchTerm && (myArray[i].dateOfInterest === date)) {
				return true;
			}
		}
		return -1;
	}

	ctrl.btnClick = function(){
		ctrl.showModal = true;
	}

}
