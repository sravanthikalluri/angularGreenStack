'use strict';
module.exports = BenefitsOverviewService;

/* @ngInject */
function BenefitsOverviewService(DS, $filter,logoImagesConfig) {

	var BenefitsOverview = DS.defineResource({
		name: 'benefits-overview',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-benefits/v1/benefit-plan/{companyId}/{empId}'
	});

	var excludedPlans = ['40', '4Q'];
	var planDescWithProviderNameList = ['10', '11', '14', '1G', '1V', '1D', '1X', '1A', '1K', '18'];
	var planDescWithCompanyPaid = ['27','25','30','31','47','67','23'];
	var planDescWithEmployeePaid = ['60', '61'];

	BenefitsOverview.deserialize = function(resourceConfig, data) {
		var json = data.data.data;

		var overview;
		var benefits = null;
		var dependents = null;
		if (json.enrollment){
			benefits = _parseCurrentBenefits(json.enrollment.curBenefits);
			dependents = _parseDependents(json.enrollment.curBenefits.dependentDetails);
		}
		var enrollment =  json.enrollment;
		var enrollmentDeadline = json;
		var printCards = {

			title: 'Benefits Card',
			links: [
				{
					'type': 'print',
					'text': 'Print',
					'url': '#'
				}
			]
		};
		var guideBooks = {
			title: 'Benefits Help'
		};
		overview = {
			id: '1',
			parentPageTitle: 'Benefits',
			pageTitle: 'Overview',
			benefits: benefits,
			dependents: dependents,
			benefitsCards: printCards,
			guideBooks: guideBooks,
			enrollment: enrollment,
			enrollmentDeadline:enrollmentDeadline
		};

		return overview;
	};

	return BenefitsOverview;

	// internal implementations
	// ---------------------------------------

	function _parseCurrentBenefits(data) {
		var originalBenefits = data.currentBenefits;
		var dependents = data.dependentDetails;
		var benefits, newBenefit;

		// remove plans from Benefits Overview
		originalBenefits = originalBenefits.filter(function(benefit) {
			if (excludedPlans.indexOf(benefit.planType) >= 0) {
				return false;
			}
			else {
				return true;
			}
		});

		benefits = originalBenefits.map(function(benefit) {
			newBenefit = {
				planType: benefit.planType,
				planTypeDescr: benefit.planTypeDescr,
				planInfo: _getPlanInfo(benefit.planDesc, benefit.planType,benefit.groupNbr),
				covered: _getCovered(benefit.coverage.beneficiaries, dependents,benefit),
				coverage: _getCoverage(benefit.planType, benefit)
			};

			return newBenefit;
		});

		return benefits;
	}

	function _getPlanInfo(planDesc, planType,groupNbr) {
		var providerName = '';
		var planDescSplitted;

		if (planDescWithProviderNameList.indexOf(planType) >= 0) {
			planDescSplitted = planDesc.split(' ');
			providerName = planDescSplitted[0];
			planDesc = planDesc.replace(providerName, '');
		}
		else {
			planDesc = '';
		}

		return {
			planDesc: planDesc,
			providerName: providerName,
			providerLogo: _getLogo(providerName),
			groupNbr : groupNbr
		};
	}

	// TODO: this might be a candidate for logo Service
	function _getLogo(companyName) {
		var logo;
		var logoPath = 'assets/images/logo/';

		if (companyName) {
			companyName = companyName.toLowerCase();
			if(logoImagesConfig.logo[companyName]){
				logo = logoPath + companyName + '.png';
			}
		}

		return logo;
	}

	function _getCovered(beneficiaries, dependents,benefit) {
		var covered = [{
			relationship:'Self',
			name: benefit.coverage.employeeName
		}];

		if (beneficiaries) {
			if (benefit.coverage.amount){
				covered = beneficiaries.map(function(beneficiary) {
					return {
						relationship: beneficiary.primary ? 'Primary' : 'Contingent',
						name: beneficiary.name + ': ' + formatAmount(beneficiary.benefit.value, beneficiary.benefit.valueType)
					};
				});
			}
			else {
				covered = beneficiaries.map(function(beneficiary) {
					return {
						relationship: _getFamilyRelationship(dependents, beneficiary.name),
						name: beneficiary.name
					};
				});
				covered.unshift({
					relationship:'Self',
					name: benefit.coverage.employeeName
				});
			}
		}

		return covered;
	}

	function formatAmount(amount, valueType){
		var returnValue = null;
		switch(valueType) {
			case 'percent':
				returnValue = amount + '%';
				break;
			case 'flat_amount':
				returnValue = $filter('currency')(amount, '$', 0);
				break;
			default:
				returnValue = $filter('currency')(amount, '$', 0);
		}
		return returnValue;
	}

	function _getCoverage(planType, benefit) {
		var amount = null;
		var paidBy = null;
		var coverage = benefit.coverage;
		var planDesc = benefit.planDesc;
		var amountLabel = "Coverage";

		// Plan Type Description with Company Paid
		if (planDescWithCompanyPaid.indexOf(planType) >= 0 ) {
			paidBy = {
				label: '',
				value: planDesc
			};
		}

		// Plan Type Description with Employee Paid
		if (planDescWithEmployeePaid.indexOf(planType) >= 0 ) {
			paidBy = {
				label: '',
				value: planDesc
			};
			amountLabel = "Election";
		}

		if (coverage.amount) {
			amount = {
				label: amountLabel + ' Amount',
				value: $filter('currency')(coverage.amount.value, '$', 0)
			};
		}

		return {
			amount: amount,
			paidBy: paidBy
		};
	}

	function _parseDependents(data) {
		var beneficiaries = [];
		var dependents = [];

		if (data) {

			// trim the properties
			data = data.map(function trimProperties(dependent) {
				return {
					dependentName: dependent.dependentName,
					relationship: dependent.relationship,
					dependentBeneficiaryType: dependent.dependentBeneficiaryType
				};
			});

			// get beneficiaries
			beneficiaries = data.filter(function(dependent) {
				return dependent.dependentBeneficiaryType.indexOf('Beneficiary') >- 1;
			});

			// get dependents
			dependents = data.filter(function(dependent) {
				return dependent.dependentBeneficiaryType.indexOf('Dependent') >- 1;
			});

		}

		return {
			beneficiaries: {
				sectionTitle: 'Current Beneficiaries',
				beneficiaries: beneficiaries
			},
			dependents: {
				sectionTitle: 'Current Dependents',
				dependents: dependents
			}
		};
	}

	function _getFamilyRelationship(dependents, name) {
		function findDependent(dependent) {
			return dependent.dependentName === name;
		}

		var result = dependents.filter(findDependent)[0];

		if (result) {
			return result.relationship;
		}
		else {
			return null;
		}
	}
}
