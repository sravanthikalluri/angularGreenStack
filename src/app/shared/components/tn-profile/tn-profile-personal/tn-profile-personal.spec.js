
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnProfilePersonal = require('./tn-profile-personal.component');

describe('tn-profile-personal component', function (){
	var $scope,ctrl,$state;
	beforeEach(function() {
		var mock$stateService=function(){
			return {
				go: function () {

				}
			}
		};
		var moduleName = 'trinet.shared.components.tn-profile-personal';


		angular
			.module(moduleName, [])
			.service('$state',mock$stateService)
			.component('tnProfilePersonal', tnProfilePersonal);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, $componentController,_$state_){
		$scope = $rootScope.$new();
		$state=_$state_;
		var locals = {
			$scope: $scope,
			$state:$state
		};
		ctrl = $componentController('tnProfilePersonal', locals ,null);
	}));

	/*ctrl.tootleLink(index,data);*/
	it('should go to edit-profile-personal work page',function() {
		ctrl.edit();
	});

});

