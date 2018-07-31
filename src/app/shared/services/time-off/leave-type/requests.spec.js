'use strict';

var angular = require('angular');


require('angular-mocks');

var Requests = require('./requests.service');

describe('Requests service', function() {

	var DS;
	var deferred;
	var $scope;
	var CurrentCompanyIdCookie;
	var companyNameService;
	var moment;

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
		var mockMomentService=function() {
			return function(){

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
		var moduleName = 'trinet.shared.services.time-off.requests';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('moment',mockMomentService)
			.service('CurrentCompanyIdCookie',CurrentCompanyIdCookieService)
			.service('companyNameService',mockCompanyNameService)
			.service('Requests', Requests);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Requests_,_DS_,_moment_,_CurrentCompanyIdCookie_,_companyNameService_, $q,$rootScope) {
		Requests = _Requests_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moment=_moment_;
		CurrentCompanyIdCookie=_CurrentCompanyIdCookie_;
		companyNameService=_companyNameService_;

		deferred=$q.defer();

	}));
	it('should return a value', function () {
		Requests.findAll.before(function (a, b) {});
	})

});
