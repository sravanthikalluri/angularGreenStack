'use strict';

var angular = require('angular');
require('angular-mocks');
var w4PdfLinks = require('./w4-pdf-links.component');

describe('w4-pdf-links component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'app.main.money.taxes.w4-elections-card.w4-elections-table.w4-pdf-links',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('w4PdfLinks', w4PdfLinks);

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
		obj['ctrl'] = obj['$componentController']('w4PdfLinks', obj.locals, null);
	}));
	it('onInit function', function () {
		obj['ctrl'].$onInit();
	});


});

