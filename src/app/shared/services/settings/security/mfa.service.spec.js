
'use strict';

var angular = require('angular');
require('angular-mocks');

var securityMfa= require('./mfa.service');

describe('mfa service', function() {

	var DS;
	var deferred;
	var $scope;

	beforeEach(function() {
		var mockDSService=function() {
			return {
				defineResource: function () {},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}
			}
		};

		var moduleName = 'trinet.shared.services.settings.security';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('securityMfa', securityMfa);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function (_securityMfa_,_DS_, $q,$rootScope) {
		securityMfa = _securityMfa_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});


