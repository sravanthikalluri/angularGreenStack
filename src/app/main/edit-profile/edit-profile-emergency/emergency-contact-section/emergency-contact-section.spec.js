'use strict';

var angular = require('angular');
require('angular-mocks');

var emergencyContactSection = require('./emergency-contact-section.component');

describe('emergency-contact-section component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'app.main.edit-profile.edit-profile-emergency.emergency-contact-section',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('emergencyContactSection', emergencyContactSection);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_,_$timeout_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['$timeout']=_$timeout_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('emergencyContactSection', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function () {
		obj['ctrl'].data = {
			dropdown: {
				relationships: [{key: 'contact'}],
				usStates: [{key: 'contact'}],
				caProvinces: [{key: 'contact'}],
				countries: [{key: 'contact'}, {key: 'US'}]
			},

		}
		obj['ctrl'].contact = {
			contactRelationship: 'contact',
			address: {
				state: "contact",
				country: undefined
			},
			sameAddressPerson: 'Y'

		}

		obj['ctrl'].$onInit();
	});
	it('handleCountryChange function ', function () {
		obj['ctrl'].data = {
			dropdown: {
				relationships: [{key: 'contact'}],
				usStates: [{key: 'contact'}],
				caProvinces: [{key: 'contact'}],
				countries: [{key: 'contact'}, {key: 'US'}]
			},

		}
		obj['ctrl'].contact = {
			contactRelationship: 'contact',
			address: {
				state: "contact",
				country: undefined
			},
			sameAddressPerson: 'Y'

		}
		obj['ctrl'].$onInit();
		obj['ctrl'].handleCountryChange();

	});
	it('on delete function ', function () {

		obj['ctrl'].onDelete = function () {
		};
		obj['ctrl'].delete();

	});

	it('should show loading the page', inject(function( $timeout ) {
		$timeout.flush();
	}));

	it('on update function ', function () {
		obj['ctrl'].data = {
			dropdown: {
				relationships: [{key: 'contact'}],
				usStates: [{key: 'contact'}],
				caProvinces: [{key: 'contact'}],
				countries: [{key: 'contact'}, {key: 'US'}]
			},

		}
		obj['ctrl'].contact = {
			contactRelationship: 'contact',
			address: {
				state: "contact",
				country: undefined
			},
			sameAddressPerson: 'Y'

		}
		obj['ctrl'].$onInit();
		obj['ctrl'].onUpdate = function () {
		};
		obj['ctrl'].update('country', 'country', 'contact');
		obj['ctrl'].update('country', false,'contact');
	});

	it('checkAddress function', function () {
		obj['ctrl'].contact = {
			contactRelationship: 'contact',
			address: {
				"state": "CA",
				country: undefined
			},
			sameAddressPerson: 'Y'

		};
		obj['ctrl'].data = {
			dropdown: {
				relationships: [{key: 'contact'}],
				usStates: [{key: 'contact'}],
				caProvinces: [{key: 'contact'}],
				countries: [{key: 'contact'}, {key: 'US'}]
			},

		};
		obj['ctrl'].checkAddress();
	});
	it('checkAddress function', function () {

		obj['ctrl'].contact = {
			contactRelationship: 'contact',
			address: {
				state:'CA',
				country: undefined
			},
			sameAddressPerson: 'N'

		};
		obj['ctrl'].data = {
			dropdown: {
				relationships: [{key: 'contact'}],
				usStates: [{key: 'contact'}],
				caProvinces: [{key: 'contact'}],
				countries: [{key: 'contact'}, {key: 'US'}]
			},

		};
		obj['ctrl'].checkAddress();
	});
});

