'use strict';

var angular = require('angular');
var moment=require('moment');
require('angular-mocks');

var tnTable = require('./tn-table.component');

describe('tn-table component', function() {
	var $scope;
	var ctrl;


	beforeEach(function() {
		var mockMomentService = function() {
			return function(dateString) {
				return moment(dateString);
			};
		};
		var moduleName = 'trinet.core.components.tn-table';

		angular
			.module(moduleName, [])
			.service('moment',mockMomentService)
			.component('tnTable', tnTable);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		var locals;
		$scope = $rootScope.$new();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			moment:moment
		};

		// Initialize Component Controller
		ctrl = $componentController('tnTable', locals, {
			from : "orgChart",
			canSelectRow : "true",
			data:{indexOf : function () {

			}
			},
			selectedRowChange : function () {

			},
			dataProperties: [{length : 1 }]
		});

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
		ctrl.dataProperties = [];
		ctrl.orderBy();
	});
	it('should onRowSelected', function () {
		var item = " ", sortedIndex = 1;
		ctrl.onRowSelected(item,sortedIndex);
	});

	it('dateRangeFilter function',function(){
		ctrl.filter={"filterOnField":"",
			"startDate":"",
			"endDate":""
		};
		ctrl.dateRangeFilter();
	});

});

