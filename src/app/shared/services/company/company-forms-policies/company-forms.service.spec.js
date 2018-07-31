'use strict';

var angular = require('angular');


require('angular-mocks');

var CompanyFormsService = require('./company-forms.service');

describe('CompanyFormsService service', function() {

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

		var moduleName = 'trinet.shared.services.company-forms';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('CompanyFormsService', CompanyFormsService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_CompanyFormsService_,_DS_, $q,$rootScope) {
		CompanyFormsService = _CompanyFormsService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
