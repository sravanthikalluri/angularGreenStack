'use strict';

var angular = require('angular');
require('angular-mocks');
var w4MaritalStatusTooltip = require('./w4-marital-status-tooltip.component');

describe('w4-marital-status-tooltip component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'app.main.money.taxes.w4-elections-card.w4-elections-modal.w4-marital-status-tooltip',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('w4MaritalStatusTooltip', w4MaritalStatusTooltip);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('w4MaritalStatusTooltip', obj.locals, null);
	}));
	it('onInit function', function () {
		obj['ctrl'].$onInit();
	});
	/*it('showTooltip function', function () {
		obj['ctrl'].tooltips = [];
		var item = {
			data:{
				type:''
			}
		}
		obj['ctrl'].showTooltip(item);
	});
	it('hideTooltip function', function () {
		obj['ctrl'].tooltips = [];
		var item = {
			data:{
				type:''
			}
		}
		obj['ctrl'].hideTooltip(item);
	});*/

});

