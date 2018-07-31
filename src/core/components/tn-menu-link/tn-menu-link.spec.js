'use strict';

var angular = require('angular');
require('angular-mocks');
var tnMenuLink = require('./tn-menu-link.component');

describe('tn-menu-link component', function (){
	var obj={
		'$componentController':'$componentController',
		'ctrl':'ctrl',
		'$scope':'$scope',
		'gso':'gso',
		'moneyUrlConfig':'moneyUrlConfig',
		'SharedDataService':'SharedDataService',
		moduleName : 'trinet.core.components.tn-menu-link',
		mockGsoService: function () {
			return {
				getAppConfig : function(){
					return {
				        peoId : "AMB"
				      }
				}
			}
		},
		mockSharedDataService: function () {
			return {
				getAppSharedData: function () {
					return {};
				}
			}
		},
		mockmoneyUrlConfig: function () {

		},
		locals:{}

	}

	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.service('gso', obj['mockGsoService'])
			.service('SharedDataService', obj['mockSharedDataService'])
			.service('moneyUrlConfig', obj['mockmoneyUrlConfig'])
			.component('tnMenuLink', tnMenuLink);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, $q, _$componentController_, _gso_, _SharedDataService_, _moneyUrlConfig_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['gso'] = _gso_;
		obj['moneyUrlConfig'] = _moneyUrlConfig_;
		obj['SharedDataService'] = _SharedDataService_;
		obj.locals = {
			$scope: obj['$scope'],
			gso: obj['gso'],
			SharedDataService: obj['SharedDataService'],
			moneyUrlConfig: obj['moneyUrlConfig']
		};

		obj['ctrl'] = obj['$componentController']('tnMenuLink', obj.locals ,{
			menu:{
				target:"_blank",
				menus:'',
				text:"Settings",
				id:121
			},
			modalInstance:{
				dismiss:function() {
					return {};
				},
				close:function() {
					return {};
				}
			},
			onSelect: function () {

			}

		});

	}));
	it('should select function', function(){
		var event = "";
		obj['ctrl'].select(event);
	});
	// it('should checkForTriNetCloudApps', function () {
	// 	obj['ctrl'].checkForTriNetCloudApps();
	// });

});
