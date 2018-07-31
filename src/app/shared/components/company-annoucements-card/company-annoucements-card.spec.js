'use strict';

var angular = require('angular');
require('angular-mocks');

var companyAnnouncementsCard = require('./company-annoucements-card.component');

describe('company-announcements-card component', function() {
	var $scope;
	var ctrl;
	var DS,$filter,$state;
	var deferred;
	var results= [{
		"res": {
			"keyName": ""
		},
		"announcement":{
			"title":"announcement Card"
		},
		"title":"announcement card"
	}];


	beforeEach(function() {
		var mockDSService=function() {

		};
		var mockFilterService=function() {

		};
		var mock$stateService=function(){
			return {
				transitionTo: function () {

				}
			}
		};
		var moduleName = 'trinet.shared.components.company-annoucements-card';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$filter',mockFilterService)
			.service('$state',mock$stateService)
			.component('companyAnnouncementsCard', companyAnnouncementsCard);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_$filter_,_DS_,_$state_,$q) {
		var locals;
		$scope = $rootScope.$new();
		$filter=_$filter_;
		DS=_DS_;
		$state=_$state_;

		deferred = $q.defer();


		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			DS:DS,
			$filter:$filter,
			$state:$state
		};

		// Initialize Component Controller
		ctrl = $componentController('companyAnnouncementsCard', locals, null);
	}));


	it('should initilize the components',function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
	});
	it('should set announcements to zero',function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.reject(results);
		$scope.$digest();
	});
	it('should show announcements card',function() {
		ctrl.setFullCurrentAnnouncements=[{
			"title":"announcement card",
			"isShowMore":"true",
			"isShowLess":"false"

		},
			{
				"title":"announcement card",
				"isShowMore":"true",
				"isShowLess":"false"

			}];
		ctrl.showMore();
	});
	it('should show announcements card if title >65',function() {
		ctrl.setFullCurrentAnnouncements=[{
			"title":"announcement card  greater than 65 announcement card  greater than 65 announcement card  greater than 65",
			"isShowMore":"true",
			"isShowLess":"false"

		},
			{
				"title":"announcement card",
				"isShowMore":"true",
				"isShowLess":"false"

			}];

		ctrl.showMore();
	});
	/*it("should display more info",function(){

		ctrl.currentAnnouncements = [ {
			title : "company announcement"
		}];

		ctrl.more(announcement,2);
	});
*/
	it("should display less info",function(){
		var element;
		var index=1;
		var announcement= {"title":"company announcements company announcements company announcements company announcements"};

	/*	element = $compile('<a id="more">more</a>')($scope);
		$scope.$digest();*/
		ctrl.less(announcement,index);


	});
	it('should show announcements page',function(){
		ctrl.showAnnouncements();
	});
	it('should show loading the page', inject(function( $timeout ) {
		$timeout.flush();
	}));

});
