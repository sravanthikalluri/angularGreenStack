'use strict';

var angular = require('angular');
require('angular-mocks');

var paidTimeOffPolicies = require('./paid-timeoff.component');

describe('paid timeoff component', function (){
	var ctrl;
	var $scope;
	var deferred;
	var DS,gso, paidTimeOffRules;
	var result={
		"policiesDetails":{
			"corporateBrand":"",
			"forms":"forms",
			leavePlans: [
				{planType: '52'},
				{planType: '50'},
				{planType: '51'}
			],
			numberOfCompanyHolidays: 12
		}
	};

	beforeEach(function() {
		var mockDSService=function() {
			return {};
		};
		var mockgsoService=function() {
			return {
				getUtilService : function () {
					return {

					}
				}
			};
		};

		var mockpaidTimeOffRulesService = function () {
			return {
				contentObjects: {
					"fulltimeEligibilityClass":{
						"content":"full-time"
					},
					"fulltimeParttimeEligibilityClass":{
						"content":"full- and part-time"
					},
					"otherPaidTimeOffHeading":{
						"content":"Other Paid Time Off"
					},
					"paidTimeOff":{
						"content":"Paid Time Off "
					},
					"vacation":{
						"content":"Vacation"
					},
					"Table":{
						"content":"{paidTimeOffOrVacation} Earning Plan"
					},
					"PersonalTable":{
						"content":"Personal Leave Earning Plan"
					},
					"sickLeave":{
						"content":"Sick Leave"
					},
					"personalLeave":{
						"content":"Personal Leave"
					},
					"noLabel":{
						"content":" no"
					},
					"none":{
						"content":"None"
					},
					"companyName":{
						"content":"{companyName}"
					},
					"documentTitle":{
						"content":"Paid Time Off Policies"
					},
					"companyHolidaysHeading":{
						"content":"Holidays:"
					},
					"companyOffersHolidays":{
						"content":"offers {numberOfCompanyHolidays} company holiday(s).",
						"rule":"CompanyOffersHolidays"
					},
					"companyHolidaysLink":{
						"content":"",
						"rule":"CompanyOffersHolidays"
					},
					"CompanyOffersNoHolidays":{
						"content":"&nbsp;TriNet does not manage holidays for {companyName}.",
						"rule":"CompanyOffersNoHolidays"
					},
					"restrictedFloatingHolidaysCountPart":{
						"content":"In addition, we offer {numberOfRestrictedFloatingHolidays} Restricted Floating Holiday(s) during the calendar year to regular {holidayEligibilityClass} employees.",
						"rule":"CompanyOffersFloatingHolidays.Restricted"
					},
					"restrictedFloatingHolidaysBirthAndAnnPart":{
						"content":" Restricted Floating Holiday(s) are available only for birthdays and anniversaries.",
						"rule":{
							"And":[
								"CompanyOffersFloatingHolidays.Restricted",
								"FloatingHolidaysType.BirthdayAndAnniversary"
							]
						}
					},
					"restrictedFloatingHolidaysBirthdayPart":{
						"content":" Restricted Floating Holiday will be available only for birthday.",
						"rule":{
							"And":[
								"CompanyOffersFloatingHolidays.Restricted",
								"FloatingHolidaysType.Birthday"
							]
						}
					},
					"restrictedFloatingHolidaysAnniversaryPart":{
						"content":" Restricted Floating Holiday will be available only for anniversary.",
						"rule":{
							"And":[
								"CompanyOffersFloatingHolidays.Restricted",
								"FloatingHolidaysType.Anniversary"
							]
						}
					},
					"restrictedFloatingHolidaysTermPart":{
						"content":" A Restricted Floating Holiday may be used on the exact date of such events or on any other day within a week of that date, provided (in either case) that the employee obtains advance management approval for the scheduled usage of the Restricted Floating Holiday. In addition, Restricted Floating Holidays are not carried over from one year to the next and therefore must be used within the calendar year, if at all. There is no payment for unused Restricted Floating Holidays upon termination of employment.",
						"rule":"CompanyOffersFloatingHolidays.Restricted"
					},
					"unrestrictedFloatingHolidays":{
						"content":"We also offer {numberOfUnrestrictedFloatingHolidays} Unrestricted Floating Holiday(s) during the calendar year to regular, {holidayEligibilityClass} employees. An Unrestricted Floating Holiday may be used at any time for any occasion, provided that the employee obtains advance management approval for the scheduled usage of the Unrestricted Floating Holiday. No carryover or payout of accrued, unused Unrestricted Floating Holidays is made unless required by law.",
						"rule":"CompanyOffersFloatingHolidays.Unrestricted"
					},
					"ptoVacationWaitingPeriodInMonths":{
						"content":" a {ptoVacationWaitingPeriod} month(s)"
					},
					"ptoVacationSection1":{
						"content":"{paidTimeOffOrVacation} credit for {paidTimeOffEligibilityClass} employees is calculated on regular hours worked each pay period and eligible employees may earn up to the hours accrued in the following schedule.",
						"rule":"CompanyOffersPaidTimeOffOrVacation"
					},
					"ptoVacationSection2":{
						"content":"Each multiple of eight hours equals the equivalent of one workday. Once the limit of \"Max Hours\" is reached, all further accruals will cease.  {paidTimeOffOrVacation} accruals will recommence after time off is taken and the balance of accrued time off is less than the \"Max Hours\".",
						"rule":"CompanyOffersPaidTimeOffOrVacation"
					},
					"ptoVacationSection3":{
						"content":"Our {paidTimeOffOrVacation} program applies to any absence from the job not otherwise covered by a specific time off benefit outlined in this addendum (e.g. holiday pay, jury duty, bereavement leave, etc.).",
						"rule":"CompanyOffersPaidTimeOffOrVacation"
					},
					"ptoVacationVacationCoverage":{
						"content":" Vacation covers all scheduled vacation",
					},
					"ptoVacationPTOCoverage":{
						"content":" PTO covers all scheduled vacation or personal time off as well as unscheduled situations such as personal illness, family illness, and emergencies.",
					},
					"ptoVacationWaitingPeriod":{
						"content":"Your company may have a waiting period before you may utilize accrued {paidTimeOffOrVacation}.",
						"rule":"CompanyOffersPaidTimeOffOrVacation"
					},
					"ptoVacationApprovalPaymentTerms":{
						"content":"Usage and scheduling of time off is subject to the direction and approval of your supervisor.<br/>Upon termination of employment, any accrued, but unused {paidTimeOffOrVacation} is paid out only if and as required by applicable law in the employee's work state or company policy. Some states require payment of accrued, but unused, {paidTimeOffOrVacation} upon termination.",
						"rule":"CompanyOffersPaidTimeOffOrVacation"
					},
					"sickLeaveDetails":{
						"content":"We offer up to {numberOfSickLeaves} hours of paid sick leave when your own illness prevents you from reporting to work. Where provided by law, some of your paid sick leave may be available for you to take care of a sick family member or otherwise.",
						"rule":"CompanyOffersSickLeave"
					},
					"sickLeaveWaitingPeriodInMonths":{
						"content":" a {sickLeaveWaitingPeriod} month(s)"
					},
					"sickLeaveWaitingPeriod":{
						"content":"There is {sickLeaveWaitingPeriodInMonths} waiting period before you may utilize sick leave hours except where prohibited by law.",
						"rule":"CompanyOffersSickLeave"
					},
					"sickLeaveCarryForward":{
						"content":"Unused sick leave may be carried forward from one year to the next up to a maximum of {sickLeaveCarryForward} hours unless otherwise required by law. No payment for unused sick leave is made upon termination unless otherwise required by law.",
						"rule":"CompanyOffersSickLeave"
					},
					"personalLeaveWaitingPeriodInMonths":{
						"content":" a {personalLeaveWaitingPeriod} month(s)"
					},
					"personalLeaveSection1":{
						"content":"Personal Leave credit for {personalLeaveEligibilityClass} employees is calculated on regular hours worked each pay period according to the following schedule.",
						"rule":"CompanyOffersPersonalLeave"
					},
					"personalLeaveSection2":{
						"content":"",
						"rule":"CompanyOffersPersonalLeave"
					},
					"personalLeaveSection3":{
						"content":"Our Personal Leave program applies to any absence from the job not otherwise covered by a specific time off benefit outlined in this addendum (e.g. holiday pay, jury duty, bereavement leave, etc.)",
						"rule":"CompanyOffersPersonalLeave"
					},
					"personalLeaveSection4":{
						"content":"There is {personalLeaveWaitingPeriodInMonths} waiting period before you may utilize Personal Leave",
						"rule":"CompanyOffersPersonalLeave"
					},
					"personalLeaveSection5":{
						"content":"No payment for unused Personal Leave is made upon termination unless required by law. Some states require payment of accrued but unused Personal Leave upon termination.",
						"rule":"CompanyOffersPersonalLeave"
					},
					"accruedBalanceInfo":{
						"content":"Your accrued balance of {paidTimeOffPlanList} time (current as of your most recently completed pay period) can be viewed under Myself > My Time.",
						"rule":"CompanyOffersPaidTimeOffPlan"
					},
					"addionalPaidLeaveHeading":{
						"content":"Additional Paid Leave:",
						"rule":{
							"Or":[
								"CompanyOffersJuryDutyPaidTimeOff",
								"CompanyOffersBereavementPaidTimeOff"
							]
						}
					},
					"additionalPaidLeaveWaitingPeriodInMonths":{
						"content":" a {additionalPaidLeaveWaitingPeriod} month(s)"
					},
					"addionalPaidLeave":{
						"content":" The following additional paid leave is available for {addionalLeaveEligibilityClass} employees.<br/>Waiting period before you may utilize the following additional paid leave:&nbsp;{additionalPaidLeaveWaitingPeriod}",
						"rule":{
							"Or":[
								"CompanyOffersJuryDutyPaidTimeOff",
								"CompanyOffersBereavementPaidTimeOff"
							]
						}
					},

					"juryDutyPaidTimeOffHeading":{
						"content":"Jury Duty:",
						"rule":"CompanyOffersJuryDutyPaidTimeOff"
					},
					"juryDutyPaidTimeOff":{
						"content":" Unless otherwise required by law, up to {numberOfJuryDutyPaidTimeOff} paid days off are available for missed work due to jury duty. If you receive a court summons, please notify your manager immediately. The court summons must be submitted to your manager if you miss work. (Note that under rules of the Federal Labor Standards Act, deductions may not be made to Exempt Employees' pay due to partial workweek absences caused by jury duty or attendance as a witness. Some states have additional regulations affecting payment for and service of jury duty. Contact your Human Resources representative for further information).",
						"rule":"CompanyOffersJuryDutyPaidTimeOff"
					},
					"bereavementPaidTimeOffHeading":{
						"content":"Bereavement Leave:",
						"rule":"CompanyOffersBereavementPaidTimeOff"
					},
					"bereavementPaidTimeOff":{
						"content":" {numberOfBereavementPaidTimeOff} paid time off days are available (per occurrence) if a death occurs in your immediate family. Please see your manager to arrange the appropriate time off. Immediate family includes spouse, child, parent, brother, sister, grandparent, mother-in-law, father-in-law, domestic partner, and domestic partners' mother or father.",
						"rule":"CompanyOffersBereavementPaidTimeOff"
					},
					"otherPaidLeaveOrTimeOff":{
						"content":"Other paid leave or time off may be available, depending on the applicable laws where you work."
					},
					"companyOffersNoPaidTimeOff":{
						"content":"TriNet does not manage paid time off policies for {companyName}.",
						"rule":"CompanyOffersNoPaidTimeOff"
					},
					"paidTimeOffInfoHeading":{
						"content":"Paid Time Off:"
					},
					"paidTimeOffInfo":{
						"content":"Your company's holiday schedule is updated on an annual basis. The holiday details below outline your paid holidays with applicable eligibility requirements:"
					},
					"error_SERVICE":{
						"content":"System is unable to process your request at this time. Please try again later."
					}
				}
			};
		};

		var moduleName = 'app.main.company.paid-timeoff-policies';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('gso',mockgsoService)
			.service('paidTimeOffRules',mockpaidTimeOffRulesService)
			.component('paidTimeOffPolicies', paidTimeOffPolicies);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope,$componentController,$q,_DS_,_gso_, _paidTimeOffRules_){
		$scope = $rootScope.$new();
		DS=_DS_;
		gso=_gso_;
		paidTimeOffRules=_paidTimeOffRules_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy('paidTimeOffService','paid-timeoff-policies').and.returnValue(deferred.promise);


		gso.getAppConfig = jasmine.createSpy().and.returnValue('');

		var locals = {
			$scope: $scope,
			DS:DS,
			gso:gso,
			paidTimeOffRules:paidTimeOffRules
		};

		ctrl = $componentController('paidTimeOffPolicies', locals ,null);
	}));

	it('should initilize the component', function() {
		ctrl.sickList.accruals = [{   }];
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(result);
		$scope.$digest();
	});
	it('should initilize the component and  exception handling', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var error = {data: {_error:"sdsa"}}
		deferred.reject(error);
		$scope.$digest();
	});

	it('numberToWord function test ', function () {
		ctrl.numberToWord('');
	});
	it('numberToWord function test ', function () {
		ctrl.numberToWord(1223);
	});

	it('numberToWord function test ', function () {
		ctrl.numberToWord(1);
	});

	it('numberToWord function test ', function () {
		ctrl.numberToWord(12);
	});

	it('should getPaidTimeOffData', function () {
		ctrl.VacationPTOList = [{
			length: 2,
			verdorId : "TNPTO"
		}];
		ctrl.sickList = [{
			length: 2,
			accruals : " "
		}];

		ctrl.personalList = [{
			length: 2,
		}];
		ctrl.benefitsPaidTimeOff =
			{
				numberOfCompanyHolidays: 2,
				additionPaidLeave : "2"
			};
					ctrl.getPaidTimeOffData()
	});
	it('should getPaidTimeOffData and else ', function () {
		ctrl.VacationPTOList = [{
			length: 2,
			verdorId : "eee"
		}];
		ctrl.sickList = [{
			length: 2,
			accruals : [{
				numberOfSickLeaves : 2
			}]
		}];

		ctrl.personalList = [{
			length: 2,
		}];
		ctrl.benefitsPaidTimeOff =
			{
				numberOfCompanyHolidays: 2,
				additionPaidLeave : "2"
			};
		ctrl.getPaidTimeOffData()
	});

	it('numberToWord function test ', function () {
		ctrl.numberToWord(100);
	});
	it('numberToWord function test ', function () {
		ctrl.numberToWord(95);
	});
	/*it('should get Paid Time Off Data', function () {

		ctrl.VacationPTOList=
			{
				length:"2"
			};
		ctrl.VacationPTOList[0]= {
			verdorId: "TNPTO"
		}
		ctrl.getPaidTimeOffData();
	});

	it('should get Paid Time Off Data and VacationPTOList condition', function () {

		ctrl.VacationPTOList=
			{
				length:2
			};
		ctrl.sickList=
			{
				length:2
			};

		ctrl.getPaidTimeOffData();
	});
	it('should get Paid Time Off Data personalList', function () {

            ctrl.personalList=
                {
                    length:2
                }
		ctrl.getPaidTimeOffData();
		var props = [
			'property1',
			'property2',
		];
		props.forEach(function(publishDate){
			expect(_.has(contentObject, publishDate)).toBeTruthy();
		})

	});*/

	/*it('should get content', function () {
		var tagId="545";
		ctrl.getContent(tagId);
	})*/
});
