'use strict';

var angular = require('angular');


require('angular-mocks');

var LeaveType = require('./leave-type.service');

describe('LeaveType service', function() {

	var DS;
	var deferred;
	var $scope;
	var CurrentCompanyIdCookie;
	var companyNameService;

	beforeEach(function() {
		var mockDSService=function() {
			return {
				defineResource: function () {
					return {
						findAll: {
							before: function (func) { func(1, 2); }
						}
					}
				},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}
			}
		};
		var CurrentCompanyIdCookieService=function() {
			return {
				createCurrentCompanyIdCookie: function () {}
			}

		};
		var mockCompanyNameService=function() {
			return {
				getCompanyId: function () {}
			}

		};
		var moduleName = 'trinet.shared.services.time-off.leave-type';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('CurrentCompanyIdCookie',CurrentCompanyIdCookieService)
			.service('companyNameService',mockCompanyNameService)
			.service('LeaveType', LeaveType);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_LeaveType_,_DS_,_CurrentCompanyIdCookie_,_companyNameService_, $q,$rootScope) {
		LeaveType = _LeaveType_;
		$scope = $rootScope.$new();
		DS=_DS_;
		CurrentCompanyIdCookie=_CurrentCompanyIdCookie_;
		companyNameService=_companyNameService_;

		deferred=$q.defer();
	}));

	it('should return a value', function () {
		LeaveType.findAll.before(function (a, b) {});
	})

});
