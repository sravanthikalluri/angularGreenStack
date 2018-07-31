'use strict';

var angular = require('angular');

require('angular-mocks');

var servicesService = require('./services.service');

describe('services service', function() {
	var DS;
	var DSHttpAdapter;
	var stringUtil;
	var $window;
	var gso;
	var SharedDataService;
	var services;
	beforeEach(function() {
		var mockDSService = function() {
			return {
				bulkEjectAll : function () {
					return {}
				},
				ejectAll: function () {}
			}
		},
		gsoMockService = function () {
			return {
				getAppConfig: function () {
					return {companyId: 'US'};
				}
			}
		},
		SharedDataServiceMock = function () {
			return {
				getAppSharedData: function () {
					return {};
				}
			}
		},
		mock$windowService = function () {
			return {
				sessionStorage: {
					getItem: function () {
						return '123';
					}
				},
				localStorage: {
					getItem: function () {
						return '123';
					}
				}
			}
		},
		moduleName = 'trinet.shared.services';
		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('DSHttpAdapter',mockDSService)
			.service('stringUtil',mockDSService)
			.service('$window',mock$windowService)
			.service('gso',gsoMockService)
			.service('SharedDataService',SharedDataServiceMock)
			.service('services', servicesService);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function (_services_, _DS_, _DSHttpAdapter_, _stringUtil_, _$window_, _gso_, _SharedDataService_) {
		DS = _DS_;
		DSHttpAdapter = _DSHttpAdapter_;
		stringUtil = _stringUtil_;
		$window = _$window_;
		gso = _gso_;
		SharedDataService = _SharedDataService_;
		services = _services_;
	}));

	it('_getKeys function test ',function() {
		services._getKeys();
		console.log(services);
	});

	it('init function test ', function () {
		services.init();
		DS.bulkEjectAll([{}]);
	})

});
