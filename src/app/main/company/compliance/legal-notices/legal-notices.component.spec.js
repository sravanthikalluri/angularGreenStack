'use strict';

var angular = require('angular');
require('angular-mocks');
var legalNoticesCompnonet = require('./legal-notices.component');

var obj = {
	'$componentController': '$componentController',
	 moduleName: 'app.main.company.legal-notices',
	'ctrl': 'ctrl',
	'$scope': '$scope',
	'deferred':'deferred',
	'$stateParams': '$stateParams',
	'mockData': {},
	'errorData': {
		data:{
			_error: {message:"error"}
		}
	},
	Mock$window: function () {
		return {
			open: function () {
				return{}
			}
		}
	},
	mockDSService: function () {
		return {}
	},
	locals: {}

};
describe('legal notices component: Testing', function () {

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('$window', obj.Mock$window)
			.service('DS', obj.mockDSService)
			.component('legalNotices', legalNoticesCompnonet);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController, $window ,_DS_,$q) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = $componentController;
		obj['$window'] = $window;
		obj['DS'] = _DS_;
		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj.locals = {
			$scope: obj['$scope'],
			$stateParams: obj['$stateParams']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('legalNotices', obj.locals, null);
	}));

	describe('on init function call' , function () {
		it('on init function call success',function(){
			obj['ctrl'].$onInit();
			expect(obj['DS'] .find).toHaveBeenCalled();
			obj['deferred'].resolve(obj['mockData'])
			obj['$scope'].$digest();
		});
		it('on init function call failure',function(){
			obj['ctrl'].$onInit();
			expect(obj['DS'] .find).toHaveBeenCalled();
			obj['deferred'].reject(obj['errorData'])
			obj['$scope'].$digest();
		});
	});

	describe('openPdf function testing', function () {
		it('open PDF url starts with http', function () {
			var url = "http://xyz.com";
			obj['ctrl'].openPdf(url);
		});
		it('open PDF url starts with http', function () {
			var url = "git://xyz.com";
			obj['ctrl'].openPdf(url);
		});

	});
});
