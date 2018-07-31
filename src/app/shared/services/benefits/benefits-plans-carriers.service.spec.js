'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsPlansCarriersService = require('./benefits-plans-carriers.service');

describe('BenefitsPlansCarriersService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-plans-carriers';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsPlansCarriersService', BenefitsPlansCarriersService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsPlansCarriersService_,_DS_, $q,$rootScope) {
		BenefitsPlansCarriersService = _BenefitsPlansCarriersService_;
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
