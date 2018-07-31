'use strict';

var angular = require('angular');
require('angular-mocks');

var tnHoursEarningsTable = require('./tn-hours-earnings-table.component');

describe('tn-hours-earnings-table component', function() {
	var $scope;
	var ctrl;


	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-hours-earnings-table';

		angular
			.module(moduleName, [])
			.component('tnHoursEarningsTable', tnHoursEarningsTable);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		var locals;
		$scope = $rootScope.$new();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,

		};

		// Initialize Component Controller
		ctrl = $componentController('tnHoursEarningsTable', locals, null);
	}));
	it('should initilize the component',function() {
		ctrl.canSelectRow=true;
		ctrl.$onInit();
	});
	it('should displa page if selectrow is false',function() {
		ctrl.canSelectRow=false;
		ctrl.$onInit();
	});
	it('should enable a close alert',function() {
		ctrl.updateHeadingsBackground=function() {

		};
		ctrl.onUpdateHeadingBg ();
	});
	it('should return datatype (Number)',function() {
		var value="12";
		ctrl.getDataType(value);
	});
	it('should return datatype (HTML)',function() {
		var value="<html></html>";
		ctrl.getDataType(value);
	});
	it('should return datatype (date)',function() {
		var value="02-02-2015";
		ctrl.getDataType(value);
	});
	it('should return datatype ()',function() {

		ctrl.getDataType();
	});


	it('should display data of selected row',function() {
		ctrl.canSelectRow=function(){
			return true;
		};
		ctrl.data=[{

		},{}];
		ctrl.selectedRowChange=function(){

		}
		ctrl.onRowSelected();
	});

	it('should display data of selected row',function() {
		ctrl.data=["20","23"];

		ctrl.dataProperties=[
		];

		ctrl.orderBy();
	});
});

