'use strict';

var angular = require('angular');
require('angular-mocks');

var profileMapCard = require('./profile-map-card.component');

describe('profile-map-card component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'stringUtil':'stringUtil',

			'data': {

			 employeeDetails: {
			 preferredName: 'jk',
			 address: [{
			 address1:'asdfsdf',
			 city:'dasdf',
			 state:'sdfd',
			 postalCode:'dsfs'
			 }],
			 }

			 },

		moduleName: 'app.main.profile',
		stringUtilService: function () {
			return {}
		},
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])


			.service('stringUtil',obj.stringUtilService)

			.component('profileMapCard', profileMapCard);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_,_stringUtil_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
obj['stringUtil']=_stringUtil_;

		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
stringUtil:obj['stringUtil']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('profileMapCard', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function () {

		obj['ctrl'].$onInit();


	});
	it('should log after timeout', inject(function ($timeout) {
		$timeout.flush();

		/*expect(console.log).toHaveBeenCalledWith('mycomponent after timeout');*/
	}));

	it('should get full address', inject(function () {

		obj['ctrl'].getFullAddressHtml();


	}));
	it('should get full address', inject(function () {

		/*obj['ctrl'].getFullAddressHtml(!obj['data']);*/


	}));
});


