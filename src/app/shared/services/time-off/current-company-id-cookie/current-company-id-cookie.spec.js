'use strict';

var angular = require('angular');


require('angular-mocks');

var CurrentCompanyIdCookie = require('./current-company-id-cookie.service');

describe('CurrentCompanyIdCookie service', function() {

	var $cookies;
	var deferred;
	var $scope;

	beforeEach(function() {
		var mock$cookies=function() {
			return function () {
			}
		};
		var moduleName = 'trinet.shared.services.time-off.current-company-id-cookie';

		angular
			.module(moduleName, [])
			.service('$cookies',mock$cookies)
			.service('CurrentCompanyIdCookie', CurrentCompanyIdCookie);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_CurrentCompanyIdCookie_,$cookies, $q,$rootScope) {
		CurrentCompanyIdCookie = _CurrentCompanyIdCookie_;
		$scope = $rootScope.$new();
		$cookies=$cookies;
		deferred=$q.defer();

	}));

	it('should return a value',inject(function(CurrentCompanyIdCookie) {
		CurrentCompanyIdCookie.createCurrentCompanyIdCookie('31T');
	}));

});
