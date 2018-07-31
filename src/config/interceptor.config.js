'use strict';

module.exports = interceptorConfig;

/** @ngInject */
function greenStackInterceptor($timeout, $cookies,utilService,$window, $q) {
	return {
		request: function(config) {
			/*var cookie = utilService.getAuthCookieNameFromLocation();
			 var authCookie = $cookies.get(cookie+'BIB');
			 if(authCookie.length >0){
			 return config;
			 }
			 else{
			 utilService.setAlert('alertLoader');
			 localStorage.clear();
			 $window.sessionStorage.clear();
			 $timeout(function () {
			 window.location = window.location.pathname.substring(0, window.location.pathname.length - 1);
			 window.location.reload(true);
			 }, 5000);
			 }*/
			return config;
		},

		requestError: function(config) {
			var myJsonString = JSON.stringify(res);
			return $q.reject(config);
		},

		response: function(res) {
			var myJsonString = JSON.stringify(res);
			return res;
		},

		responseError: function(res) {
			var myJsonString = JSON.stringify(res);
			if(res.status === 401){
			//	utilService.redirectToSSOLogout();
		}
			if(res.status === 400){
				
		}
			if(res.status === 500){
				
		}
			return $q.reject(res);
		}
	}
}
/** @ngInject */
function interceptorConfig($httpProvider) {
	$httpProvider.interceptors.push(greenStackInterceptor);
}
