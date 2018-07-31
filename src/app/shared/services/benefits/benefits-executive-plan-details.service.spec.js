'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsExecutivePlanDetailsService = require('./benefits-executive-plan-details.service');

describe('BenefitsExecutivePlanDetailsService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-executive-plan-details';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsExecutivePlanDetailsService', BenefitsExecutivePlanDetailsService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsExecutivePlanDetailsService_,_DS_, $q,$rootScope) {
		BenefitsExecutivePlanDetailsService = _BenefitsExecutivePlanDetailsService_;
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
