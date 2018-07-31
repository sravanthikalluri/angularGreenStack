/**
 * Created by Jaya Krishna on 12/29/2016.
 */
'use strict';

module.exports = employeeRelationService;

/* @ngInject */
function employeeRelationService(DS, manageEmpUrlConfig) {
	return DS.defineResource({
		name: 'relationService',
		idAttribute: 'relatedPostion',
		basePath: '',
		endpoint: manageEmpUrlConfig.manageBaseUrl +manageEmpUrlConfig.resources.employee + '/{companyId}/{empId}' + manageEmpUrlConfig.resources.employeeRelations,
		deserialize: function(resourceConfig, response) {
			var json = response.data.data;

			json.id = JSON.stringify(json);

			return json;
		}
	});
}
