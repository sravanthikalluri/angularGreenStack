'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsCobraSummaryService = require('./benefits-cobra-summary.service');

describe('BenefitsCobraSummaryService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-cobra-summary';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsCobraSummaryService', BenefitsCobraSummaryService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsCobraSummaryService_,_DS_, $q,$rootScope) {
		BenefitsCobraSummaryService = _BenefitsCobraSummaryService_;
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
