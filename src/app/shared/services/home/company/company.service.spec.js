'use strict';

var angular = require('angular');


require('angular-mocks');

var CompanyInfoService = require('./company.service');

describe('CompanyInfoService service', function() {

	var DS;
	var deferred;
	var $scope;
	var profileUrlConfig={
		"resources":{
			"profile":{}
		}
	};

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


		var moduleName = 'trinet.shared.services.company';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('profileUrlConfig',profileUrlConfig)
			.service('CompanyInfoService', CompanyInfoService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_CompanyInfoService_,_DS_, $q,$rootScope,_profileUrlConfig_) {
		CompanyInfoService = _CompanyInfoService_;
		profileUrlConfig=_profileUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
