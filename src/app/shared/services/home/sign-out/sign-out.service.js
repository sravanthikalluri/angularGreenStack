'use strict';

module.exports = SignOutService;

/* @ngInject */
function SignOutService(DS, loginUrlConfig) {
	return DS.defineResource({
		name: 'sign-out',
		idAttribute: 'id',
		basePath: '',
		endpoint:  loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.signOff + "?realm=sw_hrp",
		deserialize: function(resourceConfig, response) {
			var json = response;
			json.id = JSON.stringify(json);
			return json;
		}
	});
}

