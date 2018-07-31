'use strict';

module.exports = EmployeeInfoService;

/* @ngInject */
function EmployeeInfoService(DS,gso, loginUrlConfig) {
	return DS.defineResource({
		name: 'emp-info',
		idAttribute: 'id',
		basePath: '',
		// Endpoint will be rewritten in main controller
		// This is default end point
		endpoint:  loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.empDetails ,
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			//console.log("response emp-info=", json);
			json.id = JSON.stringify(json);
			return json;
		}
	});
}

