'use strict';

var angular = require('angular');
require('angular-mocks');

var w4Table = require('./w4-table.component');

describe('w4Table component', function (){
	var $componentController;
	var ctrl = {

	};
	var $scope;
	var element;

	beforeEach(function() {
		var moduleName = 'app.main.money.taxes.w4-card.w4-table';

		var mockElement = function() {
			return {};
		}
		angular
			.module(moduleName, [])
			.service('element',mockElement)
			.component('w4Table', w4Table);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, _$componentController_,_element_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		element = _element_;

		var locals = {
			$scope: $scope,
			$element:element,
		};
		ctrl = $componentController('w4Table', locals ,null);
	}));

	it('should initilize the component',function() {
		ctrl.taxForm = {
			items:[{
				data:{
					type:'State tax'
				}
			},{
				data:{
					type:'Federal tax'
				}
			}]
		}
		ctrl.$onInit();
	});
});
