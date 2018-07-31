/**/'use strict';

var angular = require('angular');
var moment = require('moment');
require('angular-mocks');

var taxWithholdingEffectiveDateService = require('./tax-withholding-effective-date.service');

describe('Tax-withholding-effective-date-Service component', function() {

	var ctrl;
	var saveDeferred;
	beforeEach(function() {

		var moduleName = 'trinet.main.money.taxes.shared';
		var mockMomentService = function() {
			return function(dateString) {
				return moment(dateString);
			};
		};
		angular
			.module(moduleName, [])
			.service('moment',mockMomentService)
			.service('taxWithholdingEffectiveDateService', taxWithholdingEffectiveDateService);

		angular.mock.module(moduleName);
	});

	it('should fetch the controller',inject(function(taxWithholdingEffectiveDateService){
		var toDate = '02/02/2018';
		taxWithholdingEffectiveDateService.getNext(toDate);

	}));
	it('should fetch the controller and give Nect date',inject(function(taxWithholdingEffectiveDateService){
		var toDate = '03/24/2018';
		taxWithholdingEffectiveDateService.getNext(toDate);

	}));
});
