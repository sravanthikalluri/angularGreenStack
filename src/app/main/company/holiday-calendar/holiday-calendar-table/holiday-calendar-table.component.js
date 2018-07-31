'use strict';

require('./holiday-calendar-table.component.scss');

module.exports = {
	templateUrl: 'app/main/company/holiday-calendar/holiday-calendar-table/holiday-calendar-table.component.html',
	controller: HolidayCalendarTableController,
	bindings: {
		data: '<',
		errorMessage: '<'
	}
};

function HolidayCalendarTableController() {
	var ctrl = this;

	ctrl.$onInit = function(){
		ctrl.chipStyle = {'background' :'#0b7535'};
	}
}
