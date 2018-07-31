'use strict';

var angular = require('angular');


require('angular-mocks');

var BenefitsCarrierContactsService = require('./benefits-carrier-contacts.service');

describe('BenefitsCarrierContactsService service', function() {

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

		var moduleName = 'trinet.shared.services.benefits-carrier-contacts';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('BenefitsCarrierContactsService', BenefitsCarrierContactsService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_BenefitsCarrierContactsService_,_DS_, $q,$rootScope) {
		BenefitsCarrierContactsService = _BenefitsCarrierContactsService_;
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
