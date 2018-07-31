'use strict';

require('./dc-calculator.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/fsa-calculator/dc-calculator/dc-calculator.component.html',
	controller: ['dcCalculatorService',DCCalculatorController],
	bindings: {
		listFilingStatus: '<'
	}
};
/* @ngInject */
function DCCalculatorController(dcCalculatorService) {
	var ctrl = this;

	ctrl.listFilingStatus = [
		{ label: 'Single', value: 0 },
		{ label: 'Married (joint)', value: 1 },
		{ label: 'Married (separate)', value: 2 },
		{ label: 'Head of household', value: 3 }
	];

	// Input - Filing status, Income, and Number of dependents
	ctrl.annualIncome = "";
	ctrl.numDependents = "";
	ctrl.selectedFilingStatus = ctrl.listFilingStatus[0];

	// Input - day care expenses
	ctrl.nannyDaycare = "";
	ctrl.schoolExpenses = "";
	ctrl.licensedDaycare = "";
	ctrl.summerDaycare = "";
	ctrl.qualifiedAdultsCare = "";

	// Output
	ctrl.totalExpenses = "";
	ctrl.suggestedContribution = "";
	ctrl.federalTaxSavings = "";
	ctrl.ficaSavings = "";
	ctrl.totalSavings = "";

	ctrl.$onInit = function() {

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
		ctrl.totalExpenses = 	parseFloat(ctrl.nannyDaycare) +
													parseFloat(ctrl.schoolExpenses) +
													parseFloat(ctrl.licensedDaycare) +
													parseFloat(ctrl.summerDaycare) +
													parseFloat(ctrl.qualifiedAdultsCare);
		ctrl.totalExpenses = ctrl.totalExpenses.toFixed(2);
	};

	ctrl.calculateSuggestedContribution = function () {
		// Invoke calculator service to get the suggested contribution
		ctrl.suggestedContribution = dcCalculatorService.calculateSuggestedContribution(parseFloat(ctrl.totalExpenses));
		ctrl.suggestedContribution = ctrl.suggestedContribution.toFixed(2);
	};

	ctrl.calculateTaxSavings = function () {
		// Annual income
		var annualIncome = parseFloat(ctrl.annualIncome);

		// Number of dependents
		var numDependents = parseInt(ctrl.numDependents, 10);

		// Calculate federal tax
		ctrl.federalTaxSavings = dcCalculatorService.calculateFederalTaxSavings (ctrl.selectedFilingStatus.value, annualIncome, numDependents) -
															dcCalculatorService.calculateFederalTaxSavings (ctrl.selectedFilingStatus.value, annualIncome - parseFloat(ctrl.suggestedContribution), numDependents);
		ctrl.federalTaxSavings = ctrl.federalTaxSavings.toFixed(2);

		//	Calculate FICA
		ctrl.ficaSavings = dcCalculatorService.calculateFicaSavings (annualIncome) - dcCalculatorService.calculateFicaSavings (annualIncome - parseFloat(ctrl.suggestedContribution));
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
		ctrl.nannyDaycare = "";
		ctrl.schoolExpenses = "";
		ctrl.licensedDaycare = "";
		ctrl.summerDaycare = "";
		ctrl.qualifiedAdultsCare = "";

		// Output
		ctrl.totalExpenses = "";
		ctrl.suggestedContribution = "";
		ctrl.federalTaxSavings = "";
		ctrl.ficaSavings = "";
		ctrl.totalSavings = "";
	}
}
