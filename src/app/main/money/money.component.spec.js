/**
 * Created by Sravani on 2/7/2017.
 */


/**
 * Created by Sravani on 2/1/2017.
 */
'use strict';

var angular = require('angular');
require('angular-mocks');

var money = require('./money.component');

describe('money component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
'DS':'DS',
		mockDSService: function () {
			return {
			}
		},


		moduleName: 'app.main.money',
		locals: {}
	};

	beforeEach(function() {

		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.component('money',money);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_DS_) {

		obj['$scope'] = $rootScope.$new();
		obj['$componentController']=$componentController;
obj['DS']=_DS_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
DS:obj['DS']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('money', obj.locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {
			obj['ctrl'].$onInit();



	});

});



