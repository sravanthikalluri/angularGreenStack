'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsMetLifeService = require('./benefits-met-life.service');

describe('BenefitsMetLifeService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-met-life';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsMetLifeService', BenefitsMetLifeService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsMetLifeService_,_DS_, $q,$rootScope) {
		BenefitsMetLifeService = _BenefitsMetLifeService_;
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
