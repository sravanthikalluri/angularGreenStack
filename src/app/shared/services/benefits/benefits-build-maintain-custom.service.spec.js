'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsBuildMaintainCustomService = require('./benefits-build-maintain-custom.service');

describe('BenefitsBuildMaintainCustomService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-build-maintain-custom';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsBuildMaintainCustomService', BenefitsBuildMaintainCustomService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsBuildMaintainCustomService_,_DS_, $q,$rootScope) {
		BenefitsBuildMaintainCustomService = _BenefitsBuildMaintainCustomService_;
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
