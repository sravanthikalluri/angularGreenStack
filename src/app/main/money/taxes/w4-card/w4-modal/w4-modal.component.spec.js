'use strict';

var angular = require('angular');
var moment=require('moment');
var constants=require('constants');
require('angular-mocks');

var tnW4ModalController = require('./w4-modal.component');

describe('w4Modal component', function (){

	var $componentController;
	var ctrl;
	var $scope;
	var deferred;
	var taxWithholdingForm;
	var taxWithholdingDisabledFields;
	var $uibModal;
	var $filter;
	var $timeout;
	var innerFilterSpy;

	var mockData = {
		taxWithholdings:[
			{"data":"fnf"},
			{"data1":"njsdf"}

		]
	};

	beforeEach(function() {

		var moduleName = 'app.main.money.taxes.w4-card.w4-modal';
		var mockMomentService = function() {
			return function(dateString) {
				return function(dateString) {
					return moment(dateString);
				};
			};
		};
		var mockConstantsService=function() {
			return {
				selectedEffectiveDate: new Date().toString()
			};
		};
		var mockFilterService=function() {

		};

		var mocktaxWithholdingDisabledFields = function () {return{
			statesToUpdateLocalTax:{
				'NE':'T'
			}
		}};
		var mocktaxWithholdingForm = function () {return{}};

		var mock$uibModal = function () {
			return{
          open : function () {
          	return {

          			result : ""

			}
		  }
		}};
		var mock$timeout = function () {return{}};


		angular
			.module(moduleName, [])
			.service('moment',mockMomentService)
			.service('constants',mockConstantsService)
			.service('taxWithholdingForm',mocktaxWithholdingForm)
			.service('taxWithholdingDisabledFields',mocktaxWithholdingDisabledFields)
			.service('$uibModal',mock$uibModal)
			.service('$timeout',mock$timeout)
			.service('$filter',mockFilterService)
	 		.component('tnW4ModalController', tnW4ModalController);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q,_taxWithholdingDisabledFields_,
							   _taxWithholdingForm_,_$uibModal_,_$filter_,_moment_,_constants_,_$timeout_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		taxWithholdingDisabledFields=_taxWithholdingDisabledFields_;
		taxWithholdingForm = _taxWithholdingForm_;
		$uibModal = _$uibModal_;
		$filter=_$filter_;
		moment=_moment_;
		constants=_constants_;
		$timeout=_$timeout_;
		deferred = $q.defer();
		innerFilterSpy = jasmine.createSpy();
		$filter = jasmine.createSpy().and.returnValue(innerFilterSpy);

		/*translate = jasmine.createSpy(['','']).and.returnValue(deferred.promise);*/

		//spy
		/*taxWithholdingForm.fetch = jasmine.createSpy().and.returnValue(deferred.promise);
		taxWithholdingDisabledFields.fetch = jasmine.createSpy().and.returnValue(deferred.promise);*/
		$uibModal.open = jasmine.createSpy();

		var locals = {
			$scope: $scope,
			taxWithholdingForm:taxWithholdingForm,
			taxWithholdingDisabledFields:taxWithholdingDisabledFields,
			$uibModal:$uibModal,
			moment:moment,
			constants:constants,
			$timeout:$timeout,
			$filter:$filter,		};

		ctrl = $componentController('tnW4ModalController', locals ,{
			resolve:{
				data:''
			},
			modalInstance:{
				dismiss:function() {
					return {};
				},
				close:function() {
					return {};
				}
			}
		});
	}));

	it('init()', function () {
		ctrl.$onInit();
	});

	it('component should be initilize', function() {
	 	ctrl.$onInit();
	});
	it('component should be initilize and show confirmation mesage if substantialText is empty', function() {
		ctrl.resolve = {
			data:{
				uniqueTaxes : [{
					id : 0,
					class:''
				}],
				items: [{
					data:{
						type:'State tax',
						payDedCode:'NE',
						maritalStatus:'N'
					}
				}],
				substantialText:'',
				effectiveDate:'10-02-2018'
			}
		};
		ctrl.selectedTab = true;
		ctrl.$onInit();
	});
	it('should getSelectedTabTaxes ' , function() {
		ctrl.data = {
			items: [

			]
		};
		ctrl.selectedTab = {
			type:''
		}
		ctrl.getSelectedTabTaxes();
	})
	 it('should returnDate based on effective date',function() {
		 ctrl.effectiveDate = '13-02-2018';
	 	ctrl.returnDate();
	 });
	it('should file married file single status ',function() {
		var item = {
			data: {
				type:'federal tax',
				maritalStatus:'',
			},
			dropdown:[
				{
					key:'S'
				}
			]
		};
		ctrl.data = {
			items: [
				{
					data:{
					type :"State tax",
					payDedCode : "NE"
			}}]
		};
		ctrl.handleMarriedFileSingle(item);
	});
	it('should file married file single status if tax is StateTax ',function() {
		var item = {
			data: {
				type:'State tax',
				maritalStatus:''
			},
			dropdown:[{
				key:'S'
			}],

		};
		ctrl.data= {
			items: {
				filter : function () {
					return {

					}

				}
			}
		};
				ctrl.handleMarriedFileSingle(item)

	});
	it('should file married file single status if tax is StateTax and exempt is N ',function() {
		var item = {
			data: {
				type:'State tax',
				maritalStatus:'',
				exempt:'N'
			},
			dropdown:[
				{
					key:'S'
				}
			]
		};
		ctrl.data= {
			items: {
				filter : function () {
					return {

					}

				}
			}
		};
		ctrl.handleMarriedFileSingle(item);
	});

	it('should  assign   hideSP value to false',function() {
		ctrl.openSPTest();
		expect(ctrl.hideSP).toBe(false);
	});

	it('should handle Exempt',function() {
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'NE',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]


			}]
		};
		ctrl.exemptCaches= [{item : {data: {type:""}}}];
		var item = {
			data:{
				type:'State tax',
				payDedCode:'GA'
			},
			selected:{
				key:''
			}
		};
		var value = "Y";
		ctrl.handleExempt(item,value);
	});
/*	it('should handle Exempt for fedreal Tax',function() {
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'NE',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]
			}]
		};

		ctrl.exemptCaches= [{item : {data: {type:""}}}];
		var value = "N";
		ctrl.handleExempt(item,value);
	});*/
	it('should  assign invert hideSP value',function() {
		ctrl.hideSP = true;
		ctrl.hideSPTest ();
		expect(ctrl.hideSP).toBe(false);
	});
	it('should get state tax for NebraskaState ',function() {
			ctrl.data = {
				items: [{
                      data:{
                      	type:'State tax',
						 payDedCode:'NE',
						  maritalStatus:'N'
                      }
				}]
			};
			var item = {
				data:{
					type:'Federal tax'
				},
				selected:{
					key:''
				}
			}
			var allowancesRequested = '';

		ctrl.handleNebraskaState(item,allowancesRequested);
	});

	it('should be next step function ', function () {
		var index=1;
		ctrl.data = {
			items: [{
              data:{
              	type:'Federal tax',
				  addlAmount:''
			  }
			}]
		};
		ctrl.nextStep(index);

	});

	it('should handle martial status',function() {
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'NE',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]
			}]
		};
		var item = {
			data:{
				type:'State tax',
				payDedCode:'GA'
			},
			selected:{
				key:''
			}
		}
		var value = 'M';
		ctrl.handleMaritalStatus(item,value);
	});
	it('should handle martial status for fedreal Tax',function() {
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'NE',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]
			}]
		};
		var item = {
			data:{
				type:'Federal tax',
				payDedCode:'GA'
			},
			selected:{
				key:''
			}
		}
		var value = 'M';
		ctrl.handleMaritalStatus(item,value);
	});

	it('should handleAllowancesRequested for states',function() {
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'NE',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]
			}],
			otherItems:[
				{
					allowancesRequested:'Y'
				}
			]
		};
		var item = {
			data:{
				type:'Federal tax',
				payDedCode:'GA'
			},
			selected:{
				key:''
			}
		};
		var value = 'M';
		ctrl.handleAllowancesRequested(item,value);
		//expect(taxWithholdingDisabledFields.fetch).toHaveBeenCalled();

	})
	it('should handleAllowancesRequested for states where stateCode is MN',function() {
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'MN',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]
			}],
			otherItems:[
				{
					allowancesRequested:'Y'
				}
			]
		};
		var item = {
			data:{
				type:'Federal tax',
				payDedCode:'MN'
			},
			selected:{
				key:''
			}
		};
		var value = 'M';
		ctrl.handleAllowancesRequested(item,value);
	});

    it('should update if prop value is marriedFileSingle',function() {
    	var prop = "marriedFileSingle";
    	var value = "M";
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'MN',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]
			}],
			otherItems:[
				{
					allowancesRequested:'Y'
				}
			]
		};
    	ctrl.update(ctrl.data.items,prop,value);
	});
	it('should update if prop value is exempt',function() {
		var prop = 'exempt';
		var value = 'N';
		var item ={
			data:{
				type:'State tax',
				payDedCode:'MN',
				maritalStatus:'N'
			},
			dropdown:[
				{
					key:'M'
				}
			]
		};
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'MN',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]
			}],
			otherItems:[
				{
					allowancesRequested:'Y'
				}
			]
		};
		ctrl.exemptCaches = [];
		ctrl.update(item,prop,value);
	});
	/*it('should update if prop value is exempt , value is Y',function() {
		var prop = 'exempt';
		var value = 'Y';
		var cache = [];
		var item ={
			data:{
				type:'State tax',
				payDedCode:'MN',
				maritalStatus:'N'
			},
			dropdown:[
				{
					key:'M'
				}
			]
		};
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'MN',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]
			}],
			otherItems:[
				{
					allowancesRequested:'Y'
				}
			]
		};
		ctrl.exemptCaches = [];
		ctrl.update(item,prop,value);
	});*/

	it('should update if prop value is maritalStatus',function() {
		var prop = 'maritalStatus';
		var value = 'M';
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'MN',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]
			}],
			otherItems:[
				{
					allowancesRequested:'Y'
				}
			]
		};
		var item = {
			data:{
				type:'Federal tax',
				payDedCode:'MN'
			},
			selected:{
				key:''
			}
		};
		ctrl.update(item,prop,value);
	});
	it('should update if prop value is allowancesRequested',function() {
		var prop = 'allowancesRequested';
		var value = 'M';
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'MN',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]
			}],
			otherItems:[
				{
					allowancesRequested:'Y'
				}
			]
		};
		var item = {
			data:{
				type:'Federal tax',
				payDedCode:'MN'
			},
			selected:{
				key:''
			}
		};
		ctrl.update(item,prop,value);
	});
	it('should go to previous step',function() {
		var index  = 0;
		ctrl.data = {
			uniqueTaxes : [{
				id : 0,
				class:''
			}]
		}
      // ctrl.previousStep(index);
	});
	it('should go to previous step if id not equal to index',function() {
		var index  = 1;
		ctrl.data = {
			uniqueTaxes : [{
				id : 0,
				class:''
			}],
			items:[{
                 data:{
                 	type:''
				 }
			}]
		};
		ctrl.selectedTab = {
			tyep: ''
		}
		ctrl.previousStep(index);
	});
	it('should save the form if it is valid',function() {
		var form = {
			$valid:true
		};

		ctrl.w4LegalConfirmation = 'N';
		ctrl.save(form);
		//var s = handleW4LegalConfirmation();
	});
	it('should return empty if form is not valid valid',function() {
		var form = {
			$valid:false
		};

		ctrl.w4LegalConfirmation = 'Y';
		ctrl.data = {
			items: [{
				data:{
					type:'State tax',
					payDedCode:'GA',
					maritalStatus:'N'
				},
				dropdown:[
					{
						key:'M'
					}
				]
			}],
			otherItems:[
				{
					allowancesRequested:'Y'
				}
			]
		};
		ctrl.save(form);
		//var s = handleW4LegalConfirmation();
	});
	it('should open a legal modal',function() {
		var modal = {
			result:''
		}

	});

	it('should close modal',function () {
		ctrl.modalInstance= {
			dismiss: function(cancel){

			}
		}
		ctrl.cancel()

	});
	it('should close modal',function () {
		ctrl.prompt();
	});
	it('should warnState',function() {

		var stateCode = "";
		ctrl.warnState(stateCode);
		expect($filter).toHaveBeenCalledWith('translate');
		expect(innerFilterSpy).toHaveBeenCalledWith('money.tax_With_Holding.warnStateMsg.'+stateCode);

	});
});
