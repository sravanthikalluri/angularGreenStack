'use strict';


require('./forms-policies-acc.component.scss');


module.exports = {
	templateUrl: 'app/main/company/forms-and-policies/forms-policies-accordion/forms-policies-acc.component.html',
	controller: ['DS','$window','gso', '$state',formsAndPoliciesController]
};

/* @ngInject */
function formsAndPoliciesController(DS,$window,gso, $state) {
	var ctrl = this;
	ctrl.showAll = true;
	ctrl.showPage = '';
	ctrl.showItem = false;
	ctrl.countryCode = gso.getAppConfig().countryCode;

	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		DS.find('formsService','companyForms?pfClient='+gso.getAppConfig().pfClient+'&countryCode='+gso.getAppConfig().countryCode).then(function (result) {
			ctrl.formsObj = result.formsDetails.forms;
			if(result.formsDetails.activeStatus){
				DS.find('policiesService','/'+gso.getAppConfig().countryCode+'/'+gso.getAppConfig().stateCode+'/policies?pfClient='+gso.getAppConfig().pfClient).then(function(result){
				ctrl.corporateBrand = result.policiesDetails.corporateBrand;
				ctrl.policiesObj = result.policiesDetails.forms
			}).catch(function(error){
				ctrl.errorMessage = error.data._error.message;
			});
		}
			ctrl.showSpinner = false;
		}).catch(function(error){
			ctrl.errorMessage = error.data._error.message;
		});



    };
	ctrl.openAMBPDF = function(url){
		var postVars = {
				BPI: 'JAVABEAN_WEBSERVICE',
				groupName: 'HR Services',
				userName: 'achern',
				role: 'Ambrose system admin',
				compositionName:'ORIENTATION GUIDE BY WSE',
				successMsg:'Y',
				cancelMsg:'Y',
				xmlFileName:'d:\\\Napersoft_R60\\Temp\\XML_Dump\\'+ gso.getAppConfig().userId +'-New_Hire_Orientation_link.xml',
				employeeNbr:gso.getAppConfig().userId,
				templateName:''
			};

			/*angular.element('#payFrame').prepend('<form action="'+url+'" method="post" target="'+"_blank"+'" id="postToIframe" ></form>');
			angular.forEach(postVars,function(n,v){
				angular.element('#postToIframe').append('<input type="hidden" name="'+v+'" value="'+n+'" />');
			});
			angular.element('#postToIframe').submit().remove();*/

		var form = document.createElement("form");
		form.setAttribute("method", "post");
		form.setAttribute("action", url);
		form.setAttribute("target","_blank");
		for (var i in postVars) {
			if (postVars.hasOwnProperty(i)) {
				var input = document.createElement('input');
				input.type = 'hidden';
				input.name = i;
				input.value = postVars[i];
				form.appendChild(input);
			}
		}
		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
	};
   ctrl.openPdf = function(url){
	   if(ctrl.corporateBrand === 'AMBROSE' && url.startsWith('/trinetGateway/')){
		   ctrl.openAMBPDF(url);
	   }else if(url.startsWith('https')) {
		   $window.open(url, '_blank');
	   }else {
		   var urlLink = "/api-content" + url;
		   $window.open(urlLink, '_blank')
	   }
   };

	ctrl.redirectTo= function(data,arg){
		if(!data.urlType){
			data === "Benefits Guidebook" ? $state.go('app.main.company.benefitsGuidebook',{data:"Benefits Guidebook"}) : $state.go('app.main.company.termsAndConditions',{data : ctrl.policiesObj });

		}else{
			ctrl.stateSpecificData = data;
			ctrl.stateSpecificData['formState'] = (arg === 'workers') ? 'Workers Compensation Forms and Information' : 'State Specific Forms';
			$state.go('app.main.company.stateSpecific', {data: ctrl.stateSpecificData});
		}
	};

	ctrl.timeOffUrl = function(item){

		//This is a temporary fix. we should not be using redirect as seeker is going away.
		//should remove this code once we fix the API for this. Please refer to GS-11483 for more details
		var personId = $window.sessionStorage.getItem('personId');
		// userid in seeker = personid
		// url parameters must changes with legacy
		var msvConfig = DS.get('microservices-config','0');
		var gatewayUrl = "";
		if ( msvConfig != null && msvConfig.hrpUrl != null ) {
			// company must be current company
			gatewayUrl = msvConfig.hrpUrl + "/trinetGateway/services/v1.0/redirect/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().personId + "?path=";
		}
		var redirectUrl = gatewayUrl + escape( '/' + item.ptolink.url+"?USERID="+personId+"&USER_COMPANY="+gso.getAppConfig().companyId+"&USER_POSITION="+gso.getAppConfig().positionId);

		return redirectUrl;

	};

	ctrl.goToCompanyAcknowledgements = function() {
    	$state.go('app.main.company.acknowledgements');
    };
    ctrl.redirect =function(){
    	$state.go('app.main.company.paidTimeOff');
    };
}
