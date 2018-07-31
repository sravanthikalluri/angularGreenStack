'use strict';

require('./paid-timeoff-policies.scss');

module.exports = {
	templateUrl: 'app/main/company/forms-and-policies/forms-policies-accordion/paid-timeoff-policies/paid-timeoff.component.html',
	controller: ['DS','gso','paidTimeOffRules', paidTimeOffController],
	bindings: {
		data: '<',
		errorMessage: '<'
	}
};

function paidTimeOffController(DS,gso,paidTimeOffRules) {
	var ctrl = this;
	ctrl.companyName=gso.getAppConfig().companyName;
	ctrl.$onInit = function(){
		DS.find('paidTimeOffService','paid-timeoff-policies').then(function(result){
			ctrl.showFullSpinner=false;
           ctrl.benefitsPaidTimeOff= result.policiesDetails;
		   ctrl.noDays=ctrl.numberToWord(ctrl.benefitsPaidTimeOff.numberOfCompanyHolidays);
           ctrl.personalList = ctrl.benefitsPaidTimeOff.leavePlans.filter(function(item){
				return item.planType === '52';
		   });
		   ctrl.VacationPTOList = ctrl.benefitsPaidTimeOff.leavePlans.filter(function(item){
           		return item.planType === '51';
           });
           ctrl.sickList = ctrl.benefitsPaidTimeOff.leavePlans.filter(function(item){
              return item.planType === '50';
           });
           ctrl.getPaidTimeOffData();
		}).catch(function(error){
			ctrl.errorMessage = error.data._error.message;
		});
	};

  // Adding this logic to convert number to word
   var oneToNine = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
   var teenGroup = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
   var tensGroup = ['ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
   var higherGroups = ['hundred', 'thousand'];

   ctrl.numberToWord = function(number) {
   	var value = '';
   	if (number == null || number == '')
   		return;
   	if (number < 10)
   		value = oneToNine[number];
   	else if (number > 10 && number < 20)
   		value = teenGroup[number - 11];
   	else if (number % 10 == 0)
   		value = tensGroup[(number / 10) - 1];
   	else if (number < 100) {
   		var tens = new String(number/10);
   		value = tensGroup[tens.charAt(0) - 1] + " " + oneToNine[number % 10];
   	} else {
   		//add later
   		value = number;
   	}

   	return value = value + " (" + number +")";
   };

   ctrl.getPaidTimeOffData=function() {
	   // condition to check Balance INFO
	   ctrl.paidTimeOffPlans = [];
	   if (ctrl.VacationPTOList.length>0) {
		   if (ctrl.VacationPTOList[0].verdorId=== 'TNPTO')
			   ctrl.paidTimeOffPlans.push(ctrl.getContent("paidTimeOff"));
		   else
			   ctrl.paidTimeOffPlans.push(ctrl.getContent("vacation"));
	   }

	   if (ctrl.VacationPTOList.length>0 && ctrl.sickList.length>0) {
	   	   if(ctrl.sickList[0].accruals[0].numberOfSickLeaves > 0)
			   ctrl.paidTimeOffPlans.push(ctrl.getContent("sickLeave"));
	   }

	   if (ctrl.personalList.length>0) {
		   ctrl.paidTimeOffPlans.push(ctrl.getContent("personalLeave"));
	   }

       ctrl.balanceInfo=ctrl.paidTimeOffPlans.join(', ');

	   ctrl.companyOffersAnyPaidTimeOff = false;

	   if ((ctrl.sickList.length>0 && ctrl.sickList[0].accruals[0].numberOfSickLeaves)
		   || (ctrl.VacationPTOList.length>0)
		   || (ctrl.personalList.length>0)) {
		   ctrl.companyOffersAnyPaidTimeOff = true;
	   }
	   ctrl.companyHolidaysHeading = ctrl.getContent("companyHolidaysHeading");
	   ctrl.companyOffersNoHolidays = ctrl.getContent("CompanyOffersNoHolidays");
	   ctrl.otherPaidTimeOffHeading = ctrl.getContent("otherPaidTimeOffHeading");
	   ctrl.companyHolidays= ctrl.getContent("companyOffersHolidays");
	   if (ctrl.VacationPTOList.length>0) {
		   ctrl.table = ctrl.getContent("Table");
		   ctrl.paidTimeOff = ctrl.getContent("paidTimeOff");
		   ctrl.ptoVacationSection1 = ctrl.getContent("ptoVacationSection1");
		   ctrl.CompanyOffersPaidTimeOffOrVacation = ctrl.getContent("ptoVacationSection1");
		   ctrl.ptoVacationSection2 = ctrl.getContent("ptoVacationSection2");
		   ctrl.ptoVacationCoverage = ctrl.VacationPTOList[0].verdorId==="TRINET"?ctrl.getContent("ptoVacationPTOCoverage"):ctrl.getContent("ptoVacationVacationCoverage")
		   ctrl.ptoVacationSection3 = ctrl.getContent("ptoVacationSection3");
		   ctrl.ptoWaitingPeriod = ctrl.getContent("ptoVacationWaitingPeriod");

		   ctrl.ptoVacationApprovalPaymentTerms = ctrl.getContent("ptoVacationApprovalPaymentTerms");
		   ctrl.vacation = ctrl.getContent("vacation");
		   if(ctrl.sickList.length>0) {
			   ctrl.sickLeaveDetails = ctrl.getContent("sickLeaveDetails");
			   ctrl.sickLeaveCarryForward = ctrl.getContent("sickLeaveCarryForward");
			   ctrl.sickLeaveWaitingPeriod = ctrl.getContent("sickLeaveWaitingPeriod");
		   }
	   }
	   if (ctrl.personalList.length>0) {
	   	ctrl.personaltable = ctrl.getContent("PersonalTable");
	   ctrl.personalLeaveSection1 = ctrl.getContent("personalLeaveSection1");
	   ctrl.personalLeaveSection3 = ctrl.getContent("personalLeaveSection3");
	   ctrl.personalLeaveSection4 = ctrl.getContent("personalLeaveSection4");
	   ctrl.personalLeaveSection5 = ctrl.getContent("personalLeaveSection5");
       }
        if(ctrl.benefitsPaidTimeOff.additionPaidLeave !=null) {
			ctrl.juryDutyPaidTimeOffHeading = ctrl.getContent("juryDutyPaidTimeOffHeading");
			ctrl.JuryDutyPaidTimeOff = ctrl.benefitsPaidTimeOff.additionPaidLeave.bereavementsComment != null ? ctrl.benefitsPaidTimeOff.additionPaidLeave.juryDutiesComment : ctrl.getContent("juryDutyPaidTimeOff");
			ctrl.CompanyOffersBereavementPaidTimeOff = ctrl.getContent("bereavementPaidTimeOff");
			ctrl.bereavementPaidTimeOffHeading = ctrl.getContent("bereavementPaidTimeOffHeading");
			ctrl.bereavementPaidTimeOff = ctrl.benefitsPaidTimeOff.additionPaidLeave.juryDutiesComment != null ? ctrl.benefitsPaidTimeOff.additionPaidLeave.bereavementsComment : ctrl.getContent("bereavementPaidTimeOff");
			ctrl.otherPaidLeaveOrTimeOff = ctrl.getContent("otherPaidLeaveOrTimeOff");
			ctrl.addionalPaidLeave = ctrl.getContent("addionalPaidLeave");
			ctrl.addionalPaidLeaveHeading = ctrl.getContent("addionalPaidLeaveHeading");
		}


  }


   ctrl.getContent = function (tagId) {
  		var contentObject = paidTimeOffRules.contentObjects[tagId];
  		//  If the timestamp from the server is after the "publishDate" and is before the "expireDate", then continue processing.
  		//  If not, then do not show this content.
  		if (contentObject.hasOwnProperty('publishDate') && (new Date(getVariable("timestamp"))) < (new Date(contentObject.publishDate))) {
  			return "";
  		}
  		if (contentObject.hasOwnProperty('expireDate') && (new Date(getVariable("timestamp"))) > (new Date(contentObject.expireDate))) {
  			return "";
  		}
  		if (contentObject.hasOwnProperty('rule') && !evaluateRule(contentObject.rule)) {
  			return  true;
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
  		return ctrl.benefitsPaidTimeOff[variableName];
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
  			var value = new Function('return ' + rules[parts[0]])(ctrl);
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

    function getContentOrderedList() {
		 var items = new Array();
		 for(var i=0; i < arguments.length; ++i) {
			 var item = this.getContent(arguments[i]);
			 if (item !== '') {
				 items.push('<li>' + item + '</li>');
			 }
		 }
		 return ((items.length > 0) ? '<ol>' + items.join('') + '</ol>' : '');
	 }

	function getContentUnorderedList(){
	 var items = new Array();
	  for(var i=0; i < arguments.length; ++i) {
		var item = this.getContent(arguments[i]);
		if (item !== '') {
			items.push('<li>' + item + '</li>');
		}
	  }
	  return ((items.length > 0) ? '<ul>' + items.join('') + '</ul>' : '');
	}
}

/**
 * Description: All the rules which are defined here to display company time off policies information
 * Author:Thaviti Naidu
 */

var rules = {
	"CompanyOffersNoHolidays": "function (ctrl) { return ctrl.benefitsPaidTimeOff.numberOfCompanyHolidays>0 }",
	"CompanyOffersHolidays":   "function (ctrl) { return ctrl.benefitsPaidTimeOff.numberOfCompanyHolidays<=0}",
	"FloatingHolidaysType" :   "function (floatingHolidaysType) { if(floatingHolidaysType === ctrl.benefitsPaidTimeOff.floatingHolidaysType){return true;}else{return false;}}",
	"CompanyOffersFloatingHolidays": "function (floatingHolidaysType) { if(floatingHolidayType === Unrestricted){return ctrl.benefitsPaidTimeOff.numberOfUnrestrictedFloatingHolidays>0;}else{return ctrl.benefitsPaidTimeOff.numberOfRestrictedFloatingHolidays>0;}}",
	"PaidTimeOffOrVacation": "function (paidTypeOffType) { if(ctrl.benefitsPaidTimeOff.paidTimeOff !=null && paidTypeOffType ===  ctrl.benefitsPaidTimeOff.ptoVacation.paidTypeOffType){return true;}else{return false;}}",
	"PTOVacationEligibilityClass":"function (eligibilityClass) {  return ctrl.benefitsPaidTimeOff.ptoVacation !=null && ctrl.benefitsPaidTimeOff.ptoVacation.eligibleClass == eligibilityClass}}",
	"AdditionPaidLeaveEligibilityClass":"function (eligibilityClass) { return ctrl.benefitsPaidTimeOff.additionPaidLeave !=null && ctrl.benefitsPaidTimeOff.additionPaidLeave.eligibleClass == eligibilityClass;}",
	"CompanyOffersPaidTimeOffOrVacation":"function (ctrl) { return ctrl.VacationPTOList!=null}",
	"CompanyOffersSickLeave":"function (ctrl) { return ctrl.sickList[0].accruals[0] !=null && ctrl.sickList[0].accruals[0].numberOfSickLeaves>0}",
	"CompanyOffersPersonalLeave":"function (ctrl) { return ctrl.personalList[0] !=null }",
	"CompanyOffersJuryDutyPaidTimeOff":"function (ctrl) { return ctrl.benefitsPaidTimeOff.additionPaidLeave.numberOfJuryDuties !=null && ctrl.benefitsPaidTimeOff.additionPaidLeave.numberOfJuryDuties>0}",
	"CompanyOffersBereavementPaidTimeOff":"function (ctrl) { return ctrl.benefitsPaidTimeOff.additionPaidLeave.numberOfBereavements !=null && ctrl.benefitsPaidTimeOff.additionPaidLeave.numberOfBereavements>0}",
	"CompanyOffersPaidTimeOffPlan":"function (ctrl) { var companyOffersAnyPaidTimeOff = false; if ((ctrl.sickList[0] != null && ctrl.sickList[0].numberOfSickLeaves > 0)|| (ctrl.VacationPTOList[0] != null) || (ctrl.personalList[0] != null)) { companyOffersAnyPaidTimeOff = true;}return companyOffersAnyPaidTimeOff;}",
	"CompanyOffersNoPaidTimeOff":"function (ctrl) { var companyOfferNoPaidTimeOff = false;  if ((this.data.paidTimeOff.additionPaidLeave.numberOfBereavements != null &&  this.data.paidTimeOff.additionPaidLeave.numberOfBereavements > 0) || (this.data.paidTimeOff.additionPaidLeave.numberOfJuryDuties != null &&  this.data.paidTimeOff.additionPaidLeave.numberOfJuryDuties > 0) || (this.data.paidTimeOff.sickLeave != null && this.data.paidTimeOff.sickLeave.numberOfSickLeaves > 0)|| (this.data.paidTimeOff.ptoVacation != null)|| (this.data.paidTimeOff.personalLeave != null)) { companyOfferNoPaidTimeOff = false; }return companyOfferNoPaidTimeOff;}",
};



var varSubstitute = {
	"paidTimeOffOrVacation":"function (ctrl) { if(ctrl.VacationPTOList[0].verdorId=== 'TNPTO'){ return ctrl.getContent('paidTimeOff')}else{ return ctrl.getContent('vacation');}}",
	"paidTimeOffEligibilityClass":"function (ctrl) { if(ctrl.VacationPTOList[0].eligibleClass=== 'F'){ return ctrl.getContent('fulltimeEligibilityClass')}else{ return ctrl.getContent('fulltimeParttimeEligibilityClass');}}",
    "numberOfSickLeaves":"function (ctrl) {return ctrl.numberToWord(ctrl.sickList[0].accruals[0].numberOfSickLeaves)}",
    "sickLeaveCarryForward":"function (ctrl) {return ctrl.sickList[0].accruals[0].carryForwardHours}",
    "sickLeaveWaitingPeriod":"function (ctrl) {return ctrl.sickList[0].waitingPeriod}",
    "sickLeaveWaitingPeriodInMonths":"function (ctrl) { if( ctrl.sickList[0].waitingPeriod>0) { return ctrl.getContent('sickLeaveWaitingPeriodInMonths')} return ctrl.getContent('noLabel')}",
    "personalLeaveEligibilityClass":"function (ctrl) { if(ctrl.personalList[0].eligibleClass=== 'F'){ return ctrl.getContent('fulltimeEligibilityClass')}else{ return ctrl.getContent('fulltimeParttimeEligibilityClass');}}",
    "personalLeaveWaitingPeriodInMonths":"function (ctrl) { if( ctrl.personalList[0].waitingPeriod>0) { return ctrl.getContent('personalLeaveWaitingPeriodInMonths')} return ctrl.getContent('noLabel')}",
    "numberOfJuryDutyPaidTimeOff":"function (ctrl) {return ctrl.numberToWord(ctrl.benefitsPaidTimeOff.additionPaidLeave.numberOfJuryDuties)}",
    "numberOfBereavementPaidTimeOff":"function (ctrl) {return ctrl.numberToWord(ctrl.benefitsPaidTimeOff.additionPaidLeave.numberOfBereavements)}",
    "addionalLeaveEligibilityClass":"function (ctrl) { if(ctrl.benefitsPaidTimeOff.additionPaidLeave.eligibleClass=== 'FT'){ return ctrl.getContent('fulltimeEligibilityClass')}else{ return ctrl.getContent('fulltimeParttimeEligibilityClass');}}",
    "additionalPaidLeaveWaitingPeriod" :"function (ctrl) { if(ctrl.benefitsPaidTimeOff.additionPaidLeave.waitingPeriod=== null ||ctrl.benefitsPaidTimeOff.additionPaidLeave.waitingPeriod.trim()==='' ){ return ctrl.getContent('none')}else{ return ctrl.benefitsPaidTimeOff.additionPaidLeave.waitingPeriod }}",
	"numberOfCompanyHolidays":"function (ctrl) {return ctrl.numberToWord(ctrl.benefitsPaidTimeOff.numberOfCompanyHolidays)}"


};
