'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsOverviewTemplateService = require('./benefits-overview-template.service');

describe('BenefitsOverviewTemplateService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-overview-template';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsOverviewTemplateService', BenefitsOverviewTemplateService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsOverviewTemplateService_,_DS_, $q,$rootScope) {
		BenefitsOverviewTemplateService = _BenefitsOverviewTemplateService_;
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
