'use strict';

var angular = require('angular');
require('angular-mocks');

var notices = require('./notices.service');

describe('notices service', function() {

	var DS;
	var deferred;
	var $scope;
    var manageEmpUrlConfig;

	beforeEach(function() {
		var mockDSService=function() {
			return {
				defineResource: function () {
					var deserialize=function() {
						return {
							id : "",
							res: ""
						}
					};
					return deserialize();
				},
			}
		};
		var mockmanageEmpUrlConfig=function() {

			return {
				"profileBase":"",
				resources:
					{
						"compensation":""
					}
			}


		};

		var moduleName = 'trinet.shared.services.notices';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('manageEmpUrlConfig',mockmanageEmpUrlConfig)
			.service('notices', notices);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_notices_,_DS_, $q,$rootScope,_manageEmpUrlConfig_) {
		notices = _notices_;
		manageEmpUrlConfig=_manageEmpUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
