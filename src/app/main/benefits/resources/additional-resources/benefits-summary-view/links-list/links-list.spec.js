
'use strict';

var angular = require('angular');
require('angular-mocks');

var linksList = require('./links-list.component');

describe('links-list component', function () {




	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'deferred': 'deferred',
		'mockData': {

		},
		'$uibModal':'$uibModal',
		moduleName: 'app.main.benefits.resources.links-list',
		mockDSService: function () {
			return {}
		},
		mockUIBModalService : function()
		{
			return {}
		},

		locals: {}
	};




	beforeEach(function () {




		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.service('$uibModal', obj.mockUIBModalService)
			.component('linksList', linksList);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function ($rootScope, _$componentController_, $q, _DS_,_$uibModal_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['$uibModal'] = _$uibModal_;
		obj['$uibModal'].open = jasmine.createSpy();
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			$uibModal:obj['$uibModal'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('linksList', obj.locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].$onInit();

	});

	it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].openExecutiveModal();
		expect(obj['$uibModal'].open).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);

	});




});

