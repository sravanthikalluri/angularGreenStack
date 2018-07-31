'use strict';

var angular = require('angular');
require('angular-mocks');

var contactSection = require('./contact-section.component');

describe('contact-section component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'app.main.edit-profile.edit-profile-work.contact-section',
		emailTypesTemplateConstant: {},
		phoneTypesTemplateConstant: {},
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.constant('emailTypesTemplate', obj.emailTypesTemplateConstant)
			.constant('phoneTypesTemplate', obj.phoneTypesTemplateConstant)
			.component('contactSection', contactSection);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, _emailTypesTemplate_, _phoneTypesTemplate_) {
		obj['$scope'] = $rootScope.$new();
		obj['emailTypesTemplate'] = _emailTypesTemplate_;
		obj['phoneTypesTemplate'] = _phoneTypesTemplate_;
		obj['$componentController'] = _$componentController_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('contactSection', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', inject(function ($timeout) {

		obj['ctrl'].formName = {
			contactSectionForm: {
				$setPristine: function () {
				}
			},
			$setPristine: function () {
				return {};
			}
		};
		obj['ctrl'].$onInit();
		$timeout.flush();
	}));

	it('add function', function () {
		obj['ctrl'].onAdd = function () {
		};
		//obj['ctrl'].add();
	});

	it('update function', function () {
		obj['ctrl'].onUpdate = function () {
		};
		obj['ctrl'].update();
	});

	it('delete function', function () {
		obj['ctrl'].onDelete = function () {
		};
		obj['ctrl'].delete();
	});


});

