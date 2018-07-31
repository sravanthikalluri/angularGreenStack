'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsStatePlansService = require('./benefits-state-plans.service');

describe('BenefitsStatePlansService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-state-plans';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsStatePlansService', BenefitsStatePlansService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsStatePlansService_,_DS_, $q,$rootScope) {
		BenefitsStatePlansService = _BenefitsStatePlansService_;
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
