'use strict';

module.exports = LeaveTypeService;

/* @ngInject */
function LeaveTypeService(DS, CurrentCompanyIdCookie, companyNameService) {
	var LeaveType = DS.defineResource({
		name: 'leaveType',
		idAttribute: 'leaveTypeCd',
		basePath: '',
		endpoint: '/trinetGateway/timeoff/services/v1.0/LeaveRequest/LeaveType',
		deserialize: function(responseConfig, data) {
			// Creates an array of modified LeaveType with a requests property instead of requestList
			return data.data.leaveTypes.map(function(oldLeaveType) {
				var newLeaveType = {};

				for (var prop in oldLeaveType) {
					if (oldLeaveType.hasOwnProperty(prop) && prop !== 'requestList') {
						newLeaveType[prop] = oldLeaveType[prop];
					}
				}

				newLeaveType.requests = oldLeaveType.requestList.requests;

				return newLeaveType;
			});
		}
	});

	LeaveType.findAll.before(function(params, options) {
		// time-off api requires 'CurrentCompanyId' cookie if the user works for multiple companies
		var companyId = companyNameService.getCompanyId();
		CurrentCompanyIdCookie.createCurrentCompanyIdCookie(companyId);

		return [params, options];
	});

	return LeaveType;
}
