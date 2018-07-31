'use strict';

module.exports = CompanyDirectoryService;

/* @ngInject */
function CompanyDirectoryService(DS) {
	return DS.defineResource({
		name: 'company_directory',
		idAttribute: 'id',
		basePath: '',
		deserialize: function(resourceConfig, data) {
			var json = data.data.data;
			//var company_directory_data = json.data[0];
			return{
				id : JSON.stringify(json),
				data : json
			};
		}
	});
}
