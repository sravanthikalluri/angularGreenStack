

module.exports = CompensationService;

/* @ngInject */
function CompensationService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'compensation',
		idAttribute: 'id',
		basePath: '',
		endpoint: profileUrlConfig.profileBase + '{companyId}/{empId}/' + profileUrlConfig.resources.compensation,
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;

			if (data && data.compensationList.length > 0) {
				return {
					id        : JSON.stringify(json),
					compensationList   : data.compensationList
				};
			} else {
				return { id: 1 };
			}
		}
	});
}
