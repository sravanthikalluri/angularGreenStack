/**/'use strict';

var angular = require('angular');
require('angular-mocks');

var taxWithholdingsFormService = require('./tax-withholding-form.service');

describe('Tax-Withholdings-form-Service component', function() {

	var taxWithholdingDisabledFields;
	var DS;
	var taxWithholdingEffectiveDate ;
	var saveDeferred;
	var mockData = { data: {} };

	beforeEach(function() {

		var moduleName = 'trinet.main.money.taxes.shared';
		var mockDSService = function () {
			return {

			}
		};
		var mockTaxWithholdingDisabledFields = function () {
			return {
				hideAllowancesForStates:[{
					GA:{

					}
				}]
			}
		};
		var mockTaxWithholdingEffectiveDate = function () {
			return {
                getNext:function() {
                	return '';
				}
			}
		};
		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('taxWithholdingDisabledFields',mockTaxWithholdingDisabledFields)
			.service('taxWithholdingEffectiveDate',mockTaxWithholdingEffectiveDate)
			.service('taxWithholdingsFormService', taxWithholdingsFormService);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$q,_DS_,_taxWithholdingDisabledFields_,_taxWithholdingEffectiveDate_) {
		DS = _DS_;
		saveDeferred = $q.defer();
		taxWithholdingDisabledFields = _taxWithholdingDisabledFields_;
		taxWithholdingEffectiveDate = _taxWithholdingEffectiveDate_;
		DS.find = jasmine.createSpy('marital-status').and.returnValue(saveDeferred.promise);
		DS.update = jasmine.createSpy('taxes').and.returnValue(saveDeferred.promise);
		DS.ejectAll = jasmine.createSpy().and.returnValue(saveDeferred.promise);
	}));
	it('should fetch the controller',inject(function(taxWithholdingsFormService){
		var tax = {
			employeeId:'',
			effectiveDate:'',
			affirmationText:'',
			substantialText:'',
		};
		var uniqueTaxItems = [];
		var maritalStatuses = '';
		taxWithholdingsFormService._create(tax, uniqueTaxItems);
	}));

	it('should fetch payload information',inject(function(taxWithholdingsFormService) {
       var data = {
       	items:[
			{
				data: {
						type:'State tax'
				}
			}
		],
		otherItems:[],
		employeeId:'',
		effectiveDate: ''
	};
     taxWithholdingsFormService._getPayload(data);
	}));

	it('should _getMaritalStatusDict ',inject(function(taxWithholdingsFormService) {
		var uniqueTaxItems = [{
			payDedCode:''
		}];
		var maritalStatuses = [];
		taxWithholdingsFormService._getMaritalStatusDict(uniqueTaxItems,maritalStatuses);
	}));

	it('should _convertMaritalStatuses ',inject(function(taxWithholdingsFormService) {
		var maritalStatuses = [{
			statuses:[{
				  taxMaritalStat:'',
				  taxMarStatDesc:''
			  }]
		}];
		//taxWithholdingsFormService._convertMaritalStatuses(maritalStatuses);
	}));

	it('should filterMaritalStatus For GeorgiaState ',inject(function(taxWithholdingsFormService) {
		var maritalStatuses = [{
			payDedCode:'GA',
			type:'State tax'

		}];
		taxWithholdingsFormService.filterMaritalStatusForGeorgiaState(maritalStatuses);
	}));
	it('should filterMaritalStatus For GeorgiaState if paydedCode is not GA ',inject(function(taxWithholdingsFormService) {
		var maritalStatuses = [{
			payDedCode:'MN',
			type:'State tax',
			maritalStatus:'M',
			allowancesRequested:'',
			addlExempts:''

		},
			{
				payDedCode:'GA',
				type:'State tax',
				maritalStatus:'M',
				allowancesRequested:'',
				addlExempts:''

			}];
		taxWithholdingsFormService.filterMaritalStatusForGeorgiaState(maritalStatuses);
	}));
	it('should get OtherItems',inject(function(taxWithholdingsFormService) {
		var uniqueTaxItems = [{
			payDedCode:'',
			type: 'Local tax'
		}];
		var tax = {
			LocalTaxWithholdings:{

			}
		};
		taxWithholdingsFormService._getOtherItems(tax,uniqueTaxItems);
	}));


	it('should return unique taxes',inject(function(taxWithholdingsFormService) {
		var uniqueTaxItems = [{
			payDedCode:'',
			type: 'Local tax'
		}];
		var tax = {
			LocalTaxWithholdings:{

			}
		};
		taxWithholdingsFormService._getUniqueTaxes(tax,uniqueTaxItems);
	}));
	it('should return unique taxes',inject(function(taxWithholdingsFormService) {
		var uniqueTaxItems = [{
			payDedCode:'',
			type: 'Local tax'
		}];
		var maritalStatuses = [{
			payDedCode:'MN',
			type:'State tax',
			maritalStatus:'M',
			allowancesRequested:'',
			addlExempts:''

		},
			{
				payDedCode:'GA',
				type:'State tax',
				maritalStatus:'M',
				allowancesRequested:'',
				addlExempts:''

			}];
		var statuses = [];
		//taxWithholdingsFormService._getItems(uniqueTaxItems,maritalStatuses);
	}));

	it('should save the results',inject(function(taxWithholdingsFormService,taxWithholdingEffectiveDate) {
		var data = {
			items:[
				{
					data: {
						type:'State tax'
					}
				}
			],
			otherItems:[],
			employeeId:'',
			effectiveDate: ''
		};
		taxWithholdingsFormService.save(data);
	}));

	it('should Convet Codes',inject(function(taxWithholdingsFormService){
		spyOn(angular,'forEach');
		var uniqueTaxItems = [{
			payDedCode:'GA',
			type: 'State tax',
			exempt:'Y',
			maritalStatusAllowance:'',
			maritalStatus:'M',
			isPDFAvailable:'true',
			pdfURL:{
				url:''
			}
		}];
		var dict = {
              GA:[{
				  value:'M'
			  }]
		};
		taxWithholdingsFormService._convertCodes(uniqueTaxItems, dict);
	}));
	it('should fetch data ',inject(function(taxWithholdingsFormService){
		var tax  = {
			FedTaxWithholdings:[{
				payDedCode:'GA'
			}],
			StateTaxWithholdings: [],
			LocalTaxWithholdings: []
		}
		taxWithholdingsFormService.fetch(tax);
	}));


});

