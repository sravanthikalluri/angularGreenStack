'use strict';

var angular = require('angular');
require('angular-mocks');

var empDetailsAll = require('./emp-details-everything.service');

describe('emp-details-everything service', function() {

	var DS;
	var deferred;
	var $scope;
	var profileUrlConfig;

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
		var mockprofileUrlConfig = function () {
			return {
				resources:
					{
						totalEmpDetails :''
					}
		      }
		};

		var moduleName = 'trinet.shared.services.home.emp-details';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('profileUrlConfig',mockprofileUrlConfig)
			.service('empDetailsAll', empDetailsAll);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_empDetailsAll_,_DS_, $q,$rootScope,_profileUrlConfig_) {
		empDetailsAll = _empDetailsAll_;
		$scope = $rootScope.$new();
		DS=_DS_;
		profileUrlConfig=_profileUrlConfig_;

		deferred=$q.defer();

	}));

	it('should return a value',function() {
	});

});
