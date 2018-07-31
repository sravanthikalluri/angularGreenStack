'use strict';

var angular = require('angular');
require('angular-mocks');

var biAlerts = require('./bi-alerts.service');

describe('bi-alerts service', function() {

	var DS;
	var deferred;
	var $scope;
    var companyUrlConfig;

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
		var mockcompanyUrlConfig = function () {
			return {
				resources : {
					alerts : '',
					biAlerts: ''
				}
			}
		};

		var moduleName = 'trinet.shared.services.bi-alerts';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('companyUrlConfig', mockcompanyUrlConfig)
			.service('biAlerts', biAlerts)

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (biAlerts,_DS_, $q,$rootScope,_companyUrlConfig_) {
		biAlerts = biAlerts;
		$scope = $rootScope.$new();
		companyUrlConfig=_companyUrlConfig_;
		DS=_DS_;

		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
