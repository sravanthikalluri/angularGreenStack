'use strict';

module.exports = WorkService;

/* @ngInject */
function WorkService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'work',
		idAttribute: 'id',
		basePath: '',
		endpoint: profileUrlConfig.profileBase + '{companyId}/{empId}/'+ profileUrlConfig.resources.workprofile,
		deserialize: function(resourceConfig, response) {
			// var json = response.data;
			// var data = json.data.activeWorkProfileList[0];
            //
			// // Strip out non-numeric characters
			// data.workPhone = data.workPhone ? data.workPhone.replace(/\D/g,'') : null;
            //
			// return data;
			var json = response.data;
			return{
				id : JSON.stringify(json),
				data: json.data.activeWorkProfileList[0]
			};
		}
	});
}
