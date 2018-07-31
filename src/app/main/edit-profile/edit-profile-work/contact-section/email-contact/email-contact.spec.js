'use strict';

var angular = require('angular');
require('angular-mocks');

var emailContact = require('./email-contact.component');

describe('email-contact component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'app.main.edit-profile.edit-profile-work.contact-section.email-contact',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('emailContact', emailContact);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;

		// obj.onUpdate.onUpdateSpy  = jasmine.createSpy('onUpdate');
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('emailContact', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function () {
		obj['ctrl'].email = {
			accessType: 'email'
		};
		obj['ctrl'].data={
			dropdown:{
				accessTypes:[
					{key: 'email'}
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

