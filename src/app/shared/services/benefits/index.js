'use strict';

var angular = require('angular');
var BenefitsOverviewService = require('./benefits-overview.service');
var BenefitsFormsService = require('./benefits-forms.service');
var BenefitsPlansCarriersService = require('./benefits-plans-carriers.service');
var BenefitsSummaryLinksService = require('./benefits-summary-links.service');
var BenefitsSummaryPlanService = require('./benefits-summary-plan.service');
var BenefitsSummaryViewPlansService = require('./benefits-summary-view-plans.service');
var BenefitsGuideBookService = require('./benefits-guide-book.service');
var BenefitsBestDoctorsService = require('./benefits-best-doctors.service');
var BenefitsVoluntaryLinksService = require('./benefits-voluntary-links.service')
var BenefitsMetLifeService = require('./benefits-met-life.service');
var BenefitOptionsService = require('./benefit-options.service');
var BenefitsOverviewTemplateService = require('./benefits-overview-template.service');
var BenefitPolicyLinksService = require('./benefit-policy-links.service');
var BenefitsCarrierContactsService = require('./benefits-carrier-contacts.service');
var BenefitsStatePlansService = require('./benefits-state-plans.service');
var BenefitsLegalNoticesService = require('./benefits-legal-notices.service');
var BenefitsPoliciesService = require('./benefits-policies.service');
var BenefitsExecutivePlanDetailsService = require('./benefits-executive-plan-details.service');
var BenefitsCobraSummaryService = require('./benefits-cobra-summary.service');
var BenefitsBuildMaintainCustomService = require('./benefits-build-maintain-custom.service');
var BenefitsSaveMaintainCustomService = require('./benefits-save-maintain-custom.service');
var BenefitResourcesService = require('./benefit-resources.service.js');
var BenefitAcaMarketPlaceService = require('./benefit-aca-marketplace.service');
var BenefitHealthAndCounseling = require('./benefits-helth-and-counseling.service');
var moduleName = 'trinet.shared.services.benefits';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('BenefitsOverview', BenefitsOverviewService)
	.service('BenefitsForms', BenefitsFormsService)
	.service('BenefitsPlansCarriers', BenefitsPlansCarriersService)
	.service('BenefitsSummaryLinks', BenefitsSummaryLinksService)
	.service('BenefitsSummaryPlan', BenefitsSummaryPlanService)
	.service('BenefitsSummaryViewPlans', BenefitsSummaryViewPlansService)
	.service('BenefitsGuideBook', BenefitsGuideBookService)
	.service('BenefitsMetLife', BenefitsMetLifeService)
	.service('BenefitOptions', BenefitOptionsService)
	.service('BenefitsOverviewTemplate', BenefitsOverviewTemplateService)
	.service('BenefitPolicyLinks', BenefitPolicyLinksService)
	.service('BenefitsCarrierContacts', BenefitsCarrierContactsService)
	.service('BenefitsStatePlans', BenefitsStatePlansService)
	.service('BenefitsOverviewService', BenefitsOverviewService)
	.service('BenefitsLegalNoticesService', BenefitsLegalNoticesService)
	.service('BenefitsBestDoctorsService', BenefitsBestDoctorsService)	
	.service('BenefitsVoluntaryLinksService', BenefitsVoluntaryLinksService)
	.service('HealthAndCounselingService', BenefitHealthAndCounseling)
	.service('BenefitsPoliciesService', BenefitsPoliciesService)
	.service('BenefitsExecutivePlanDetails', BenefitsExecutivePlanDetailsService)
	.service('BenefitsCobraSummary', BenefitsCobraSummaryService)
	.service('BenefitsBuildMaintainCustom', BenefitsBuildMaintainCustomService)
	.service('BenefitsSaveMaintainCustom', BenefitsSaveMaintainCustomService)
	.service('BenefitResources', BenefitResourcesService)
	.service('BenefitAcaMarketPlace',BenefitAcaMarketPlaceService)
	.service('BenefitsGuidebookService', require('./benefits-guidebook.service'));
