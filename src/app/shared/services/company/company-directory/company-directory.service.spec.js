'use strict';

var angular = require('angular');


require('angular-mocks');

var CompanyDirectoryService = require('./company-directory.service');

describe('CompanyDirectoryService service', function() {

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

		var moduleName = 'trinet.shared.services.company-directory';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('CompanyDirectoryService', CompanyDirectoryService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_CompanyDirectoryService_,_DS_, $q,$rootScope) {
		CompanyDirectoryService = _CompanyDirectoryService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
