'use strict';

module.exports = MicroservicesConfigService;

/* @ngInject */
function MicroservicesConfigService(DS,gso, loginUrlConfig) {
	return DS.defineResource({
		name: 'microservices-config',
		idAttribute: 'id',
		basePath: '',
		endpoint:   "/microservices-config/config.json",
		deserialize: function(resourceConfig, response) {
			// console.log("DESERILIATE microservice...", response.data);
			var json = response.data;
			//json.id = JSON.stringify(json);
			json.id = '0';
			return json;
		}
	});
}

