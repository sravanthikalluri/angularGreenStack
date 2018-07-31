'use strict';

var angular = require('angular');
require('angular-mocks');

var tnNoticeCard = require('./tn-notice-card.component');

describe('tn-notice-card component', function (){



	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'deferred': 'deferred',
		'mockData': {

		},
		moduleName: 'app.main.benefits.legal-notice.tn-notice-card',
		mockDSService: function () {
			return {}
		},

		locals: {}
	};

	beforeEach(function() {


		angular

			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)

			.component('tnNoticeCard',tnNoticeCard)


		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_,$q, _DS_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);





		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],

		};


		obj['ctrl'] = obj['$componentController']('tnNoticeCard', obj.locals, null);
	}));

	it('ctrl variables should be with mock data objects', function() {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();

	});



});
