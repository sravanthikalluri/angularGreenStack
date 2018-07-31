'use strict';

var angular = require('angular');
require('angular-mocks');

var legalNotice = require('./legal-notice.component');

describe('legal-notice component', function (){
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		mockDSService: function () {
			return {}
		},
		moduleName: 'app.main.benefits.legal-notice.legal-notice',


		locals: {}
	};



	beforeEach(function() {


		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.component('legalNotice',legalNotice)


		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, _DS_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS']
		};

		obj['ctrl'] = obj['$componentController']('legalNotice', obj.locals, null);
	}));

	it('should intialize the controller', function() {
		obj['ctrl'].$onInit();


	});



});

