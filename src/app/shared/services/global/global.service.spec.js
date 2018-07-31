/*
'use strict';

var angular = require('angular');


require('angular-mocks');

var companyNameService = require('./company-name.service');

describe('companyNameService service', function() {

	var DS;
	var deferred;
	var $scope;
	var CurrentCompanyIdCookie;
	beforeEach(function() {
		var mockDSService=function() {
			return {
				/!*defineResource: function () {},
				 find: function () {
				 return {
				 data: {
				 data: {}
				 }
				 }
				 }*!/
			}
		};
		var mockCurrentCompanyIdCookie=function() {
			return {};
		}

		var moduleName = 'trinet.shared.services.company-name';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('CurrentCompanyIdCookie',mockCurrentCompanyIdCookie)
			.service('companyNameService', companyNameService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_companyNameService_,_DS_, $q,$rootScope,_CurrentCompanyIdCookie_) {
		companyNameService = _companyNameService_;
		CurrentCompanyIdCookie=_CurrentCompanyIdCookie_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
*/
