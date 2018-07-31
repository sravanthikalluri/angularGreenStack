'use strict';

var angular = require('angular');
require('angular-mocks');

var tnNoticeItemController = require('./tn-notice-item.component');

describe('tn-notice-item component', function (){
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'gso': 'gso',
		mockgsoService: function () {
			return {
				getUtilService: function () {
					return {
						compIdGen: function () {

						}
					}
				}

			}
		},
		moduleName: 'app.main.benefits.legal-notice.tn-notice-item',


		locals: {}
	};


	beforeEach(function() {


		angular
			.module(obj.moduleName, [])
			.service('gso', obj['mockgsoService'])
			.component('tnNoticeItemController',tnNoticeItemController);


		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, _gso_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['gso'] = _gso_;

		obj.locals = {
			$scope: obj['$scope'],
			gso: obj['gso']
		};


		obj['ctrl'] = obj['$componentController']('tnNoticeItemController', obj.locals, null);
	}));

	it('should intialize controller', function() {
		obj['ctrl'].data = {
			title:'notices'
		};
		obj['ctrl'].$onInit();
	});



});

