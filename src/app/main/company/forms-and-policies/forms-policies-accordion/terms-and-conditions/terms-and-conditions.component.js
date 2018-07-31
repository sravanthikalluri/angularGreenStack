'use strict';

require('./terms-and-conditions.component.scss');

module.exports = {
	template: require('./terms-and-conditions.component.html'),
	controller: ['DS', '$window', '$stateParams', '$http','$sce', termsAndConditionsController]
};

function termsAndConditionsController(DS, $window,$stateParams, $http, $sce) {
	var ctrl = this;
	ctrl.innerAccordion = true;
	ctrl.employeeHandbook = $stateParams.data;
	ctrl.TCATitleInfo = '';
	ctrl.TCAData = [];
	ctrl.termConditionResponse = {sections: [], title: "", heading: ""};


	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		DS.find("policiesService","/eula").then(function (response) {
			ctrl.clientActWaiver = response.clientActWaiver;
			var eula = response, apiContent ="/api-content/v1";
			var termCondition = apiContent+ eula.policiesDetails.path + "/TermsConditions" + eula.policiesDetails.desc;
			var acknowledgement = apiContent+eula.policiesDetails.path + "/Acknowledgement" + eula.policiesDetails.desc;
			ctrl.effectiveDate = eula.policiesDetails.eula.effectiveDate;
			ctrl.isUSKone =  eula.policiesDetails.desc.indexOf("_US_K1") > -1 ? true : false;
			$http.get(termCondition).then(
				function(response){
					ctrl.termConditionResponse = ctrl.isUSKone ? response.data : ctrl.cleanTCA(response.data);
					$http.get(acknowledgement).then(
						function(response){
							ctrl.isUSKone ? ctrl.ackResponse =  response.data : ctrl.cleanAck(response.data);
						}
					);
				}
			);
		});
	};

	ctrl.cleanAck = function(data){
		var cleanData = data.replace(/[\t\n]/g,""),
			matches = cleanData.match(/\<p\>.*\<\/p\>/g); // gets paragraphs
		var ackHeading = cleanData.match(/\<h3\>.*<\/h3\>/g); // gets text from head tag
		var title = ackHeading[0].replace(/\<h3\>/g, "").replace(/\<\/h3\>/g, "");
		ctrl.ackData="";
		matches.map(function(content){
			ctrl.ackData = ctrl.ackData.concat(content);
		});
		ctrl.termConditionResponse.sections.push({title: title.replace(/[0-9_.]/g, "").trim(), info: ctrl.ackData});
	};
	ctrl.cleanTCA = function(data) {
		var cleanedData = data.replace(/[\t\n\r]/g, ""),
			tcaHeading = /(\<div id="tacHeader".*?\<p\>)/g,// Gets headings for TCA
			titlePattern = /(\<p id="tacInstructions".*?\<\/p\>)|\<b\>.*?\<\/b\>(?=\<\/td>)/g, // Gets title and sub titles
			titleMatches = cleanedData.match(titlePattern);

		tcaHeading = cleanedData.match(tcaHeading);
		tcaHeading = tcaHeading[0].replace(/\/Terms_Conditions/ig, 'api-content/v1$&');
		cleanedData = cleanedData.replace(/\<!\-.*?\<h3\>/g, ""); //replaces everything to the first h3 with ""

		var pattern1 = /<a name.*?<\/h3>|<p>.*?<h3>|<p>.*?<\/div>/g,
			matches = cleanedData.match(pattern1);
		titleMatches.map(function(titleMatched){
			ctrl.TCATitleInfo = ctrl.TCATitleInfo + titleMatched;
		});
		for (var i = 0; i < matches.length; i += 2) {
			var infoData = matches[i + 1].replace(/\<\/{0,1}blo.*?\>|\<h3\>/g, ""); //replacing blockquotes and h3 tags
			infoData = infoData.replace(/\<input.*?\>/g, "<input class=\"tca-checkbox\" type=\"checkbox\" disabled ng-model=\"$ctrl.clientActWaiver\" aria-label=\"Class Action Waiver\" ng-true-value=\"'Y'\" ng-false-value=\"'N'\">"); // replaces checkbox with a usable checkbox for tca component
			infoData = infoData.replace(/\<a name*?\><\/a>/g, ""); // replacing attribute links with nothing
			infoData = $sce.trustAsHtml(infoData);
			var titleData = matches[i].replace(/\&quot;/g, "\""); //replacing &quotes with \"
			var dataObject = {
				title: titleData.replace(/\<a.*?\d\.\s|\<\/h3\>/g, ""), //
				info: infoData
			};
			ctrl.TCAData.push(dataObject);
		}
		ctrl.showSpinner = false;
		return {sections: ctrl.TCAData, title: ctrl.TCATitleInfo, heading: tcaHeading};
	};

	ctrl.empHandbookStatus = function () {
			ctrl.handbookPdf;
			ctrl.employeeHandbook.map(function(items){
				if(items.title ==="TriNet Policies") {
					items.pdfs.map(function (value) {
						return value.label === 'Employee Handbook' ? ctrl.handbookPdf = value.url : null;
					});
				}
			});
		$window.open("/api-content" + ctrl.handbookPdf, '_blank');
	};

	ctrl.setAccordion = function(index){
		ctrl.currentIndex = index;
	};
	ctrl.closeAll = function(accordion){
		 accordion.map(function(item){
			item.isOpen = false;
			return item;
		});
	};

}
