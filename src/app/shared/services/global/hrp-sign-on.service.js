/*
 This class is needed to get the JSESSION ID setup for accessing the Web logic Server
 */

'use strict';
module.exports = hrpSignonService;
/* @ngInject */
function hrpSignonService($http, $q, gso,$cookies, $window, $timeout, DS) {
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
			tSessionId: ""
		},
		logout: function (companyId, personId, authToken, isLogoutMsg) {
			service.gatewayLogout(companyId, personId, authToken, isLogoutMsg);
		},
		login: function (companyId, personId, authToken) {
			service.gatewayLogin(companyId, personId, authToken);
		},
		gatewayLogin: function (companyId, personId, authToken) {

			var gatewayLoginResult = $q.defer();
			service.gatewaySignonData.companyId = companyId;
			service.gatewaySignonData.tSessionId = authToken;
			service.gatewaySignonData.personId = $window.sessionStorage.personId;
			var cookieOptions = {
				path: '/',
				domain: '.hrpassport.com'
			};

			/*
			removing all the seeker cookies.
			$cookies.put("tSessionId", authToken, cookieOptions);
			$cookies.put("User_Company", companyId, cookieOptions);
			$cookies.put("tsessionid", authToken, cookieOptions);
			$cookies.put("userid", $window.sessionStorage.personId, cookieOptions);
			$cookies.put("PsEmplid", $window.sessionStorage.empId, cookieOptions);
			*/
			function doGatewayLogin() {
				$http.post('/trinetGateway/services/v1.0/hrpsessionsignon2', JSON.stringify(service.gatewaySignonData), service.reqConfig)
					.success(function (body) {
						gatewayLoginResult.resolve(body);
						service.signonComplete = true;
							// $http.post('/trinetGateway/services/v1.0/hrpsessionsignon', JSON.stringify(service.gatewaySignonData), service.reqConfig)
							// 	.success(function (body) {
							// 		gatewayLoginResult.resolve(body);
							// 		service.signonComplete = true;
							// 		var cookieOptions = {
							// 			path: '/',
							// 			domain: '.hrpassport.com'
							// 		};
							// 		$cookies.put("userToken", body.hrpsession, cookieOptions);
							// 	})
							// 	.error(function () {
							// 	});
					})
					.error(function () {
					});
			}
			doGatewayLogin();
			return gatewayLoginResult.promise;
		},
		gatewayLogout: function (companyId, personId, authToken, isLogoutMsg) {

			var gatewayLogoutResult = $q.defer();
			service.gatewaySignonData.companyId = companyId;
			service.gatewaySignonData.tSessionId = authToken;
			service.gatewaySignonData.personId = personId;
			var cookieOptions = {
				path: '/',
				domain: '.hrpassport.com'
			};
			// Fire and forget URL
			function doGatewayLogout() {
				// Gateway apps get called from hrp<env>.hrpassport.com
				// or www.hrpassport.com, so sign off from that url.

				var msvConfig = DS.get('microservices-config','0');
				// read external properties
				var hrpURL = msvConfig.hrpUrl;


				$http.post(hrpURL + '/trinetGateway/services/v1.0/hrpsessionsignoff2', JSON.stringify(service.gatewaySignonData), service.reqConfig)
					.success(function (body) {
						gatewayLogoutResult.resolve(body);

						//Removed /api-cache/v1/cache/{employeeId}/flush-cache for 404 reductions
						gso.getUtilService().logout(isLogoutMsg);
					})
					.error(function () {
						gso.getUtilService().logout(isLogoutMsg);
					});
			}
			doGatewayLogout();
			return gatewayLogoutResult.promise;
		}
	};
	return service;
}

