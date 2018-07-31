'use strict';

var angular = require('angular');
var benefitsOverview = require('./benefits-overview.component');
var tnBenefitCard = require('./tn-benefit-card/tn-benefit-card.component');
var tnProviderPlan = require('./tn-provider-plan/tn-provider-plan.component');
var tnBenefitValue = require('./tn-benefit-value/tn-benefit-value.component');
var tnBenefitsCardsCard = require('./tn-benefits-cards-card/tn-benefits-cards-card.component');
var tnBenefitsHelpCard = require('./tn-benefits-help-card/tn-benefits-help-card.component');
var tnCurrentBeneficiariesCard = require('./tn-current-beneficiaries-card/tn-current-beneficiaries-card.component');
var tnBenefitsUsers = require('./tn-benefits-users/tn-benefits-users.component');
var tnBenefitBestDoctors = require('./tn-benefit-best-doctors/tn-benefit-best-doctors.component');
var tnBenefitsPopup = require('./tn-benefits-popup/tn-benefits-popup.component')

var moduleName = 'app.main.benefits.overview';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('benefitsOverview', benefitsOverview)
	.component('tnBenefitCard', tnBenefitCard)
	.component('tnBenefitValue', tnBenefitValue)
	.component('tnBenefitsCardsCard', tnBenefitsCardsCard)
	.component('tnBenefitsHelpCard', tnBenefitsHelpCard)
	.component('tnCurrentBeneficiariesCard', tnCurrentBeneficiariesCard)
	.component('tnBenefitsUsers', tnBenefitsUsers)
	.component('tnProviderPlan', tnProviderPlan)
	.component('tnBenefitBestDoctors', tnBenefitBestDoctors)
	.component('tnBenefitsPopup', tnBenefitsPopup);
