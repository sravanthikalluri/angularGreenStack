'use strict';

require('./tn-datepicker.component.scss');

module.exports = {
	template: require('./tn-datepicker.component.html'),
	controller: ['moment','utilService',TnDatepickerController],
	bindings: {
		title: '@',
		events: '<',
		eventKeys: '<',
		payrollData: '<',
		isPayrollAdmin:'<',
		modalId:'<'
	}
};

/* @ngInject */
function TnDatepickerController(moment,utilService) {
	var ctrl = this;
    var index =  0;
	function _removeTime(date) {
        return date.hour(0).minute(0).second(0).millisecond(0);
    }

   	function _buildMonth(ctrl, start, month) {
        var done = false;
        var date = start.clone();
        var monthIndex = date.month();
        var count = 0;

        ctrl.weeks = [];

        while (!done) {
            ctrl.weeks.push({ days: _buildWeek(ctrl, date.clone(), month) });
            date.add(1, 'w');
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(ctrl, date, month) {
        var today = new Date();
        var days = [];

        for (var i = 0; i < 7; i++) {
            days.push({
                name           : date.format('dd').substring(0, 1),
                number         : date.date(),
                isCurrentMonth : date.month() === month.month(),
                isToday        : date.isSame(today, 'day'),
                date           : date,
                event          : ctrl.eventMap[moment(date).format('YYYY-DD-MM')]
            });

            date = date.clone();
            date.add(1, 'd');
        }

        return days;
    }

    function _getKeyMap(keys) {
    	var map = {};

    	keys.forEach(function(k) {
    		map[k.key] = k;
    	});

    	return map;
    }

	ctrl.getEachDayCls = function(day) {
		return  day.isCurrentMonth ? (day.isToday ? 'is-today' : (moment(day.date._d).format('L') === ctrl.date ? 'is-selected-date' : 'is-in-month')) :'is-not-in-month';
	};

    function _getEventMap(events, eventKeys) {
    	var keyMap = _getKeyMap(eventKeys);
    	var eventsWithClass = events.map(function(d) {
    		var cls = keyMap ? keyMap[d.desc].cls : null;
    		return angular.extend({}, d, { cls: cls });
    	});
    	var map = {};

    	eventsWithClass.forEach(function(e) {
    		map[moment(e.date).format('YYYY-DD-MM')] = e;
    	});

    	return map;
    }

	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
	    ctrl.daysInWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
		ctrl.month = _removeTime(ctrl.month || moment());
		ctrl.eventMap = _getEventMap(ctrl.events, ctrl.eventKeys);

		if(ctrl.payrollData && ctrl.payrollData.length > 0){
			index =  currentMonthIndex(ctrl.payrollData, moment().startOf('month').format('L'), "firstDateOfMonth");

			if(ctrl.payrollData[index].datesOfInterest){
				ctrl.datesOfInterest = ctrl.payrollData[index].datesOfInterest;
				var selectedMonth = ctrl.payrollData[index].firstDateOfMonth;
				setFooter(ctrl.payrollData[index], selectedMonth);
			}

			// Create calendar for current month
			var start = ctrl.month.clone();
			start.date(1);
			_removeTime(start.day(0));
			_buildMonth(ctrl, start, ctrl.month);

		}
		ctrl.showSpinner = false;

	};

	ctrl.getDayCls = function(day,datesOfInterest) {
		var arr = [];
		var className = getColorClassName(day.date, datesOfInterest);
		return  className ? className :  ctrl.getEachDayCls(day);
		/*!day.isCurrentMonth ? arr.push('is-not-in-month') : angular.noop();
		day.event           ? arr.push(day.event.cls)     : angular.noop();

		return arr.join(' ');*/
	};

    ctrl.next = function() {
		ctrl.datesOfInterest = [];
		ctrl.footerData = [];
        var next = ctrl.month.clone();
		_removeTime(next.month(next.month()+1).date(1));
		currentDate(next);
		next.day(0);
	    ctrl.month.month(ctrl.month.month()+1);
		index =  currentMonthIndex(ctrl.payrollData,ctrl.month.startOf('month').format('L'), "firstDateOfMonth");

		if(ctrl.payrollData[index].datesOfInterest){
			ctrl.datesOfInterest = ctrl.payrollData[index].datesOfInterest;
			var selectedMonth = ctrl.payrollData[index].firstDateOfMonth;
			setFooter(ctrl.payrollData[index], selectedMonth);
		}

		_buildMonth(ctrl, next, ctrl.month);
    };

    ctrl.prev = function() {
		ctrl.datesOfInterest = [];
		ctrl.footerData = [];
        var prev = ctrl.month.clone();
		_removeTime(prev.month(prev.month()-1).date(1));
		currentDate(prev);
        prev.day(0);
        ctrl.month.month(ctrl.month.month()-1);
		index =  currentMonthIndex(ctrl.payrollData,ctrl.month.startOf('month').format('L'), "firstDateOfMonth");
		if(ctrl.payrollData[index].datesOfInterest){
			ctrl.datesOfInterest = ctrl.payrollData[index].datesOfInterest;
			var selectedMonth = ctrl.payrollData[index].firstDateOfMonth;
			setFooter(ctrl.payrollData[index], selectedMonth);
		}

		_buildMonth(ctrl, prev, ctrl.month);
    };

	function currentDate(selectedMonth){
		var selectedDate=new Date(selectedMonth);
		var monthNames = ["January", "February", "March", "April", "May", "June",
							"July", "August", "September", "October", "November", "December"];
		angular.element('#dateUpdate[aria-live="polite"]').empty();
		angular.element('#dateUpdate[aria-live="polite"]').append( monthNames[selectedDate.getMonth()]
														+ ' ' + selectedDate.getFullYear());
	}

	function getColorClassName(date, datesOfInterestArray) {
		var dayToCheck = date.format('L');
		var className = '';
		for (var i = 0; i < datesOfInterestArray.length; i++) {
			var currentDay = utilService.filterDate(datesOfInterestArray[i].dateOfInterest, 'MM/dd/yyyy');
			if (dayToCheck === currentDay) {
				if (ctrl.isPayrollAdmin && checkDueDatePeriodEndDateAndBenefitsDeducted(dayToCheck, datesOfInterestArray)) {
					className = 'pay-end-date-payroll-due-date-no-benefit-deductions';

				} else if (checkDueDatePeriodEndDateAndBenefitsDeducted(dayToCheck, datesOfInterestArray) || checkPeriodEndDateAndBenefitsDeducted(dayToCheck, datesOfInterestArray)) {
					className =  'no-benefit-deductions';

				} else if (!checkPayDateAndPayPeriodEndDate(dayToCheck, datesOfInterestArray)) {

					if (!checkDueDateAndPayPeriodEndDate(dayToCheck, datesOfInterestArray)) {
						if (datesOfInterestArray[i].dateType !== 'periodBeginDate') {
							className = getName(datesOfInterestArray[i]);
						}

					} else {
						if(ctrl.isPayrollAdmin){
							className = 'due-date-pay-period-end-date';
						}else{
							className =  'pay-period-end-date';
						}

					}

				} else {
					className =  'pay-date-pay-period-end-date';
				}


			}
		}
		return className;
	}



	function checkPayDateAndPayPeriodEndDate(dayToCheck, datesOfInterestArray) {
		var temp = [];
		var isTrue = false;
		angular.forEach(datesOfInterestArray, function (datesOfInterest) {
			var currentDay = utilService.filterDate(datesOfInterest.dateOfInterest, 'MM/dd/yyyy');
			if (dayToCheck === currentDay) {
				temp.push(datesOfInterest);
			}
		});


		if (temp.length === 2) {
			if (temp[0].dateOfInterest === temp[1].dateOfInterest && ( (temp[0].dateType === 'checkIssuedDate' || temp[1].dateType === 'checkIssuedDate') && (temp[0].dateType === 'periodEndDate' || temp[1].dateType === 'periodEndDate') )) {
				isTrue = true;
			}
		}
		return isTrue;
	}

	function checkDueDateAndPayPeriodEndDate(dayToCheck, datesOfInterestArray) {
		var temp = [];
		var isTrue = false;
		angular.forEach(datesOfInterestArray, function (datesOfInterest) {
			var currentDay = utilService.filterDate(datesOfInterest.dateOfInterest, 'MM/dd/yyyy');
			if (dayToCheck === currentDay) {
				temp.push(datesOfInterest);
			}
		});


		if (temp.length === 2) {
			if (temp[0].dateOfInterest === temp[1].dateOfInterest && ( (temp[0].dateType === 'dueDate' || temp[1].dateType === 'dueDate') && (temp[0].dateType === 'periodEndDate' || temp[1].dateType === 'periodEndDate') )) {
				isTrue = true;
			}
		}
		return isTrue;
	}

	function checkType(temp, type) {
		var isTrue = false;
		angular.forEach(temp, function (obj) {
			if (obj.dateType === type) {
				isTrue = true;
			}
		});
		return isTrue;
	}

	function checkDueDatePeriodEndDateAndBenefitsDeducted(dayToCheck, datesOfInterestArray) {
		var temp = [];
		var isTrue = false;
		angular.forEach(datesOfInterestArray, function (datesOfInterest) {
			var currentDay = utilService.filterDate(datesOfInterest.dateOfInterest, 'MM/dd/yyyy');
			if (dayToCheck === currentDay) {
				temp.push(datesOfInterest);
			}
		});


		if (temp.length === 3) {
			if (checkType(temp, 'periodEndDate') && checkType(temp, 'dueDate') && checkType(temp, 'benefitsDeducted')) {
				isTrue = true;
			}
		}
		return isTrue;
	}

	function checkPeriodEndDateAndBenefitsDeducted(dayToCheck, datesOfInterestArray) {
		var temp = [];
		var isTrue = false;
		angular.forEach(datesOfInterestArray, function (datesOfInterest) {
			var currentDay = utilService.filterDate(datesOfInterest.dateOfInterest, 'MM/dd/yyyy');
			if (dayToCheck === currentDay) {
				temp.push(datesOfInterest);
			}
		});


		if (temp.length === 3) {
			if (checkType(temp, 'periodEndDate') && checkType(temp, 'benefitsDeducted')) {
				isTrue = true;
			}
		}
		return isTrue;
	}

	function getName(dateOfInterest) {
		var name = '';
		if (dateOfInterest.dateType === 'checkIssuedDate') {
			name =  'is-pay-date';
		}
		else if (ctrl.isPayrollAdmin && dateOfInterest.dateType === 'dueDate') {
			name = 'is-due-date';
		}
		else if (dateOfInterest.dateType === 'periodEndDate') {
			name =  'pay-period-end-date';
		}
		else if (dateOfInterest.dateType === 'benefitsDeducted') {
			name =  'no-benefit-deductions';
		}
		return name;
	}

	function setFooter(payrollMonthData, selectedMonth) {
		var date = new Date(selectedMonth),
			datesInMonth = getDaysInMonth(date.getMonth(), date.getFullYear()),
			footer = [],
			footerDate =[];
		angular.forEach(datesInMonth, function (currDate) {
			var payrollDate = moment(currDate).format('MM/DD/YYYY');
			var className = getColorClassName(moment(currDate), payrollMonthData.datesOfInterest);
			if (className) {
				footer.push(className);
				footerDate.push(payrollDate);
			}

		});
		//footer = uniqueArray(footer);
		var footerNames = [];
		if (footer.length > 0) {
			angular.forEach(footer, function (name,index) {
				var obj = {
					color: name,
					value: getFooterName(name),
					paydate : footerDate[index]
				};

				var isExists = footerNames.findIndex(function (value) {
					return value.color === obj.color;
				});

				if (isExists !== -1) {
					footerNames[isExists].paydate = footerNames[isExists].paydate + ' and ' + obj.paydate;
				} else {
					footerNames.push(obj);
				}

			});
		}
		ctrl.footerData = footerNames;
	}

	function getFooterName(name) {
		if (name === 'is-due-date') {
			return 'Payroll Due Date';
		} else if (name === 'is-pay-date') {
			return 'Pay Date';
		} else if (name === 'pay-period-end-date') {
			return 'Pay Period End Date';
		} else if (name === 'pay-date-pay-period-end-date') {
			return 'Pay Date and Pay Period End Date';
		} else if (name === 'due-date-pay-period-end-date') {
			return 'Payroll Due Date and Pay Period End Date';
		} else if (name === 'no-benefit-deductions') {
			return 'Pay Period End Date - No Benefit Deductions';
		} else if ('pay-end-date-payroll-due-date-no-benefit-deductions') {
			return 'Payroll Due Date,Pay Period End Date and No Benefit Deductions';
		}
	}


}
function currentMonthIndex(payrolMonthData, searchTerm, property) {
	for (var i = 0, len = payrolMonthData.length; i < len; i++) {
		if (payrolMonthData[i][property] === searchTerm) {
			return i;
		}
	}
	return -1;
}

function getDaysInMonth(month, year) {
	// Since no month has fewer than 28 days
	var date = new Date(year, month, 1);
	var days = [];
	while (date.getMonth() === month) {
		days.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	return days;
}

function uniqueArray(collection) {
	var output = [],
		keys = [];

	angular.forEach(collection, function (item) {
		var key = item;
		if (keys.indexOf(key) === -1) {
			keys.push(key);
			output.push(item);
		}
	});
	return output;
}
