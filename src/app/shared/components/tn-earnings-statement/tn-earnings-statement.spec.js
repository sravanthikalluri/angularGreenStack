
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTnEarningsStatementController = require('./tn-earnings-statement.component');

describe('tn-earnings-statement component', function () {
	var ctrl;
	var $scope,DS,$anchorScroll,$filter,deferred;

	beforeEach(function () {

		var moduleName = 'trinet.shared.components.tn-earnings-statement';
        var mockDSService = function () {
			return  {}
		};
        var mock$anchorScroll = function () {
			return {}
		};
        var mock$filter = function () {
			return {}
		};

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$anchorScroll',mock$anchorScroll)
			.service('$filter',mock$filter)
			.component('tnTnEarningsStatementController', tnTnEarningsStatementController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_DS_,_$anchorScroll_,_$filter_,$q) {
		$scope = $rootScope.$new();
		DS=_DS_;
		$anchorScroll=_$anchorScroll_;
		$filter=_$filter_;

		deferred = $q.defer();
		var locals = {
			$scope: $scope,
			DS:DS,
			$anchorScroll:$anchorScroll,
			$filter:$filter
		};
		/*$anchorScroll = jasmine.createSpy(['']).and.returnValue(deferred.promise);*/
		ctrl = $componentController('tnTnEarningsStatementController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
        ctrl.data = {
			header : ''
		};
		ctrl.$onInit();
	});

	it('should do on changes',function(){
		ctrl.witholdingData = {};
		ctrl.$onChanges();
	});

	it('should do on Toggle',function(){
	    var item= '';
	    var key ='';
		ctrl.onToggle(item,key);
	});
	it('should get the colors',function(){
		var color='red';
		ctrl.getColors(color);
	});
	it('should update the heading backgroud',function(){

		var color='red';
		ctrl.updateHeadingsBackground(color);
	});

});
