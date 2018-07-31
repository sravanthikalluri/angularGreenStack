
 'use strict';

 var angular = require('angular');
 var moment=require('moment');
 require('angular-mocks');

 var addProxyModal = require('./addProxy-modal.component');

 describe('addProxy-modal component', function() {
 var $scope;
 var ctrl;
 var results = { data: {} };
 var saveDeferred;
 var ctrl;
 var DS;
 var formName= {
		 $valid: true
	 };
	var mockData= {
		"activeList":{
			employees: [
				{
					employeeId: 123
				}
			]
		}
	 };

 beforeEach(function() {

	 var mockMomentService = function() {
		 return function(dateString) {
			 return moment(dateString);
		 };
	 };
	 var mock$uibModalService = function () {
	 	return {
	 		open: function () {

			}
		}
	 };

 var DS = function() {
 return {};
 };


 var moduleName = 'trinet.main.settings.proxies-card';
 var mockDSService = function(){ return {}};
 var mockgsoService = function(){ return {
	 getAppConfig: function () {
		 return {
			 userId: 123
		 }
	 },
	 getUtilService: function () {
		 return {
			 emailValidity: function () {
				 return {}
			 }
		 }
	 }
 }};
 var mockmoment = function(){ return {}};
 /*var mockUIBModalService = function(){ return {}};*/
 angular
 .module(moduleName, [])
 .component('addProxyModal', addProxyModal)
 .service('DS', mockDSService)

	 .service('moment', mockMomentService)
	 .service('$uibModal', mock$uibModalService)
	 .service('gso', mockgsoService);

 angular.mock.module(moduleName);
 });

 beforeEach(inject(function($q,$rootScope, $componentController,  _DS_,_moment_) {
 var locals;
 $scope = $rootScope.$new();
 DS = _DS_;

 saveDeferred = $q.defer();

 DS.find=jasmine.createSpy().and.returnValue(saveDeferred.promise);
 DS.findAll=jasmine.createSpy().and.returnValue(saveDeferred.promise);
 DS.create=jasmine.createSpy().and.returnValue(saveDeferred.promise);




 // Set up our dependencies to be injected into $componentController
 locals = {
 $scope: $scope,
 DS: DS,
 moment:_moment_,
 };
 // Initialize Component Controller
 ctrl = $componentController('addProxyModal', locals, null);
 }));

 it('should initilize the controller',function() {
 ctrl.$onInit();
 expect(DS.findAll).toHaveBeenCalled();
 saveDeferred.resolve(mockData);
 $scope.$digest();

 });

	 it('should initilize the controller',function() {
		 ctrl.$onInit();
		 expect(DS.findAll).toHaveBeenCalled();
		 saveDeferred.reject(mockData);
		 $scope.$digest();

	 });
/*	 it('should cancel the modal when called', function () {

		 ctrl.onCancel();


	 });*/

	 it('should prompt the controller',function() {

        var formName="formName";
	 	ctrl.onSelect(formName);
	 });


	 it('save function', function($compile) {
	 	$compile('<div class="tn-success-banner"><p>Inner Content </p></div>');
		 ctrl.onSave(formName);
		 $scope.$digest();
	 });
	 it('should save the controller',function($compile) {
		 $compile('<div class="tn-success-banner"><p>Inner Content </p></div>');
		 ctrl.onSave({$valid: true});
		 expect(DS.create).toHaveBeenCalled();
		 saveDeferred.resolve(mockData);
		 $scope.$digest();
	 });

	 it('should save the controller',function($compile) {
		 $compile('<div class="tn-error-banner"><p>Inner Content </p></div>');
		 ctrl.onSave({$valid: true});
		 expect(DS.create).toHaveBeenCalled();
		 saveDeferred.reject(mockData);
		 $scope.$digest();
	 });


/*
 it('should have to timeout function', inject(function($timeout) {

 ctrl.parentCtrl= {
		 "reloadCard":[
			/!* {
				 "message":"modal data message"
			 }*!/
		 ]
	 };

	 ctrl.callParentReloadCard();

		 $timeout.flush();

	 }));
*/



 });


