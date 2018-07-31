'use strict';

var angular = require('angular');
require('angular-mocks');

var w4ModalTable = require('./w4-modal-table.component');

describe('w4ModalTable component', function (){
	var $componentController;
	var ctrl = {

	};
	var $scope;
	var deferred;
	var taxWithholdingDisabledFields;
	var element;

	beforeEach(function() {
		var moduleName = 'app.main.money.taxes.w4-card.w4-modal.w4-modal-table';

		var mocktaxWithholdingDisabledFields = function () {return{
			statesToUpdateLocalTax:{
				'NE':'T'
			}
		}};
		var mockElement = function() {
			return {};
		}
		angular
			.module(moduleName, [])
			.service('taxWithholdingDisabledFields',mocktaxWithholdingDisabledFields)
			.service('element',mockElement)
			.component('w4ModalTable', w4ModalTable);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_,_taxWithholdingDisabledFields_,_element_,$q){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		taxWithholdingDisabledFields=_taxWithholdingDisabledFields_;
		element = _element_;
         var deferred = $q.defer();
		//spy
		taxWithholdingDisabledFields.fetch = jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			$element:element,
			taxWithholdingDisabledFields:taxWithholdingDisabledFields,
		};
		ctrl = $componentController('w4ModalTable', locals ,null);
	}));
     it('should initilize the component',function() {
		 ctrl.items = [{
		 	data: {exempt : "true"}
		 }];
     	ctrl.$onInit();
	});
     it('should update the values',function() {
     	var item = {
     		data: {
				marriedFileSingle:''
			}
		};
     	var prop = 'exempt';
     	var value = 'Y';

     	//ctrl.update(item,prop,value);
	 });
	it('should return whether MaritalStatus is Disabled or not',function() {
		var item = {
			data:{
				type : '',
				payDedCode: ''
			}
		}
		ctrl.keys = {
			stateTax : ['']
		};
		ctrl.fields = {
			maritalStatus:[]
		}
		ctrl.isMaritalStatusDisabled(item);
	});
	it('should return whether Allowances is Disabled or not',function() {
		var item = {
			data:{
				type : '',
				payDedCode: 'MN'
			}
		}
		ctrl.keys = {
			stateTax : ['']
		};
		ctrl.fields = {
			maritalStatus:[],
			allowances:[]
		}
		ctrl.isAllowancesDisabled(item);
	});
	it('should return whether Exempt is Disabled or not',function() {
		var item = {
			data:{
				type : '',
				payDedCode: 'MN'
			}
		}
		ctrl.keys = {
			stateTax : ['']
		};
		ctrl.fields = {
			maritalStatus:[],
			allowances:[],
			exempt: [],
			stateTax:[]
		}
		ctrl.isExemptDisabled(item);
	});
	it('should display text according to arugement',function() {
		ctrl.fields = {
			maritalStatus:[],
			allowances:[],
			exempt: [],
			stateTax:[]
		};
		var item = {
			data:{
				type : '',
				payDedCode: 'MN'
			}
		}
		ctrl.displayText(item);
	});
	it('should return whether field is disabled or not',function() {
		var item = {
			data:{
				type : '',
				payDedCode: 'MN'
			}
		};
		var fieldName = '';
		ctrl.items =
			 [{
				data:{
					type:'State tax',
					payDedCode:'NE',
					maritalStatus:'N'
				}
			}];
		ctrl.keys = {
			stateTax:""
		};
		ctrl.fields = {
			stateTax:""
		};
		ctrl.isDisabled(item,fieldName);
	});
	it('should return whether fields are required or not',function() {
		ctrl.keys = {
			stateTax:"",
			localTax:''
		};
		ctrl.fields = {
			stateTax:"",
			localTax:''
		};
		var item = {
			data:{
				type : '',
				payDedCode: 'MN',
				exempt: 'Y'
			}
		};
		ctrl.isRequired(item);
	});
	it('should return if Allowances are Visible, and payCode is MS',function() {
		ctrl.keys = {
			stateTax:"",
			localTax:'',
			allowances:''
		};
		ctrl.fields = {
			stateTax:"",
			localTax:'',
			allowances:''
		};
		var item = {
			data:{
				type : '',
				payDedCode: 'MS',
				exempt: 'Y'
			}
		};
		ctrl.items = {
			data : [{
				payDedCode:''
			}]
		}
		ctrl.isAllowancesVisible(item);
	});
	it('should return if Allowances are Visible, and payCode is not MS',function() {
		ctrl.keys = {
			stateTax:"",
			localTax:'',
			allowances:''
		};
		ctrl.fields = {
			stateTax:"",
			localTax:'',
			allowances:''
		};
		var item = {
			data:{
				type : '',
				payDedCode: 'GA',
				exempt: 'Y'
			}
		};
		ctrl.items = [{
			data : {
				payDedCode:'GA'
			}
		}]
		ctrl.isAllowancesVisible(item);
	});
    it('should return whether Marital status can be disabled or not ',function() {
          var code = 'TX';
    	ctrl.disableMaritalStatusAllowance(code);
	});
    it('should return whether MaritalAllowance is Disabled or not',function() {
		ctrl.items = [{
			data : {
				payDedCode:'GA'
			}
		}];
		var item = {
			data:{
				type : '',
				payDedCode: 'GA',
				exempt: 'Y',
				maritalAllowance:''
			}
		};
    	ctrl.isMaritalAllowanceDisabled(item);
	});
});
