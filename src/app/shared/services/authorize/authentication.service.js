'use strict';

module.exports = AuthenticationService;

/* @ngInject */
function AuthenticationService(DS, DSHttpAdapter, $rootScope, $timeout, UserServiceLocal) {
	var service = {};

	service.performSignonWithEmployeeID = function(employeeID, password, callback) {
		$timeout(function () {
			UserServiceLocal.fetchByEmployeeID(employeeID)
				.then(function(user) {
					handleSingonResponse(user, password, callback)
				});
		}, 1000);
	}

	service.performSignonWithSSN = function(ssn, password, callback) {
		console.log(ssn, password, callback, ';;;;;;;;;;;;;;');
		$timeout(function () {
			UserServiceLocal.fetchBySSN(ssn)
				.then(function(user) {
					handleSingonResponse(user, password, callback)
				});
		}, 1000);
	}

	service.performSignonWithCustomID = function(customID, password, callback) {
		$timeout(function () {
			UserServiceLocal.fetchByCustomID(customID)
				.then(function(user) {
					handleSingonResponse(user, password, callback)
				});
		}, 1000);
	}

	function handleSingonResponse(user, password, callback) {
		var response;
		if (user !== null && user.password === password) {
			response = { success: true };
		} else {
			response = { success: false, message: 'Username or password is incorrect' };
		}
		callback(response);
	}

	return service;
}
