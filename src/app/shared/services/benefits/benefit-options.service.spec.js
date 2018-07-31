'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitOptions = require('./benefit-options.service');

describe('BenefitOptions service', function() {

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

		var moduleName = 'trinet.shared.services.benefit-options';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitOptions', BenefitOptions);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitOptions_,_DS_, $q,$rootScope) {
		BenefitOptions = _BenefitOptions_;
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
