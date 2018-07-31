'use strict';

var angular = require('angular');


require('angular-mocks');

var companyNameService = require('./company-name.service');

describe('companyNameService service', function() {

	var DS;
	var deferred;
	var $scope;
	var CurrentCompanyIdCookie;
	var $window;
	var $location;
	var SharedDataService;

	beforeEach(function() {
		var mockDSService=function() {
			return {
				/*defineResource: function () {},
				 find: function () {
				 return {
				 data: {
				 data: {}
				 }
				 }
				 }*/
			}
		};
		var mockCurrentCompanyIdCookie=function() {
			return {};
		}
		var mock$window = function() {

		}
		var mock$location = function() {
			return {};
		}
		var mockSharedDataService = function() {
			return {}
		}

		var moduleName = 'trinet.shared.services.company-name';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('CurrentCompanyIdCookie',mockCurrentCompanyIdCookie)
			.service('$window',mock$window)
			.service('$location',mock$location)
			.service('SharedDataService',mockSharedDataService)
			.service('companyNameService', companyNameService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_companyNameService_,_DS_, $q,$rootScope,_CurrentCompanyIdCookie_,_$window_,_$location_,_SharedDataService_) {
		companyNameService = _companyNameService_;
		CurrentCompanyIdCookie=_CurrentCompanyIdCookie_;
		$scope = $rootScope.$new();
		DS=_DS_;
		$window = _$window_;
		$location = _$location_;
		SharedDataService = _SharedDataService_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));

});
