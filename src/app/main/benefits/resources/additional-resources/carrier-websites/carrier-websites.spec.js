'use strict';

var angular = require('angular');
require('angular-mocks');

var carrierWebsites = require('./carrier-websites.component');

describe('carrier-websites component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'num': 'num',
		'DS': 'DS',
		mockDSService: function () {
			return {}
		},
		moduleName: 'trinet.main.benefits.carrier-websites',


		locals: {}
	};

	beforeEach(function () {


		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.component('carrierWebsites', carrierWebsites);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController, _DS_) {

		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = $componentController;
		obj['DS'] = _DS_;
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('carrierWebsites', obj.locals, null);
	}));
	it('should initilize the controller', function () {
		obj['ctrl'].$onInit();

	});


	it('should return  array of  numbers controller', function () {
		obj['ctrl'].getPdfLink(obj['num']);
		/*expect(ctrl.getPdfLink(num)).toHaveBeenCalled();*/
	});
	/*it('should log after timeout', inject(function ($timeout) {
	 $timeout.flush();

	 expect(console.log).toHaveBeenCalledWith('mycomponent after timeout');
	 }));
	 */
});


