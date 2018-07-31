'use strict';

require('./benefit-options.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/benefit-options/benefit-options.component.html',
	controller: ['DS','gso', '$uibModal',BenefitOptionsController],
	bindings: {
		modalInstance: '<'
	}
};
/* @ngInject */
function BenefitOptionsController(DS,gso, $uibModal) {
	var ctrl = this;

	ctrl.fromDate = null;
	ctrl.toDate = null;
	ctrl.paymentCapTableTitle = "";
	ctrl.isSOI = false;
	ctrl.isPassport = false;
	ctrl.isAlpha = false;
	ctrl.isAccord = false;
	ctrl.companyName = gso.getAppConfig().companyName;		

	ctrl.$onInit = function() {		
		ctrl.isSOI = gso.getAppConfig().peoId === 'SOI';
		ctrl.isPassport = gso.getAppConfig().peoId === 'PAS';	
		ctrl.isAlpha = gso.getAppConfig().peoId === 'ALP';
		ctrl.isAccord = gso.getAppConfig().peoId === 'ACD';
		
		DS.find('benefit-options','').then(function(response) {
			ctrl.benefitsOverview = response.benefitOptions.benefitsOverview;
			DS.find('benefits-overview-template','').then(function(response) {
				ctrl.template = response.benefitsOverviewTemplate;
				benefitData();
				tableDataDisplay();
			}).catch(function(err) {
				console.log(err);
			});
		}).catch(function(err) {
			console.log(err);
		});
		
		DS.find('benefits-guide-book','').then(function(response) {
			ctrl.response = response;
			ctrl.benefitGuideBookPdfData = response.benefitsGuideBook;
			// showVoluntaryLinks is used to roll out new voluntary PDFs by quarter.  By Q4 2018 all verticals will see the new PDFs.  Code 
			// can then be refactored to remove below logic
			ctrl.quarter = ctrl.benefitGuideBookPdfData.quater;			
			ctrl.isQ1Passport = (ctrl.isPassport && ctrl.quarter === 'Q1') ? true : false;
			ctrl.isQ2Passport = (ctrl.isPassport && ctrl.quarter === 'Q2') ? true : false;
			ctrl.showVoluntaryLinks = (ctrl.isQ1Passport || ctrl.isQ2Passport || ctrl.isAlpha || ctrl.isAccord || ctrl.isSOI ) ? true : false;
			//End showVoluntaryLinks
		}).catch(function(err) {
			console.log(err);
		});
	};

	ctrl.openOptionalModal = function(templateTag, componentName){
		var dataForModal = {
			isLoadedFromModal: true
		}

		$uibModal.open({
				animation: true,
				template: '<' + templateTag + ' />',
				windowClass: 'benefits-modal-dialog',
				component: componentName,
				controllerAs: 'ctrl',
				resolve: {
					modalData: function() {
						return dataForModal;
					}
				}
			}
		)
	};

	ctrl.openStatePlanModal = function(planType){
		var dataForModal = {
			planType: planType
		}
		$uibModal.open({
				animation: true,
				template: '<state-plans></state-plans>',
				component: 'statePlans',
				windowClass: 'benefits-modal-dialog',
				controllerAs: 'ctrl',
				resolve: {
					modalData: function() {
						return dataForModal;
					}
				}
			}
		)
	};


	function benefitData() {
		ctrl.appCompanyId = gso.getAppConfig().companyId;
		ctrl.appCountryCode = gso.getAppConfig().countryCode;
		ctrl.appStateCode = gso.getAppConfig().stateCode;
		ctrl.documentTitle = ctrl.getContent("benefitOverviewTitle");
		ctrl.sponserInfo = ctrl.getContent("benefitSponseredCompany") + ctrl.getContent("benefitSponseredCompanyTriNet");
		ctrl.benefitsCompanyQuote = ctrl.getContent("benefitsCompanyQuote");
		ctrl.benefitsPlanTitle = ctrl.getContent("benefitsPlanTitle");
		ctrl.trinetBenefitPlanPhrase = ctrl.getContent("trinetBenefitPlanPhrase");
		ctrl.benefitsElectWaivePhrase = ctrl.getContent("benefitsElectWaivePhrase");
		ctrl.medical = ctrl.getContent("medical");
		ctrl.trinetMedicalCarrierInfo = ctrl.getContent("trinetMedicalCarrierInfo");
		ctrl.dental = ctrl.getContent("dental");
		ctrl.trinetDentalCarrierInfo = ctrl.getContent("trinetDentalCarrierInfo");
		ctrl.vision = ctrl.getContent("vision");
		ctrl.trinetVisionCarrierInfo = ctrl.getContent("trinetVisionCarrierInfo");
		ctrl.benefitsFundingInfo = ctrl.getContent("employeeHeathPercentageContribution") +
		ctrl.getContent("employeeFamilyHeathPercentageContribution") +
		ctrl.getContent("companyContributionCaps") +
		ctrl.getContent("companyHealthInsuranceSupplementCoverage") +
		ctrl.getContent("companyHealthInsuranceSupplementContributions") +
		ctrl.getContent("companyHealthInsuranceFixedCoverage") +
		ctrl.getContent("companyHealthInsuranceFixedContributions") +
		ctrl.getContent("companyHealthInsuranceCapFundingStrategies");
		ctrl.employeeContributionInfo = ctrl.getContent("employeeHealthInsuranceContribution");
		ctrl.hsaContribution = ctrl.getContent("companyHSAContribution");
		ctrl.hsaContributionNote = ctrl.getContent("companyHSAContributionNote");
		ctrl.waiverBenefit = ctrl.getContent("companyHealthInsuranceWaiverBenefit");
		ctrl.basicLifeInsuranceHeading = ctrl.getContent("basicLifeInsuranceHeading");
		ctrl.basicLifeInsuranceCoverage = ctrl.getContent("basicLifeInsuranceCoverage");
		ctrl.groupShortTermDisabilityInsuranceHeading = ctrl.getContent("groupShortTermDisabilityInsuranceHeading");
		ctrl.groupShortTermDisabilityInsuranceCoverage = ctrl.getContent("groupShortTermDisabilityInsuranceCoverage");
		ctrl.groupLongTermDisabilityInsuranceHeading = ctrl.getContent("groupLongTermDisabilityInsuranceHeading");
		ctrl.groupLongTermDisabilityInsuranceCoverage = ctrl.getContent("groupLongTermDisabilityInsuranceCoverage");
		ctrl.trinetOptionalPlansTitle = ctrl.getContent("trinetOptionalPlansTitle");
		ctrl.dentalHeading = ctrl.getContent("dentalHeading");
		ctrl.optionDentalPlan = ctrl.getContent("optionDentalPlan");
		ctrl.visionSubTitle = ctrl.getContent("visionSubTitle");
		ctrl.optionalVisionPlan = ctrl.getContent("optionalVisionPlan");
		ctrl.fsaPlanSubTitle = ctrl.getContent("fsaPlanSubTitle");
		ctrl.fsaPlan = ctrl.getContent("fsaPlan");
		ctrl.supplementalLifeInsuranceHeading = ctrl.getContent("supplementalLifeInsuranceHeading");
		ctrl.supplementalLifeInsurance = ctrl.getContent("supplementalLifeInsurance");
		ctrl.supplementalADAndDInsuranceHeading = ctrl.getContent("supplementalADAndDInsuranceHeading");
		ctrl.supplementalADAndDInsurance = ctrl.getContent("supplementalADAndDInsurance");
		ctrl.shortTermLongTermDisabilityHeading = ctrl.getContent("shortTermLongTermDisabilityHeading");
		ctrl.shortTermLongTermDisability = ctrl.getContent("shortTermLongTermDisability");
		ctrl.trinetBenefitProgramsTitle = ctrl.getContent("trinetBenefitProgramsTitle");
		ctrl.commuterBenefitSubTitle = ctrl.getContent("commuterBenefitSubTitle");
		ctrl.commuterBenefit = ctrl.getContent("commuterBenefit");
		ctrl.trinetPerksSubTitle = ctrl.getContent("trinetPerksSubTitle");
		ctrl.trinetPerks = ctrl.getContent("trinetPerks");
		ctrl.trinetEmployeeAssistanceProgramSubTitle = ctrl.getContent("trinetEmployeeAssistanceProgramSubTitle");
		ctrl.trinetEmployeeAssistanceProgram = ctrl.getContent("trinetEmployeeAssistanceProgram");
		ctrl.companyRetirementPlanTitle = ctrl.getContent("companyRetirementPlanTitle");
		ctrl.companyRetirementPlan = ctrl.getContent("companyRetirementPlan");
		ctrl.voluntaryInsuranceTitle = ctrl.getContent("voluntaryInsuranceTitle");
		ctrl.metLifeVoluntaryInsuranceSubTitle = ctrl.getContent("metLifeVoluntaryInsuranceSubTitle");		
		if(ctrl.isSOI) {
			ctrl.metLifeVoluntaryInsurance = ctrl.getContent("metLifeVoluntaryInsurance_SOI");	
		} else if(ctrl.showVoluntaryLinks){
			ctrl.aflacSupplementalInsuranceSubTitle = ctrl.getContent("aflacSupplementalInsuranceSubTitle");
			ctrl.metLifeVoluntaryInsurance = ctrl.getContent("metLifeVoluntaryInsuranceQ1AlphaAccord");	
			ctrl.aflacSupplementalInsurance = ctrl.getContent("aflacSupplementalInsurance");
		} else {			
			ctrl.aflacSupplementalInsuranceSubTitle = ctrl.getContent("aflacSupplementalInsuranceSubTitle");
			ctrl.metLifeVoluntaryInsurance = ctrl.getContent("metLifeVoluntaryInsurance");			
			ctrl.aflacSupplementalInsurance = ctrl.getContent("aflacSupplementalInsurance");
		}				
		ctrl.benefitPlanPeriodInfo = ctrl.getContent("benefitPlanPeriodInfo");
	}

	function tableDataDisplay() {
		if (ctrl.benefitsOverview.benefitFundingStrategyMethod === 'PCT') {
			ctrl.paymentCapTableTitle = "Contribution  Amounts Cap";
		} else {
			ctrl.paymentCapTableTitle = "Contribution  Amounts";
		}

		if ((ctrl.benefitsOverview.productLine === "NOMD" || ctrl.benefitsOverview.productLine === "NOHW") && !ctrl.benefitsOverview.companyGroupMedicalInsurance) {
			ctrl.noMedCaps = true;
		}
	}

	ctrl.getContent = function (tagId) {
		var contentObject = ctrl.template[tagId];
		//  If the timestamp from the server is after the "publishDate" and is before the "expireDate", then continue processing.
		//  If not, then do not show this content.
		if (contentObject.hasOwnProperty('publishDate') && (new Date(getVariable("timestamp"))) < (new Date(contentObject.publishDate))) {
			return "";
		}
		if (contentObject.hasOwnProperty('expireDate') && (new Date(getVariable("timestamp"))) > (new Date(contentObject.expireDate))) {
			return "";
		}
		if (contentObject.hasOwnProperty('rule') && !evaluateRule(contentObject.rule)) {
			return "";
		}
		//  If there are variable names in the "content", then substitute the appropriate values.
		return contentObject.content.replace(/{(.+?)}/g, function (match, name) {
			return getVariable(name);
		});
	};

	//  Get the value (from the data object) which should be used in place of the "variableName".
	//  If there is no matching value for "variableName", then return a zero-length string.
	function getVariable(variableName) {
		if (varSubstitute.hasOwnProperty(variableName) && varSubstitute[variableName].indexOf("function") === 0) {
			/*jshint -W054 */
			var value = new Function('return ' + varSubstitute[variableName])(ctrl);
			return value(ctrl, gso.getUtilService());
		}
		return ctrl.benefitsOverview[variableName];
	}

	function evaluateRule(rule) {
		if (rule instanceof Object) {
			if (rule.hasOwnProperty('And') && rule.And instanceof Array) {
				return evaluateAnd(rule.And);
			}
			else if (rule.hasOwnProperty('Or') && rule.Or instanceof Array) {
				return evaluateOr(rule.Or);
			}
			else if (rule.hasOwnProperty('Not')) {
				return !evaluateAnd(rule.Not);
			}
			return false;
		}
		//  If this "rule" is NOT an object, then it is NOT a compound statement, so now try to evaluate it.
		//  Any rule with a "." is actually a "rule" plus the value to which that "rule" should be compared.
		var parts = rule.split('.');
		if (rules.hasOwnProperty(parts[0]) && rules[parts[0]].indexOf("function") === 0) {
			/*jshint -W054 */
			var value = new Function('return ' + rules[parts.shift()])(ctrl);
			return value(ctrl, parts[0]);
		}
		return false;
	}

	function evaluateAnd(rules) {/*jshint -W089 */
		for (var rule in rules) {
			if (!evaluateRule(rules[rule])) {
				return false;
			}
		}
		return true;
	}

	function evaluateOr(rules) {
		for (var rule in rules) {
			if (evaluateRule(rules[rule])) {
				return true;
			}
		}
		return false;
	}

	ctrl.viewPlanType = function (string) {
		sharedProperties.setStringValue(string);
	};
}





/**
 * Description: All the rules which are defined here to display benefits options information
 * Author:Raghavendra Kumar Bonthala
 */
var rules = {
	"COBRAEligible": "function (ctrl) { if (ctrl.template.cobra_eligible) { return true; }}",
	"CompanyContribution_to_HSA": "function (ctrl,company_hsa_contribution) {if (company_hsa_contribution === ctrl.template.company_hsa_contribution) {return true;} else {return false;}};",
	"CompanyBenefitFundingStrategyMethod": "function(ctrl,fundingStrategyMethod) {if (fundingStrategyMethod === ctrl.benefitsOverview.benefitFundingStrategyMethod) {return true;} else {return false;}};",
	"CompanyBenefitFundingStrategyMethodFixed": "function(ctrl) {if (ctrl.benefitsOverview.benefitFundingStrategyMethod === 'EEC' || ctrl.benefitsOverview.benefitFundingStrategyMethod === 'ERC') {return true;} else {return false;}};",
	"Med": "function(ctrl) {return !(ctrl.benefitsOverview.productLine === 'NOMD' || ctrl.benefitsOverview.productLine === 'NOHW');}",
	"CompanyEmployeeMedicalInsurance": "function(ctrl) {return ctrl.benefitsOverview.employeeMedicalPercent > 0;}",
	"CompanyEmployeeFamilyInsurance": "function (ctrl) {return ctrl.benefitsOverview.employeeFamilyMedicalPercent > 0 || ctrl.benefitsOverview.employeeFamilyDentalPercent > 0 || ctrl.benefitsOverview.employeeFamilyVisionPercent > 0;}",
	"MedicalWaiverCreditExistence": "function (ctrl) {if ('Y' === ctrl.template.medical_waiver_credit) { return true; } else { return false;}}",
	"NoGroup": "function (ctrl) {  return ctrl.benefitsOverview.noGroup;}",
	"Dent": "function (ctrl) {return ctrl.benefitsOverview.companyGroupDentalInsurance;}",
	"Vis": "function (ctrl) {return ctrl.benefitsOverview.companyGroupVisionInsurance;}",
	"Group": "function (ctrl) {if (ctrl.benefitsOverview.productLine === 'NOMD' && ctrl.benefitsOverview.benefitFundingStrategyMethod === 'BS') { return false;} return !ctrl.benefitsOverview.noGroup;};",
	"Company": "function (ctrl,company) {if (company === ctrl.appCompanyId) return true; return false;}",
	"CompanyEmployeeDentalInsurance": "function (ctrl) {  return ctrl.benefitsOverview.employeeDentalPercent > 0;}",
	"CompanyFamilyDentalInsurance": "function (ctrl) {return ctrl.benefitsOverview.employeeFamilyDentalPercent > 0;}",
	"CompanyEmployeeVisionInsurance": "function (ctrl) {return ctrl.benefitsOverview.employeeVisionPercent > 0;}",
	"CompanyEmployeeHSA": "function (ctrl,hsaContribution) { if (hsaContribution === undefined) { return ctrl.benefitsOverview.hsaContribution !== null && ctrl.benefitsOverview.hsaContribution !== '0';} return hsaContribution === ctrl.benefitsOverview.hsaContribution;}",
	"CompanyEmployeeFamilyHSA": "function (ctrl,hsaContribution) { if (hsaContribution === undefined) {  return ctrl.benefitsOverview.hsaContribution !== null && ctrl.benefitsOverview.hsaContribution !== '0';} return hsaContribution == ctrl.benefitsOverview.hsaContribution;}",
	"CompanyFamilyVisionInsurance": "function (ctrl) { return ctrl.benefitsOverview.employeeFamilyVisionPercent > 0;}",
	"CompanyNoGroupVisionInsurance": "function (ctrl) { return !ctrl.benefitsOverview.companyGroupVisionInsurance;}",
	"CompanyNoGroupDentalInsurance": "function (ctrl) { return !ctrl.benefitsOverview.companyGroupDentalInsurance;}",
	"basicLifeInsurancePlan": "function (ctrl,basicLifeInsurancePlan) { return basicLifeInsurancePlan === ctrl.benefitsOverview.basicLifeInsurancePlan;}",
	"GroupLongTermDisabilityInsurancePlan": "function (ctrl,groupLongTermDisabilityInsurancePlan) { return groupLongTermDisabilityInsurancePlan === ctrl.benefitsOverview.groupLongTermDisabilityInsurancePlan;}",
	"GroupShortTermDisabilityInsurancePlan": "function (ctrl,groupShortTermDisabilityInsurancePlan) { return groupShortTermDisabilityInsurancePlan === ctrl.benefitsOverview.groupShortTermDisabilityInsurancePlan;}",
	"CompanyBasicLifeInsurance": "function (ctrl) {if (ctrl.benefitsOverview.basicLifeInsurance !== null && ctrl.benefitsOverview.basicLifeInsurance.trim() !== '') return true; return false;}",
	"CompanyHealthInsuranceFixedPayPolicy": "function (ctrl,fixedPayPolicy) {if (fixedPayPolicy === ctrl.benefitsOverview.healthInsuranceFixedPayPolicy) {return true;} else {return false;}}",
	"CompanyHealthInsuranceSupplementReturnPolicy": "function (ctrl,supplementReturnPolicy) { if (supplementReturnPolicy === ctrl.benefitsOverview.healthInsuranceSupplementReturnPolicy) {return true;} else {return false;}}",
	"CompanyHealthInsuranceWaiveBenefitAllowance": "function (ctrl) { return ctrl.benefitsOverview.healthInsuraceWaiverBenefitAllowance > 0;}",
	"CompanyHQCountry": "function (ctrl,companyHQCountry) { if (companyHQCountry === ctrl.template.hq_country) { return true; } else { return false;  }}",
	"CompanyHQState": "function (ctrl,companyHQState) { if (companyHQState === ctrl.template.hq_state) { return true;} else { return false; }}",
	"DisabilityTaxable": "function (ctrl) { if (ctrl.template.disability_taxiable) { return true; } else { return false; }}",
	"DPExistence": "function (ctrl) { if (ctrl.template.dp_existence) { return true; } else { return false; }}",
	"Event": "function (ctrl,event) { if (event === ctrl.template.event_class) { return true; } else { return false; }}",
	"PlanType": "function (planType) { return true; }",
	"ProductType": "function (ctrl,productType) { if (productType === ctrl.template.product_line) {  return true; } else { return false; }}",
	"ResidenceCountry": "function (ctrl,residenceCountry) { if (residenceCountry === ctrl.appCountryCode) { return true; } else { return false; }}",
	"ResidenceState": "function (residenceState) { if (residenceState === appStateCode) { return true; } else { return false; }}",
	"SpouseExistence": "function (ctrl) { if (ctrl.template.spouse_existence) { return true;  } else {  return false;  } }",
	"SuppLifeEnrolled": "function (ctrl) { if (ctrl.template.supp_life_enrolled) { return true; } else { return false; }}",
	"SuppLifeFlatDollar": "function (ctrl) { if (ctrl.template.supp_life_flat_dollar) { return true; } else { return false;  }}",
	"CompanyGroupShortTermDisabilityInsurance": "function (ctrl) { return ctrl.benefitsOverview.groupShortTermDisabilityInsurancePlan !== null && ctrl.benefitsOverview.groupShortTermDisabilityInsurancePlan.trim() !== '' && !ctrl.benefitsOverview.groupShortTermDisabilityInsuranceWaive; };",
	"CompanyGroupLongTermDisabilityInsurance": "function (ctrl) {  return ctrl.benefitsOverview.groupLongTermDisabilityInsurancePlan !== null && ctrl.benefitsOverview.groupLongTermDisabilityInsurancePlan.trim() !== '' && !ctrl.benefitsOverview.groupLongTermDisabilityInsuranceWaive;};",
	"CompanyRetirementPlan": "function (ctrl) { return ctrl.benefitsOverview.retirementPlan === 'Y'; };",
	"FSAPlanYears":"function (ctrl) { var benEndDate = new Date(ctrl.benefitsOverview.benefitPlanEndDate).getFullYear();  var benStartDate = new Date(ctrl.benefitsOverview.benefitPlanStartDate).getFullYear(); if (benEndDate !== benStartDate) { return true;} return false;};",
	"FSAPlanYear":"function (ctrl) { var benEndDate = new Date(ctrl.benefitsOverview.benefitPlanEndDate).getFullYear();  var benStartDate = new Date(ctrl.benefitsOverview.benefitPlanStartDate).getFullYear();  if (benEndDate === benStartDate) { return true;} return false;};",
	"CompanyHealthInsurancePercentCapped": "function(ctrl){" +
	" if(ctrl.benefitsOverview.benefitFundingPayPolicies !== null && ctrl.benefitsOverview.benefitFundingPayPolicies.size > 0) {" +
	" if(ctrl.benefitsOverview.productLine === 'NOMD' || ctrl.benefitsOverview.productLine === 'NOHW') {" +
	" var groupdc = false;" +
	" var groupvc = false;" +
	" angular.forEach(ctrl.benefitsOverview.benefitFundingPayPolicies," +
	" function (property) {" +
	" if (property.indexOf('groupDental') > 0)" +
	" groupdc = true;" +
	" if (property.indexOf('groupVision') > 0)" +
	" groupvc = true;" +
	" });" +
	" if(groupdc || groupvc) {" +
	" return true;" +
	" }" +
	" } else" +
	" return true;" +
	" }" +
	" return false;" +
	" };",
	"CompanyHealthInsuranceCapFundingStrategies": "function (ctrl) {" +
	" if (ctrl.benefitsOverview.benefitFundingPayPolicies !== null && ctrl.benefitsOverview.benefitFundingPayPolicies.size > 0) {" +
	" if (ctrl.benefitsOverview.productLine === 'NOMD' || ctrl.benefitsOverview.productLine === 'NOHW') {" +
	" var groupdc = false;" +
	" var groupvc = false;" +
	" angular.forEach(ctrl.benefitsOverview.benefitFundingPayPolicies," +
	"  function (property) {" +
	"   if (property.indexOf('groupDental') > 0)" +
	"        groupdc = true;" +
	"   if (property.indexOf('groupVision') > 0)" +
	"      groupvc = true;" +
	" });" +
	" if (groupdc || groupvc)" +
	"   return true;" +
	" } else " +
	"   return true;" +
	" } " +
	" return false;" +
	"};"


};



/**
 * Description: All the placeholders which are defined here is use to display benefits options information
 * Author:Raghavendra Kumar Bonthala
 */
var varSubstitute = {
	"companyName": "function(ctrl) { return ctrl.companyName;}",
	"employeeMedicalPercent": "function(ctrl) {return ctrl.benefitsOverview.employeeMedicalPercent;}",
	"employeeDentalPercent": "function(ctrl) { return ctrl.benefitsOverview.employeeDentalPercent;}",
	"employeeVisionPercent": "function(ctrl) { return ctrl.benefitsOverview.employeeVisionPercent;}",
	"employeeFamilyMedicalPercent": "function(ctrl) { return ctrl.benefitsOverview.employeeFamilyMedicalPercent;}",
	"employeeFamilyDentalPercent": "function(ctrl) { return ctrl.benefitsOverview.employeeFamilyDentalPercent;}",
	"employeeFamilyVisionPercent": "function(ctrl) { return ctrl.benefitsOverview.employeeFamilyVisionPercent;}",
	"companyHealthInsuranceSupplementReturnPolicyVerbiage": "function(ctrl) { return ctrl.getContent('companyHealthInsuranceSupplementReturnCompany') + ctrl.getContent('companyHealthInsuranceSupplementReturnEmployee');}",
	"companyHealthInsuranceFixedPayPolicyVerbiage": "function(ctrl) { return ctrl.getContent('companyHealthInsuranceFixedCompany') + ctrl.getContent('companyHealthInsuranceFixedEmployee');}",
	"companyEmployeeHSAContributionVerbiage": "function(ctrl) { return ctrl.getContent('companyEmployeeHSAContribution1') + ctrl.getContent('companyEmployeeHSAContribution2') + ctrl.getContent('companyEmployeeHSAContribution3');}",
	"companyEmployeeFamilyHSAContributionVerbiage": "function(ctrl) { return ctrl.getContent('companyEmployeeFamilyHSAContribution1') + ctrl.getContent('companyEmployeeFamilyHSAContribution2') + ctrl.getContent('companyEmployeeFamilyHSAContribution3');}",
	"companyHealthInsuraceWaiverBenefitAllowance": "function(ctrl) { var allowance = parseFloat(ctrl.benefitsOverview.healthInsuraceWaiverBenefitAllowance); return allowance.toFixed(2);}",
	"companyHealthInsuraceWaiverBenefitAllowanceVerbiage": "function(ctrl) { return ctrl.getContent('companyHealthInsuraceWaiverBenefitAllowance');}",
	"visionPercentVerbiage": "function(ctrl) {    return ctrl.getContent('visionPercentVerbiage');}",
	"medicalSupVerbiage": "function(ctrl) {    return ctrl.getContent('medicalSupVerbiage');}",
	"dentalSupVerbiage": "function(ctrl) {    return ctrl.getContent('dentalSupVerbiage');}",
	"visionSupVerbiage": "function(ctrl) {    return ctrl.getContent('visionSupVerbiage');}",
	"basicLifeInsurancePolicy": "function(ctrl) {  var basicLife =  ctrl.getContent('basicLifePlanLIFE') + ctrl.getContent('basicLifePlanG5') + ctrl.getContent('basicLifePlan1XLIFE') + ctrl.getContent('basicLifePlan2XLIFE') +" +
	"ctrl.getContent('basicLifePlan3XLIFE') + ctrl.getContent('basicLifePlan0005RS') + ctrl.getContent('basicLifePlanNB2') + ctrl.getContent('basicLifePlanNB3') + ctrl.getContent('basicLifePlanNB4') +" +
	"ctrl.getContent('basicLifePlanNB6') + ctrl.getContent('basicLifePlanNB1') + ctrl.getContent('basicLifePlanNB5') + ctrl.getContent('basicLifePlan00097J') + ctrl.getContent('basicLifePlan00098B') + ctrl.getContent('basicLifePlan000D70');" +
	" if (basicLife === undefined || basicLife === null || basicLife.trim() === '')" +
	" basicLife = ctrl.benefitsOverview.basicLifeInsurance;" +
	" return basicLife;}",
	"fsaPlanEndYear": "function(ctrl) { var benEndDate = new Date(ctrl.benefitsOverview.benefitPlanEndDate).getFullYear(); return benEndDate;}",
	"fsaPlanYears": "function(ctrl) { var fsaPlanYears = ctrl.getContent('fsaPlanYears'); if (fsaPlanYears == undefined || fsaPlanYears == '') fsaPlanYears = ctrl.getContent('fsaPlanYear'); return fsaPlanYears;}",
	"medicalVerbiage": "function(ctrl) {    return ctrl.getContent('medicalVerbiage');}",
	"medicalPercentVerbiage": "function(ctrl) { return ctrl.getContent('medicalPercentVerbiage');}",
	"dentalPercentVerbiage": "function(ctrl) { return ctrl.getContent('dentalPercentVerbiage');}",
	"familyMedicalPercentVerbiage": "function(ctrl) { return ctrl.getContent('familyMedicalPercentVerbiage');}",
	"familyDentalPercentVerbiage": "function(ctrl) { return ctrl.getContent('familyDentalPercentVerbiage');}",
	"familyVisionPercentVerbiage": "function(ctrl) {  return ctrl.getContent('familyVisionPercentVerbiage');}",
	"basicLifeInsurancePolicyValue": "function(ctrl) {   return ctrl.benefitsOverview.basicLifeInsurance;}",
	"groupShortTermDisabilityInsuranceSalaryReplacementPercent": "function(ctrl) { return ctrl.benefitsOverview.groupShortTermDisabilityInsuranceSalaryReplacementPercent;}",
	"groupShortTermDisabilityInsuraceMaxBenefitDays": "function(ctrl) { return (ctrl.getContent('groupShortTermDisabilityMaxBenefitDays180') + ctrl.getContent('groupShortTermDisabilityMaxBenefitDays90') + ctrl.getContent('groupShortTermDisabilityMaxBenefitDaysDefault'));}",
	"groupLongTermDisabilityInsuranceSalaryReplacementPercent": "function(ctrl) {    return ctrl.benefitsOverview.groupLongTermDisabilityInsuranceSalaryReplacementPercent;}",
	"retirementPlanContributionPercent": "function(ctrl) {    return ctrl.benefitsOverview.retirementPlanContributionPercent;}",
	"retirementPlanContributionYearlyMax": "function(ctrl) {  return ctrl.benefitsOverview.retirementPlanContributionYearlyMax;}",
	"benefitPlanStartDate": "function(ctrl,utilService) { return utilService.filterDate(utilService.getStandardDate(ctrl.benefitsOverview.benefitPlanStartDate), 'MMMM dd,yyyy');}",
	"benefitPlanEndDate": "function(ctrl, utilService) {    return utilService.filterDate(utilService.getStandardDate(ctrl.benefitsOverview.benefitPlanEndDate), 'MMMM dd,yyyy');}",
	"fsaPlanStartYear": "function(ctrl) {    var benStartDate = new Date(ctrl.benefitsOverview.benefitPlanStartDate).getFullYear();     return benStartDate;}",
	"groupLongTermDisabilityInsuraceWaitingPeriod": "function(ctrl) { return ctrl.getContent('groupLongTermDisabilityInsuraceWaitingPeriod180') + ctrl.getContent('groupLongTermDisabilityInsuraceWaitingPeriod90') + ctrl.getContent('groupLongTermDisabilityInsuraceWaitingPeriodDefault');}",
	"verbiageSeparator2": "function(ctrl) {    var content = ctrl.getContent('verbiageSeparator2');   var isDent = ctrl.benefitsOverview.companyGroupDentalInsurance;  var isVis = ctrl.benefitsOverview.companyGroupVisionInsurance;" +
	"var isMed = ctrl.benefitsOverview.companyGroupMedicalInsurance; if (isVis) return content; return '';}",
	"verbiageSeparator3": "function(ctrl) { var content3 = ctrl.getContent('verbiageSeparator3');  var content2 = ctrl.getContent('verbiageSeparator2');  var isDent = ctrl.benefitsOverview.companyGroupDentalInsurance;" +
	"var isVis = ctrl.benefitsOverview.companyGroupVisionInsurance;  var isMed = ctrl.benefitsOverview.companyGroupMedicalInsurance;  if (!isMed) return ''; if (isMed && isDent && isVis) return content3; if (isMed && isDent) return content2; return ''; }",
	"groupShortTermDisabilityInsurance": "function(ctrl) {  var groupShortTermDisabilityInsurance =" +
	"ctrl.getContent('groupShortTermDisabilityInsurancePlanSTD1')+ ctrl.getContent('groupShortTermDisabilityInsurancePlanSTD3') + ctrl.getContent('groupShortTermDisabilityInsurancePlanSTD2') + ctrl.getContent('groupShortTermDisabilityInsurancePlanNB7') +" +
	"ctrl.getContent('groupShortTermDisabilityInsurancePlanNB8') +  ctrl.getContent('groupShortTermDisabilityInsurancePlan00097Y') + ctrl.getContent('groupShortTermDisabilityInsurancePlan000D8Y') + ctrl.getContent('groupShortTermDisabilityInsurancePlan000D97') +" +
	"ctrl.getContent('groupShortTermDisabilityInsurancePlan000E2E') + ctrl.getContent('groupShortTermDisabilityInsurancePlan000E2A') + ctrl.getContent('groupShortTermDisabilityInsurancePlan000E2C') + ctrl.getContent('groupShortTermDisabilityInsurancePlan000E2G') +" +
	"ctrl.getContent('groupShortTermDisabilityInsurancePlan000E2K') + ctrl.getContent('groupShortTermDisabilityInsurancePlan000E2B') + ctrl.getContent('groupShortTermDisabilityInsurancePlan000E2I') + ctrl.getContent('groupShortTermDisabilityInsurancePlan000JNJ') +" +
	"ctrl.getContent('groupShortTermDisabilityInsurancePlan000JNF') + ctrl.getContent('groupShortTermDisabilityInsurancePlan000JNL') + ctrl.getContent('groupShortTermDisabilityInsurancePlan000JNH');" +
	"if (groupShortTermDisabilityInsurance == undefined || groupShortTermDisabilityInsurance == null || groupShortTermDisabilityInsurance.trim() == '') {" +
	"groupShortTermDisabilityInsurance = ctrl.benefitsOverview.groupShortTermDisabilityInsurance;" +
	"if (groupShortTermDisabilityInsurance.indexOf('%') > 0) {" +
	" groupShortTermDisabilityInsurance =  groupShortTermDisabilityInsurance.substring(0, groupShortTermDisabilityInsurance.indexOf('%') + 1);" +
	"}    }    return groupShortTermDisabilityInsurance;}",
	"groupLongTermDisabilityInsurance": "function(ctrl) { var groupLongTermDisabilityInsurance =" +
	"ctrl.getContent('groupLongTermDisabilityInsurancePlanOLTD') + ctrl.getContent('groupLongTermDisabilityInsurancePlanLTD2') + ctrl.getContent('groupLongTermDisabilityInsurancePlanLTD1') + ctrl.getContent('groupLongTermDisabilityInsurancePlanLTD3') +" +
	"ctrl.getContent('groupLongTermDisabilityInsurancePlanNB4') + ctrl.getContent('groupLongTermDisabilityInsurancePlanNB7') + ctrl.getContent('groupLongTermDisabilityInsurancePlanNB6') + ctrl.getContent('groupLongTermDisabilityInsurancePlanNB5') +" +
	"ctrl.getContent('groupLongTermDisabilityInsurancePlan00097O') + ctrl.getContent('groupLongTermDisabilityInsurancePlan00097X') + ctrl.getContent('groupLongTermDisabilityInsurancePlan000D94') + ctrl.getContent('groupLongTermDisabilityInsurancePlan000D9D') +" +
	"ctrl.getContent('groupLongTermDisabilityInsurancePlan000E2T') + ctrl.getContent('groupLongTermDisabilityInsurancePlan000E2U') + ctrl.getContent('groupLongTermDisabilityInsurancePlan000E2S') + ctrl.getContent('groupLongTermDisabilityInsurancePlan000E2Q') +" +
	"ctrl.getContent('groupLongTermDisabilityInsurancePlan000E2R') + ctrl.getContent('groupLongTermDisabilityInsurancePlan000E2V') + ctrl.getContent('groupLongTermDisabilityInsurancePlan000JND') + ctrl.getContent('groupLongTermDisabilityInsurancePlan000JNB') +" +
	"ctrl.getContent('groupLongTermDisabilityInsurancePlan000JNE') + ctrl.getContent('groupLongTermDisabilityInsurancePlan000JNC');" +
	"if (groupLongTermDisabilityInsurance == undefined || groupLongTermDisabilityInsurance == null || groupLongTermDisabilityInsurance.trim() == '') {" +
	"groupLongTermDisabilityInsurance = ctrl.benefitsOverview.groupLongTermDisabilityInsurance;" +
	"if (groupLongTermDisabilityInsurance.indexOf('%') > 0) {" +
	"groupLongTermDisabilityInsurance = groupLongTermDisabilityInsurance.substring(0, groupLongTermDisabilityInsurance.indexOf('%') + 1);" +
	"} } return groupLongTermDisabilityInsurance;}"
};
