'use strict';

require('./time-off-carousel.component.scss');

module.exports = {
	template: require('./time-off-carousel.component.html'),
	controller: TimeOffCarouselController,
	bindings: {
		accruals: '<'
	}
};

function TimeOffCarouselController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.active = 0;
		ctrl.interval = 0;
	};

	ctrl.leaveHours = function(hours){
		if (angular.isNumber(hours)) {
			var hoursValInteger = (hours < 0) ? Math.ceil(hours): Math.floor(hours);
			return hoursValInteger;
		} else {
			return 0;
		}
	};
}
