'use strict';

var angular = require('angular');
require('angular-mocks');

var tnWorkInboxService = require('./work-inbox.service');

describe('work-inbox service', function() {

	var DS,companyUrlConfig;
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
		var mockCompanyUrlConfig = function () {
			return {resources : {
				inbox : " "
				}
			}
		};

		var moduleName = 'trinet.shared.services.time-off.current-company-id-cookie';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('companyUrlConfig',mockCompanyUrlConfig)
			.service('tnWorkInboxService', tnWorkInboxService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_tnWorkInboxService_,_DS_,_companyUrlConfig_, $q,$rootScope) {
		tnWorkInboxService = _tnWorkInboxService_;
		DS=_DS_;
		companyUrlConfig=_companyUrlConfig_;
		$scope = $rootScope.$new();
		deferred=$q.defer();
		DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));

	it('should return a value',inject(function(tnWorkInboxService) {

	}));

});
