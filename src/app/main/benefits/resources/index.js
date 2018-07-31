'use strict';

var angular = require('angular');
var benefitsResources = require('./benefits-resources.component');
var benefitsCarriers = require('./benefits-carriers/benefits-carriers.component');
var tnBenefitsFormsItem = require('./tn-benefits-forms-item/tn-benefits-forms-item.component');
var additionalResources = require('./additional-resources/additional-resources.component');
var benefitsGuideBook = require('./additional-resources/benefits-guide-book/benefits-guide-book.component');
var benefitsMedicalPlanCoverageSummaries = require('./additional-resources/benefits-medical-plan-coverage-summaries/benefits-medical-plan-coverage-summaries.component');
var benefitsSummaryView = require('./additional-resources/benefits-summary-view/benefits-summary-view.component');
var benefitsAflac = require('./optional-benefits/benefits-aflac/benefits-aflac.component');
var benefitsStdSecurity = require('./optional-benefits/benefits-std-security/benefits-std-security.component');
var benefitsMetLife = require('./optional-benefits/benefits-met-life/benefits-met-life.component');
var benefitOptions = require('./benefit-options/benefit-options.component');
var optionalBenefits = require('./optional-benefits/optional-benefits.component');
var generalForms = require('./general-forms/general-forms.component');
var benefitsInDepthPlanDescription = require('./additional-resources/benefits-in-depth-plan-description/benefits-in-depth-plan-description.component');
var carrierContactInfo = require('./additional-resources/carrier-contact-info/carrier-contact-info.component');
var planComparison = require('./additional-resources/plan-comparison/plan-comparison.component');
var carrierWebsites = require('./additional-resources/carrier-websites/carrier-websites.component');
var summaryOfMedicalPlanChanges = require('./additional-resources/summary-of-medical-plan-changes/summary-of-medical-plan-changes.component');
var summaryModal = require('./additional-resources/benefits-medical-plan-coverage-summaries/summary-modal/summary-modal.component');
var statePlans = require('./benefit-options/state-plans/state-plans.component');
var executive = require('./additional-resources/benefits-summary-view/executive/executive.component');
var linksList = require('./additional-resources/benefits-summary-view/links-list/links-list.component');
var cobraSummary = require('./additional-resources/benefits-summary-view/cobra-summary/cobra-summary.component');
var buildMaintainCustom = require('./additional-resources/benefits-summary-view/build-maintain-custom/build-maintain-custom.component');
var statesBuildDataView = require('./additional-resources/benefits-summary-view/build-maintain-custom/states-build-data-view/states-build-data-view.component');
var lifeAndDisabilityCoverage = require('./additional-resources/life-and-disability-coverage/life-and-disability-coverage.component');



var moduleName = 'app.main.benefits.resources';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('benefitsResources', benefitsResources)
	.component('benefitsCarriers', benefitsCarriers)
	.component('tnBenefitsFormsItem', tnBenefitsFormsItem)
	.component('additionalResources', additionalResources)
	.component('benefitsGuideBook', benefitsGuideBook)
	.component('benefitsMedicalPlanCoverageSummaries', benefitsMedicalPlanCoverageSummaries)
	.component('benefitsSummaryView', benefitsSummaryView)
	.component('benefitsAflac', benefitsAflac)
	.component('benefitsMetLife', benefitsMetLife)
	.component('benefitsStdSecurity', benefitsStdSecurity)
	.component('benefitOptions', benefitOptions)
	.component('optionalBenefits', optionalBenefits)
	.component('generalForms', generalForms)
	.component('benefitsInDepthPlanDescription', benefitsInDepthPlanDescription)
	.component('carrierContactInfo', carrierContactInfo)
	.component('planComparison', planComparison)
	.component('carrierWebsites', carrierWebsites)
	.component('summaryOfMedicalPlanChanges', summaryOfMedicalPlanChanges)
	.component('summaryModal', summaryModal)
	.component('statePlans', statePlans)
	.component('executive', executive)
	.component('linksList', linksList)
	.component('cobraSummary', cobraSummary)
	.component('buildMaintainCustom', buildMaintainCustom)
	.component('statesBuildDataView', statesBuildDataView)
	.component('lifeAndDisabilityCoverage', lifeAndDisabilityCoverage);
