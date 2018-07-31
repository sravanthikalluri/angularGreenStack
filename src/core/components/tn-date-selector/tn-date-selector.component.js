'use strict';

require('./tn-date-selector.component.scss');

module.exports = {
	template: require('./tn-date-selector.component.html'),
	controller: ['moment', 'utilService', '$filter', tnDateSelectorController],
	bindings: {
		date: "=",
		disableFutureDates: "<",
		disablePastDates: "<",
		minDate: "<",
		minDateMsg: "<",
		maxDate: "<",
		isRequired: "<",
		onUpdate: "&",
		label: '@'
	}
};

/* @ngInject */
function tnDateSelectorController(moment, utilService, $filter) {
	var ctrl = this;
	var index = 0;

	function _removeTime(date) {
		return date.hour(0).minute(0).second(0).millisecond(0);
	}

	ctrl.isDateRequired = false;

	ctrl.update = function (data) {
		ctrl.onUpdate({data: data});
	};

	function _buildMonth(ctrl, start, month) {
		var done = false;
		var date = start.clone();
		var monthIndex = date.month();
		var count = 0;

		ctrl.weeks = [];

		while (!done) {
			ctrl.weeks.push({days: _buildWeek(ctrl, date.clone(), month)});
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
				name: date.format('dd').substring(0, 1),
				number: date.date(),
				isCurrentMonth: date.month() === month.month(),
				isToday: date.isSame(today, 'day'),
				date: date
			});

			date = date.clone();
			date.add(1, 'd');
		}

		return days;
	}

	ctrl.$onInit = function () {
		ctrl.showSpinner = true;
		ctrl.daysInWeek = [
			{
				day: "Su",
				title: "Sunday"
			},
			{
				day: "Mo",
				title: "Monday"
			},
			{
				day: "Tu",
				title: "Tuesday"
			},
			{
				day: "We",
				title: "Wednesday"
			},
			{
				day: "Th",
				title: "Thursday"
			},
			{
				day: "Fr",
				title: "Friday"
			},
			{
				day: "Sa",
				title: "Saturday"
			}
		];
		ctrl.inputDate = moment(moment(), "MM/DD/YYYY");
		ctrl.month = _removeTime(ctrl.inputDate || moment());
		ctrl.calFocus = false;
		ctrl.isActive = false;
		// Create calendar for current month
		var start = ctrl.month.clone();
		start.date(1);
		_removeTime(start.day(0));
		_buildMonth(ctrl, start, ctrl.month);
		ctrl.showSpinner = false;
		if (ctrl.isRequired) {
			ctrl.isDateRequired = ctrl.isRequired;
		}
	};

	ctrl.getDayCls = function (day) {
		return day.isCurrentMonth ? (day.isToday ? 'is-today' : (moment(day.date._d).format('L') === ctrl.date ? 'is-selected-date' : 'is-in-month')) : 'is-not-in-month';
	};
	ctrl.next = function () {
		ctrl.datesOfInterest = [];
		ctrl.footerData = [];
		var next = ctrl.month.clone();
		_removeTime(next.month(next.month() + 1).date(1));
		next.day(0);
		ctrl.month.month(ctrl.month.month() + 1);

		_buildMonth(ctrl, next, ctrl.month);
	};

	ctrl.prev = function () {
		ctrl.datesOfInterest = [];
		ctrl.footerData = [];
		var prev = ctrl.month.clone();
		_removeTime(prev.month(prev.month() - 1).date(1));
		prev.day(0);
		ctrl.month.month(ctrl.month.month() - 1);

		_buildMonth(ctrl, prev, ctrl.month);
	};
	ctrl.closeByEsc = function (e) {
		if (e.which === 27) {
			ctrl.onOffClick_event();
			angular.element('div#dateSelect').focus();
		}
	};

	ctrl.onOffClick_event = function () {
		ctrl.isActive = ctrl.isActive ? ctrl.calFocus ? true : false : false;
		if (!ctrl.isActive) {
			if (ctrl.errorMessage) {
				ctrl.$onInit();
				ctrl.date = moment(moment(), "MM/DD/YYYY").format('MM/DD/YYYY');
				ctrl.onUpdate({data: ctrl.date});
			}
			ctrl.errorMessage = false;
		}

	};

	ctrl.clicked = function () {
		ctrl.isActive = false;
	};
	ctrl.showCurrentDate = function (day) {
		ctrl.date = moment(day, "MM/DD/YYYY").format('MM/DD/YYYY');
		ctrl.inputDate = moment(ctrl.date, "MM/DD/YYYY");
		ctrl.month = _removeTime(ctrl.inputDate || moment());
		// Create calendar for current month
		var start = ctrl.month.clone();
		start.date(1);
		_removeTime(start.day(0));
		_buildMonth(ctrl, start, ctrl.month);
	};
	ctrl.onDayClick = function (day) {
		ctrl.errorMessage = false;
		if (ctrl.disableFutureDates && day.date._d > new Date()) {
			ctrl.errorMessage = true;
			ctrl.errorMessageString = "Date cannot be in the future";
		}
		else if (ctrl.disablePastDates && day.date._d < new Date()) {
			ctrl.errorMessage = true;
			ctrl.errorMessageString = "Date cannot be in the past";
		}
		else if (ctrl.maxDate && day.date._d > new Date(ctrl.maxDate)) {
			ctrl.errorMessage = true;
			ctrl.errorMessageString = "Date cannot be more than 60 days in the future";
		}
		else if (ctrl.minDate && day.date._d < new Date(ctrl.minDate)) {
			ctrl.errorMessage = true;
			ctrl.errorMessageString = ctrl.minDateMsg ? ctrl.minDateMsg : "Date cannot be more than 30 days in the past";
		}
		else {
			ctrl.date = moment(day.date._d, "MM/DD/YYYY").format('MM/DD/YYYY');
			ctrl.isActive = false;
			ctrl.onUpdate({data: ctrl.date});
			angular.element('div#dateSelect').focus();
		}
	};

	ctrl.goToNextMonth = function (e) {
		var startDate = moment([ctrl.month.year(), ctrl.month.month()]);
		var endDate = moment(startDate).endOf('month');
		if (e.which === 9) {
			if (endDate.date() === +e.currentTarget.innerText) {
				angular.element('button#prev').focus();
			}
		} else if (e.keyCode === 16) {
			var arr = angular.element('div.tn-datepicker-row').find('div.tn-datepicker-day');
			arr.filter(function (ele, index) {
				if (angular.element(arr[ele]).find('span')[0].innerHTML == (endDate.date())) {
					angular.element(angular.element(arr[ele - 1]).find('button')).focus();
					return;
				}
			});
		}
	};

	angular.element('button#prev').keydown(function (event) {
		var startDate = moment([ctrl.month.year(), ctrl.month.month()]),
			endDate = moment(startDate).endOf('month'),
			arr;
		if (event.shiftKey && event.keyCode === 9) {
			arr = angular.element('div.tn-datepicker-row').find('div.tn-datepicker-day');
			arr.filter(function (ele, index) {
				if (angular.element(arr[ele]).find('span')[0].innerHTML == (endDate.date())) {
					angular.element(angular.element(arr[ele]).find('button')).focus();
					return;
				}
			});
		}
	});
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
