'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.money.paycheck-details';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('PaycheckDetails', require('./paycheck-details.service'))
	.service('Header', require('./header.service'))
	.service('Detail', require('./detail.service'))
	.service('TaxData', require('./tax-data.service'))
	.service('Earns', require('./earns.service'))
	.service('TaxWithHoldings', require('./tax-withholdings.service'))
	.service('PreTaxDedns', require('./pre-tax-dedns.service'))
	.service('PostTaxDedns', require('./post-tax-dedns.service'))
	.service('EmployerBenefits', require('./employer-benefits.service'))
	.service('EmployerBenefitsTaxable', require('./employer-benefits-taxable.service'))
	.service('EmployerBenefitsNonTaxable', require('./employer-benefits-non-taxable.service'))
	.service('Totals', require('./totals.service'))
	.service('Ptos', require('./ptos.service'))
	.service('NetPayDistributions', require('./net-pay-distributions.service'))
	.service('DirectDepositDistributions', require('./direct-deposit-distributions.service'));
