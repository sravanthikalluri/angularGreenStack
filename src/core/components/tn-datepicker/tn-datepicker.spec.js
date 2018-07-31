'use strict';

var angular = require('angular');
require('angular-mocks');
var moment = require('moment');
var tnDatepicker = require('./tn-datepicker.component');

describe('tn-datepicker component', function (){
	var obj={
		'$componentController':'$componentController',
		'ctrl':'ctrl',
		'$scope':'$scope',
		'moment':'moment',
		'utilService':'utilService',

		'month': {
			'clone':''
		},
		/*'key' : {
			forEach : function () {

			}
		},*/
		moduleName : 'trinet.core.components.tn-datepicker',
		mockUtilService: function () {
			return {

			}
		},
		mockMomentService : function() {
			return function (dateString) {
				return moment(dateString);
			}
		},

		locals:{}

	}

	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.service('utilService', obj.mockUtilService)
			.service('moment',obj.mockMomentService)
			.component('tnDatepicker', tnDatepicker);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, $q, _$componentController_, _moment_,_utilService_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['utilService'] = _utilService_;
		obj['moment'] = _moment_;
		obj.locals = {
			$scope: obj['$scope'],
			moment:obj['moment'],
			utilService: obj['utilService'],
		};

		obj['ctrl'] = obj['$componentController']('tnDatepicker', obj.locals ,{
			events: [
				{desc: 'key1'},
				{desc: 'key2'}
			],
			eventKeys: [ {key: 'key1'}, {key: 'key2'}],
			payrollData: [{
				datesOfInterest: 1,
				firstDateOfMonth: 1,
				property: obj.locals.moment().startOf('month').format('L')
			}],
			modalInstance:{
				dismiss:function() {
					return {};
				},
				close:function() {
					return {};
				}
			}
		});
	}));

	it('oninit function', function() {
	/*	obj['ctrl'].payrollData = [{ datesOfInterest : " "}];*/
		obj['ctrl'].$onInit();
	});
/*
	it('next function', function() {
		obj['ctrl'].next();

	});

	it('prev function', function() {
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
