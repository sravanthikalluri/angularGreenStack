'use strict';

require('./hc-calculator.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/fsa-calculator/hc-calculator/hc-calculator.component.html',
	controller: ['DS','$filter','hcCalculatorService',HCCalculatorController],
	bindings: {
		listFilingStatus: '<',
		employeeId: '<',
		companyId: '<'
	}
};
/* @ngInject */
function HCCalculatorController(DS,$filter,hcCalculatorService) {
	var ctrl = this;

	ctrl.contributionText = "";
	ctrl.listFilingStatus = [
		{ label: 'Single', value: 0 },
		{ label: 'Married (joint)', value: 1 },
		{ label: 'Married (separate)', value: 2 },
		{ label: 'Head of household', value: 3 }
	];

	// Predefined limits
 	ctrl.contributionMin = 200;
	ctrl.contributionMax = 5000;

	// Input - Filing status, Income, and Number of dependents
	ctrl.annualIncome = "";
	ctrl.numDependents = "";
	ctrl.selectedFilingStatus = ctrl.listFilingStatus[0];

	// Input -
	ctrl.medicalExpenses = "";
	ctrl.visionExpenses = "";
	ctrl.dentalExpenses = "";
	ctrl.otherExpenses = "";

	// Output
	ctrl.totalExpenses = "";
	ctrl.suggestedContribution = "";
	ctrl.federalTaxSavings = "";
	ctrl.ficaSavings = "";
	ctrl.totalSavings = "";

	ctrl.$onInit = function() {

		DS.find('benefits_fsa_limits', '/fsa-annual-limits').then(function (result) {
	      ctrl.contributionMin = result.contributionLimits.min_annual_contrib;
				ctrl.contributionMax = result.contributionLimits.max_annual_contrib;

				ctrl.contributionText =  $filter('translate')('fsa-calculator.hc.label_suggested_contributions');
				ctrl.contributionText = ctrl.contributionText.replace("{1}", ctrl.contributionMin);
				ctrl.contributionText = ctrl.contributionText.replace("{2}", ctrl.contributionMax);
	  }).catch(function (error) {
	    ctrl.errorStatus = error;
	  });
	};

	ctrl.calculateSavings = function () {

		// Validate annual income
		if (ctrl.annualIncome == "")
		{
			alert ("Please enter your total annual income.");
			return;
		}

		if (ctrl.annualIncome < 5000)
		{
			alert ("Your annual income input must exceed $5,000.");
			return;
		}

		// Validate number of dependents
		if (ctrl.numDependents == "")
		{
			alert ("Please enter your number of dependents.");
			return;
		}

		// Calculate savings
		ctrl.calculateTotalExpenses ();
		ctrl.calculateSuggestedContribution ();
		ctrl.calculateTaxSavings ();

	};

	ctrl.calculateTotalExpenses = function () {
		ctrl.totalExpenses = 	parseFloat(ctrl.medicalExpenses) +
													parseFloat(ctrl.visionExpenses) +
													parseFloat(ctrl.dentalExpenses) +
													parseFloat(ctrl.otherExpenses);
		ctrl.totalExpenses = ctrl.totalExpenses.toFixed(2);
	};

	ctrl.calculateSuggestedContribution = function () {
		// Invoke calculator service to get the suggested contribution
		ctrl.suggestedContribution = hcCalculatorService.calculateSuggestedContribution(parseFloat(ctrl.totalExpenses), parseFloat(ctrl.contributionMin), parseFloat(ctrl.contributionMax));
		ctrl.suggestedContribution = ctrl.suggestedContribution.toFixed(2);
	};

	ctrl.calculateTaxSavings = function () {
		// Annual income
		var annualIncome = parseFloat(ctrl.annualIncome);

		// Number of dependents
		var numDependents = parseInt(ctrl.numDependents, 10);

		// Calculate federal tax
		ctrl.federalTaxSavings = hcCalculatorService.calculateFederalTaxSavings (ctrl.selectedFilingStatus.value, annualIncome, numDependents) -
															hcCalculatorService.calculateFederalTaxSavings (ctrl.selectedFilingStatus.value, annualIncome - parseFloat(ctrl.suggestedContribution), numDependents);;
		ctrl.federalTaxSavings = ctrl.federalTaxSavings.toFixed(2);

		//	Calculate FICA
		ctrl.ficaSavings = hcCalculatorService.calculateFicaSavings (annualIncome) - hcCalculatorService.calculateFicaSavings (annualIncome - parseFloat(ctrl.suggestedContribution));
		ctrl.ficaSavings = ctrl.ficaSavings.toFixed(2);

		//	Total savings
		ctrl.totalSavings = parseFloat(ctrl.federalTaxSavings) + parseFloat(ctrl.ficaSavings);
		ctrl.totalSavings = ctrl.totalSavings.toFixed(2);
	};

	ctrl.resetValues = function () {
		// Income, number of dependents, filing status etc.
		ctrl.annualIncome = "";
		ctrl.numDependents = "";
		ctrl.selectedFilingStatus = ctrl.listFilingStatus[0];

		// Input
		ctrl.medicalExpenses = "";
		ctrl.visionExpenses = "";
		ctrl.dentalExpenses = "";
		ctrl.otherExpenses = "";

		// Output
		ctrl.totalExpenses = "";
		ctrl.suggestedContribution = "";
		ctrl.federalTaxSavings = "";
		ctrl.ficaSavings = "";
		ctrl.totalSavings = "";
	}
}
