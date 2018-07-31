'use strict';

var angular = require('angular');


require('angular-mocks');

var EmployeeDetailsService = require('./emp-details.service');

describe('EmployeeDetailsService service', function() {

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


		var moduleName = 'trinet.shared.services.emp-details';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('profileUrlConfig',profileUrlConfig)
			.service('EmployeeDetailsService', EmployeeDetailsService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_EmployeeDetailsService_,_DS_, $q,$rootScope,_profileUrlConfig_) {
		EmployeeDetailsService = _EmployeeDetailsService_;
		profileUrlConfig=_profileUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
