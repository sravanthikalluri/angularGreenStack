'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitPolicyLinksService = require('./benefit-policy-links.service');

describe('BenefitPolicyLinksService service', function() {

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

		var moduleName = 'trinet.shared.services.benefit-policy-links';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitPolicyLinksService', BenefitPolicyLinksService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitPolicyLinksService_,_DS_, $q,$rootScope) {
		BenefitPolicyLinksService = _BenefitPolicyLinksService_;
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
