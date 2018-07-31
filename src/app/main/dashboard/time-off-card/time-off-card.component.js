'use strict';

require('./time-off-card.component.scss');

module.exports = {
	templateUrl: 'app/main/dashboard/time-off-card/time-off-card.component.html',
	controller: ['LeaveType', 'Requests',TimeOffCardController]
};

/* @ngInject */
function TimeOffCardController(LeaveType, Requests) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		var leaveTypeFinished = false;
		var requestsFinished = false;
		ctrl.hasNoData = false;
		LeaveType.findAll().then(function(results) {
			ctrl.leaveTypes = results.filter(function(d) { return d.accrued !== null; });
			ctrl.showSpinner  = requestsFinished ? true : false;
		}).catch(function(err) {
			console.log(err);
			ctrl.showSpinner  = requestsFinished ? true : false;
			ctrl.hasNoData = true;
		});

		Requests.findAll().then(function(results) {
			ctrl.requests = results.map(function(leaveRequest) {
				return {
					type: leaveRequest.leaveRequestSummary.leaveTypeDesc,
					dateRange: leaveRequest.dateRange,
					status: leaveRequest.leaveRequestSummary.statusDesc,
					requestId: parseInt(leaveRequest.leaveRequestSummary.requestId)
				};
				ctrl.showSpinner  = leaveTypeFinished ? true : false;
			});
		}).catch(function(err) {
			console.log(err);
			ctrl.showSpinner = leaveTypeFinished ? true : false;
			ctrl.hasNoData = true;
		});
	}

	ctrl.launchTimeOff = function(){
		window.open('../ui/apps/TimeOff', '_blank');
	}
}
