'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsGuideBookService = require('./benefits-guide-book.service');

describe('BenefitsGuideBookService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-guide-book';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsGuideBookService', BenefitsGuideBookService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsGuideBookService_,_DS_, $q,$rootScope) {
		BenefitsGuideBookService = _BenefitsGuideBookService_;
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
