
'use strict';

var angular = require('angular');
var moment=require('moment');
require('angular-mocks');

var tnDobInput = require('./tn-dob-input.component');

describe('tn-dob-input component', function() {
	var $scope;
	var ctrl;
	var mockForm = { data: {} };
	var saveDeferred;

	var ctrl;

	beforeEach(function() {
		var mockMomentService = function() {
			return function(dateString) {
				return moment(dateString);
			};
		};

		var moduleName = 'trinet.core.components.forms.tn-dob-input';

		angular
			.module(moduleName, [])
			.component('tnDobInput', tnDobInput)
			.service('moment', mockMomentService);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($q,$rootScope, $componentController,_moment_) {
		var locals;
		$scope = $rootScope.$new();

		saveDeferred = $q.defer();
		/*momentService=moment();*/

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			moment:_moment_,
		};

		// Initialize Component Controller
		ctrl = $componentController('tnDobInput', locals, null);
	}));
	it('should initilize the controller',function() {
		ctrl.resolve= {
			"data":[
				{
					"message":"modal data message",
					"payload ": {
						"employeeId":'',
						"effectiveDate": moment().format('YYYY-MM-DD'),
						"currentPassword": '',
						"newPassword": ''
					}
				}
			]
		};
		ctrl.$onInit();

	});
	it('should $postLink function',function() {
		ctrl.formName = [{fieldName : ""}];
		ctrl.$postLink();
	});
	it('update function', function () {
		ctrl.onUpdate=function(){}
		ctrl.update("");
	});
});
