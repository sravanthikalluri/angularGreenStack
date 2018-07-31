'use strict';

var angular = require('angular');


require('angular-mocks');

var CompanyPoliciesService = require('./company-policies.service');

describe('CompanyPoliciesService service', function() {

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

		var moduleName = 'trinet.shared.services.company-policies';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('CompanyPoliciesService', CompanyPoliciesService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_CompanyPoliciesService_,_DS_, $q,$rootScope) {
		CompanyPoliciesService = _CompanyPoliciesService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
