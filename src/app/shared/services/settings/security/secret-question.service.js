'use strict';

module.exports = SecretQuestionService;

/* @ngInject */
function SecretQuestionService(DS) {
	return DS.defineResource({
		name: 'secretQuestion',
		idAttribute: 'question',
		endpoint: '/api-profile/v1/security/{companyId}/{empId}/secret',
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;

			if (response.config.method === 'GET') {
				data.id = JSON.stringify(data);
			} else {
				data= {
					question: '1',
					response: response.data
			  };
			}

			return data;
		}
	});
}
