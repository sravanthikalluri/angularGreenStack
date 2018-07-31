'use strict';

var angular = require('angular');
require('angular-mocks');
var moment = require('moment');
var tnTnInputContainerController = require('./tn-input-container.component');

describe('tn-input-container component', function (){
	var obj={
		'$componentController':'$componentController',
		'ctrl':'ctrl',
		'$scope':'$scope',
		'$element':'$element',
		'$timeout':'$timeout',


		moduleName : 'trinet.core.components.tn-input-container',

			mock$element: function () {
			return {
				find : function (input) {

				}

			}
		},

		locals:{}

	}

	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.service('$element', obj['mock$element'])
			.component('tnTnInputContainerController', tnTnInputContainerController);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, $q, _$componentController_, _$element_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['$element'] = _$element_;
		obj.locals = {
			$scope: obj['$scope'],
			$element:obj['$element'],
		};

		obj['ctrl'] = obj['$componentController']('tnTnInputContainerController', obj.locals ,null);
	}));

	it('calling $postLink ', function () {
		var input = {
			length : 1
		};
		var select = {
			length : 2
		};

		obj['ctrl'].$postLink();
	});

	/*it('oninit function', function() {
		obj['ctrl'].payrollData = {
			length: 1
		};

		obj['ctrl'].$onInit();
	});

	it('next function', function() {
		obj['ctrl'].month = {
			clone: function () {

			}
		};
		obj['ctrl'].next();

	});

	it('prev function', function() {
		obj['ctrl'].month = {
			clone: function () {

			}
		};
		obj['ctrl'].prev();
	});

	it('should getDayCls', function () {
		var day = {
			format : ""
		},datesOfInterest = "";
		obj['ctrl'].getDayCls(day,datesOfInterest);
	});
	it('should getDayCls', function () {
		var day = "";
		obj['ctrl'].getEachDayCls(day);
	})*/

});
