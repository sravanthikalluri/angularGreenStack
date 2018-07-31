'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.taxes.w4-elections-card.shared';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('taxWithholdings', require('./tax-withholdings.service'))
	.service('taxWithholdingForm', require('./tax-withholding-form.service'))
	.service('taxWithholdingEffectiveDate', require('./tax-withholding-effective-date.service'))
	.filter('taxWithholdingType', require('./tax-withholding-type.filter'))
	.filter('taxWithholdingDesc', require('./tax-withholding-desc.filter'))
	.filter('taxWithholdingMarriedFileSingle', require('./tax-withholding-married-file-single.filter'))
	.constant('taxWithholdingDisabledFields', require('./tax-withholding-disabled-fields.constant'))
	.constant('taxWithholdingUrls', require('./tax-withholding-urls.constant'));
