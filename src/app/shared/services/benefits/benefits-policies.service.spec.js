'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsPoliciesService = require('./benefits-policies.service');

describe('BenefitsPoliciesService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-policies';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsPoliciesService', BenefitsPoliciesService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsPoliciesService_,_DS_, $q,$rootScope) {
		BenefitsPoliciesService = _BenefitsPoliciesService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {
		//DS.find('benefit-options','').then(function(response) {})
		/*expect(DS.defineResource).toHaveBeenCalled();
		 deferred.resolve({});
		 $scope.$digest();*/
	});

});
