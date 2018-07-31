
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTnTabsController = require('./tn-tabs.component');

describe('tn-tabs component', function () {
	var ctrl;
	var $scope;
	var $element;
	var $timeout;
	beforeEach(function () {

		var moduleName = 'trinet.core.components.tn-tabs';
		var mock$element = function () {
			return {};
		};
	/*	var mock$timeout = function () {
			return {};
		};*/
		angular
			.module(moduleName, [])
			.service('$element',mock$element)
		//	.service('$timeout',mock$timeout)
			.component('tnTnTabsController', tnTnTabsController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_$element_,_$timeout_) {
		$scope = $rootScope.$new();
		$element=_$element_;
		$timeout=_$timeout_;

		var locals = {
			$scope: $scope,
			$element:$element,
			$timeout:$timeout,
		};
		ctrl = $componentController('tnTnTabsController', locals, null);
	}));
/*	it('ctrl variables should be with mock data objects',inject(function($timeout){
		ctrl.$onInit();
		$timeout.flush();
	}));*/
     it('component Init()',function () {
		 ctrl.$onInit();
	 })
	it('ctrl variables should be with mock data objects',function(){
		var tab = 1;
		ctrl.tabs = {
			length: 0
		};
		ctrl.addTab(tab);
	});
	it('ctrl variables should be with mock data objects',function(){
		var tabIndex = 1;
		ctrl.tabs = {
			length: 0
		};
		ctrl.setActiveTab(tabIndex);
	});

});
