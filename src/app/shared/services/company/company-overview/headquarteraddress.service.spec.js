'use strict';

var angular = require('angular');


require('angular-mocks');

var HeadQuartersaddress = require('./headquartersaddress.service');

describe('headquartersaddress service', function() {

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
							data: {

							}
						}
					}
				}
			}
		};

		var mockcompanyUrlConfig= function (){
			return {};
		};

		var moduleName = 'trinet.shared.services.company-overview';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('companyUrlConfig',mockcompanyUrlConfig)
			.service('HeadQuartersaddress', HeadQuartersaddress);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_HeadQuartersaddress_,_DS_, $q,$rootScope,_companyUrlConfig_) {
		HeadQuartersaddress = _HeadQuartersaddress_;
		companyUrlConfig=_companyUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
