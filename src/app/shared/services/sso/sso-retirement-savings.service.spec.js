'use strict';

var angular = require('angular');
require('angular-mocks');

var ssoRetirementSavings = require('./sso-retirement-savings.service');

describe('sso-retirement-savings service', function() {

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
		var moduleName = 'trinet.shared.services.sso';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('ssoRetirementSavings', ssoRetirementSavings);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_ssoRetirementSavings_,_DS_, $q,$rootScope) {
		ssoRetirementSavings = _ssoRetirementSavings_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();

	}));

	it('should return a value',function() {
	});

});
