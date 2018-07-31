'use strict';

module.exports = RequestsService;

/* @ngInject */
function RequestsService(DS, moment, CurrentCompanyIdCookie, companyNameService) {
	var Requests = DS.defineResource({
		name: 'requests',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/trinetGateway/timeoff/services/v1.0/LeaveRequests',
		deserialize: function(resourceConfig, data) {
			var json = data.data.empLeaveRequests;
			json.forEach(function(leaveRequest){
				leaveRequest.id = JSON.stringify(leaveRequest);
			});

			return json;
		},
		computed: {
			dateRange: ['leaveRequestSummary.leaveStartDt', 'leaveRequestSummary.leaveEndDt', function(leaveStartDt, leaveEndDt) {
				var start = moment(leaveStartDt);
				var end = moment(leaveEndDt);
				var dateFormat = 'MMM D';

				if (start.isSame(end)) {
					return start.format(dateFormat);
				} else {
					return start.format(dateFormat) + '-' + end.format(dateFormat);
				}
			}]
		}
	});

	Requests.findAll.before(function(params, options) {
		// time-off api requires 'CurrentCompanyId' cookie if the user works for multiple companies
		var companyId = companyNameService.getCompanyId();
		CurrentCompanyIdCookie.createCurrentCompanyIdCookie(companyId);

		return [params, options];
	});

	return Requests;
}
