'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsSummaryViewPlansService = require('./benefits-summary-view-plans.service');

describe('BenefitsSummaryViewPlansService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-summary-view-plans';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsSummaryViewPlansService', BenefitsSummaryViewPlansService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsSummaryViewPlansService_,_DS_, $q,$rootScope) {
		BenefitsSummaryViewPlansService = _BenefitsSummaryViewPlansService_;
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
