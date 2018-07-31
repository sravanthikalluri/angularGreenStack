'use strict';

module.exports = ProxyService;

/* @ngInject */
function ProxyService(DS,moment) {
	return DS.defineResource({
		name: 'proxy',
		idAttribute: 'id',
		basePath: '',
		endpoint: 'api-profile/v1/security/{companyId}/{empId}/proxy',
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			if (response.config.method === 'GET') {
				var result = [];
				result.push({
					id: JSON.stringify(json),
					activeList: json.data.activeList,
					historyList : json.data.historyList
				});
				return result;
			} else {
				var data= {
					id: '1',
					response: response.data
				 };
				return data;
			}
		}
	});
}
