'use strict';

var angular = require('angular');
require('angular-mocks');

var phoneContact = require('./phone-contact.component');

describe('phone-contact component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'app.main.edit-profile.edit-profile-work.contact-section.phone-contact',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('phoneContact', phoneContact);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('phoneContact', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function () {
		obj['ctrl'].phone = {
			accessType: 'phone'
		};
		obj['ctrl'].data={
			dropdown:{
				accessTypes:[
					{key: 'phone'}
				],
			}

		};
		obj['ctrl'].$onInit();
	});
	it('update function', function () {
		obj['ctrl'].onUpdate = function () {};
		obj['ctrl'].update('foo','bar');
	});
	it('delete function', function () {
		obj['ctrl'].onDelete = function () {};
		obj['ctrl'].delete();
	});
});

