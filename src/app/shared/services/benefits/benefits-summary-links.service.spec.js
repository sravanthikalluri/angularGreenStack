'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsSummaryLinksService = require('./benefits-summary-links.service');

describe('BenefitsSummaryLinksService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-summary-links';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsSummaryLinksService', BenefitsSummaryLinksService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsSummaryLinksService_,_DS_, $q,$rootScope) {
		BenefitsSummaryLinksService = _BenefitsSummaryLinksService_;
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
