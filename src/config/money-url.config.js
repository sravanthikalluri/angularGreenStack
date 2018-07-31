'use strict';

module.exports = {
    moneyApi: "",
    moneyBaseUrl: "/api-money/v1",
    resources: {
        payChecks: "/paychecks",
        payChecksAll: "/paychecks/all",
        payCheckDetails: "/paycheck-details",
        payCheckDetailsPdf: "/paycheck-details-pdf",
        payroll: '/payroll',
        eligibility: '/401k-eligibility',
        benefitPlan: '/benefit-plan',
        retirementPlan: '/retirement-plan',
        contributions: '/contributions',
		savingPlans: '/saving-plans',
		planTypes: '/plan-types',
        all: '/all',
        directDeposit: '/direct-deposit',
        accounts: '/accounts',
        forms: '/forms',
        taxUtils: '/tax-util',
        taxMaritalStats: '/taxMaritalStats',
        taxWithholding: '/tax-withholding',
        withHoldings: '/withholdings',
        verification: '/verification',
        i9Status: '/i9Status',
        payrollschedule: '/payrollschedule',
        payrollDates: '/payroll-schedules',
        payrollScheduleDetailsPdf: "/payroll-details-pdf",
        payCheckCity: '/vendors/paycheckcity',
        compensationStatement: '/compensation-statement',
        w2details: '/w2details',
		ambroseVerification: '/ambrose-verification',
		employmentVerification:'/employment-verification'
    }
};
