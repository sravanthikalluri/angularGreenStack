'use strict';

var angular = require('angular');
require('angular-mocks');
var tnMenuToggle = require('./tn-menu-toggle.component');

describe('tn-menu-toggle component', function (){
	var obj={
		'$componentController':'$componentController',
		'ctrl':'ctrl',
		'$scope':'$scope',
		'$state':'$state',
		moduleName : 'trinet.core.components.tn-menu-toggle',
		mock$state: function () {
			return {
				includes:function(p1){

				}
			}
		},

		locals:{}

	}


	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.service('$state', obj['mock$state'])
			.component('tnMenuToggle', tnMenuToggle);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, $q, _$componentController_, _$state_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['$state'] = _$state_;
		obj.locals = {
			$scope: obj['$scope'],
			$state: obj['$state'],
		};

		obj['ctrl'] = obj['$componentController']('tnMenuToggle', obj.locals ,{
			menu:{
				url:''
			},
			modalInstance:{
				dismiss:function() {
					return {};
				},
				close:function() {
					return {};
				}
			},
			onSelect : function () {

			}
		});
	}));

	it('oninit function', function() {
		var $event="", isExternal="", redirectUrl="/sd";
		obj['ctrl'].select($event,isExternal,redirectUrl);
	});


});
