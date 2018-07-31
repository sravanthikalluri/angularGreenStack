'use strict';

module.exports = dcCalculatorService;

/* @ngInject */
function dcCalculatorService(DS, gso) {
   var ctrl = this;

   // Predefined limits
 	ctrl.contributionMax = 5000;
 	ctrl.contributionMin = 200;
 	ctrl.medicalPercentage = .0145;
 	ctrl.socialSecutityPercentage = .062;
 	ctrl.socialSecutityLimit = 94200;
 	ctrl.exemptAmount = 3300;
  ctrl.personal_exempt = [3300, 6600, 3300, 3300];
  ctrl.deductions = [5150, 10300, 5150, 7550];
  ctrl.taxlimit1 = [7550, 15100, 7550, 10750];
  ctrl.taxlimit2 = [30650, 61300, 30650, 41050];
  ctrl.taxlimit3 = [74200, 123700, 61850, 106000];
  ctrl.taxlimit4 = [154800, 188450, 94225, 171650];
  ctrl.taxlimit5 = [336550, 336550, 168275, 336550];
  ctrl.taxPercent = [0.1, 0.15, 0.25, 0.28, 0.33, 0.35];

  ctrl.calculateSuggestedContribution = function (totalExpenses) {
		// Set to total expenses
		var suggestedContribution = totalExpenses;

		// Check against min/max limits
		if (suggestedContribution < parseInt(ctrl.contributionMin, 10))
			suggestedContribution = ctrl.contributionMin;

		if (suggestedContribution > parseInt(ctrl.contributionMax, 10))
			suggestedContribution = ctrl.contributionMax;

      return suggestedContribution;
	};

	ctrl.calculateFicaSavings = function (annualIncome) {
		if (annualIncome > parseInt (ctrl.socialSecutityLimit, 10)-1) {
			return (parseInt (ctrl.socialSecutityLimit, 10) * parseFloat(ctrl.socialSecutityPercentage)) +
					(parseFloat (ctrl.medicalPercentage) * annualIncome);
		}
		else {
			return (parseFloat (ctrl.socialSecutityPercentage) + parseFloat (ctrl.medicalPercentage)) * annualIncome;
		}
	}

	ctrl.calculateFederalTaxSavings = function (filingStatus, annualIncome, numDependents) {
    // Apply deductions and exemptions
    annualIncome = annualIncome -
                    ctrl.personal_exempt[filingStatus] -
                    (numDependents * ctrl.exemptAmount) -
                    ctrl.deductions[filingStatus];

    var tempAmount = 0;

    //  Check agaist tax limit 1
    if (annualIncome < ctrl.taxlimit1[filingStatus])
  		return ctrl.taxPercent[0] * annualIncome;
  	else
  		tempAmount = ctrl.taxPercent[0] * ctrl.taxlimit1[filingStatus];

    //  Check agaist tax limit 1
    if (annualIncome < ctrl.taxlimit1[filingStatus])
    	return ctrl.taxPercent[0] * annualIncome;
    else
    	tempAmount = ctrl.taxPercent[0] * ctrl.taxlimit1[filingStatus];

    //  Check agaist tax limit 2
    if (annualIncome < ctrl.taxlimit2[filingStatus])
    	return tempAmount + ctrl.taxPercent[1] * (annualIncome - ctrl.taxlimit1[filingStatus]);
    else
    	tempAmount = tempAmount + (ctrl.taxPercent[1] * (ctrl.taxlimit2[filingStatus] - ctrl.taxlimit1[filingStatus]));

    //  Check agaist tax limit 3
    if (annualIncome < ctrl.taxlimit3[filingStatus])
    	return tempAmount + ctrl.taxPercent[2] * (annualIncome - ctrl.taxlimit2[filingStatus]);
    else
    	tempAmount = tempAmount + (ctrl.taxPercent[2] * (ctrl.taxlimit3[filingStatus] - ctrl.taxlimit2[filingStatus]));

    //  Check agaist tax limit 4
    if (annualIncome < ctrl.taxlimit4[filingStatus])
    	return tempAmount + ctrl.taxPercent[3] * (annualIncome - ctrl.taxlimit3[filingStatus]);
    else
    	tempAmount = tempAmount + (ctrl.taxPercent[3] * (ctrl.taxlimit4[filingStatus] - ctrl.taxlimit3[filingStatus]));

    //  Check agaist tax limit 5
    if (annualIncome < ctrl.taxlimit5[filingStatus])
    	return tempAmount + ctrl.taxPercent[4] * (annualIncome - ctrl.taxlimit4[filingStatus]);
    else
    	tempAmount = tempAmount + (ctrl.taxPercent[4] * (ctrl.taxlimit5[filingStatus] - ctrl.taxlimit4[filingStatus]));

    //  Return the final amount
    return tempAmount + (ctrl.taxPercent[5] * (annualIncome - ctrl.taxlimit5[filingStatus]));
	}

	 return ctrl;
}
