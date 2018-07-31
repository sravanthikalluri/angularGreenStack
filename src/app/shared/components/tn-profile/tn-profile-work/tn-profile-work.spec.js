
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnProfileWork = require('./tn-profile-work.component');

describe('tn-profile-work component', function (){
	var $scope,ctrl,$state ,gso;

	beforeEach(function() {
		var mock$stateService=function(){
			return {
				go: function () {

				}
			}
		};
		var mockgso = function () {
			return {
				getAppConfig : function(){
					return {
					profilePicture : ""
					}
				}
			}

		};
		var moduleName = 'trinet.shared.components.tn-profile-work';


		angular
			.module(moduleName, [])
			.service('$state',mock$stateService)
			.service('gso',mockgso)
			.component('tnProfileWork', tnProfileWork);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, $componentController,_$state_,_gso_){
		$scope = $rootScope.$new();
		$state=_$state_;
		gso=_gso_;
		var locals = {
			$scope: $scope,
			$state:$state,
			gso:gso
		};
		ctrl = $componentController('tnProfileWork', locals ,null);
	}));


	it('should go to edit-profile work page',function() {
		ctrl.edit();
	});

});

