'use strict';

module.exports = RelationShipsService;

/* @ngInject */
function RelationShipsService(DS) {
	return DS.defineResource({
		name: 'relation-ships',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-config/v1/global/relationships',
		deserialize: function(resourceConfig, data) {
			var data = data.data;
			return{
				id : JSON.stringify(data),
				relationShips: data.data
			};
		}
	});
}
