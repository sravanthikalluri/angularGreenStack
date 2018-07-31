/*
 This class is needed to get the JSESSION ID setup for accessing the Web logic Server
 */

'use strict';
module.exports = hrpUserToken;
/* @ngInject */
function hrpUserToken($http, $q, gso,$cookies, $window) {
	var service = {
		reqConfig: {
			transformResponse: function (data) {
				return {
					hrpsession: data
				};
			}
		},
		signonComplete: false,
		gatewaySignonData: {
			companyId: "",
			tSessionId: "",
			personId: ""
		},
		login: function (companyId, personId, authToken) {
			service.gatewayLogin(companyId, personId, authToken);
		},
		gatewayLogin: function (companyId, personId, authToken) {

			var gatewayLoginResult = $q.defer();
			service.gatewaySignonData.companyId = companyId;
			service.gatewaySignonData.tSessionId = authToken;
			service.gatewaySignonData.personId = $window.sessionStorage.personId;

			function doGatewayLogin() {
				$http.post('/trinetGateway/services/v1.0/hrpsessionsignon', JSON.stringify(service.gatewaySignonData), service.reqConfig)
					.success(function (body) {
						gatewayLoginResult.resolve(body);
						service.signonComplete = true;
						var cookieOptions = {
							path: '/',
							domain: '.hrpassport.com'
						};
						$cookies.remove("userToken");
						$cookies.remove("JSESSIONID",{
							path: '/'
						});
						$cookies.remove("tsessionid");
						$cookies.remove("userid");
						$cookies.remove("User_Company");

						$cookies.put("userToken", body.hrpsession, cookieOptions);
						//$cookies.put("JSESSIONID", body.hrpsession, cookieOptions);
						$cookies.put("tsessionid", authToken, cookieOptions);
						$cookies.put("userid", $window.sessionStorage.personId, cookieOptions);
						$cookies.put("User_Company", companyId, cookieOptions);


					})
					.error(function () {
					});
			}
			doGatewayLogin();
			return gatewayLoginResult.promise;
		}
	};
	return service;
}
