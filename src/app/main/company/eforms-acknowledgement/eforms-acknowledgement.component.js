'use strict';

require('./eforms-acknowledgement.component.scss');

module.exports = {
	templateUrl: 'app/main/company/eforms-acknowledgement/eforms-acknowledgement.component.html',
	controller: ['DS','gso', '$sce', '$filter', 'stringUtil', 'GetAcrobatInfoService', EformsAcknowledgementController],
	bindings: {
		data: '<',
		errorMessage: '<'
	}
};

function EformsAcknowledgementController(DS, gso, $sce, $filter, stringUtil, GetAcrobatInfoService) {
	var ctrl = this;

	ctrl.$onInit = function(){

		var handbookUrl = "";
		DS.find('policiesService','/'+gso.getAppConfig().countryCode+'/'+gso.getAppConfig().stateCode+'/policies?pfClient='+gso.getAppConfig().pfClient+'&type=HANDBOOK').then(function(result){
			handbookUrl = result.policiesDetails.url;
			ctrl.secondHandbookUrl = result.policiesDetails.secondaryUrl;
			function eformDataObject(e,secondHandbookUrl){
				return {
					formId : e.formId,
					formStatus : e.formStatus === 'Accepted' ? 'Complete' : 'Incomplete',
					displayStatus : e.formStatus === 'Accepted' ? ctrl.translateText('statusComplete') : ctrl.translateText('statusIncomplete'),
					formDesc : (secondHandbookUrl) ? 'Employee Handbook French Version' : e.formDesc,
					formPath : e.formId === '1015' ? (!secondHandbookUrl ? $sce.trustAsResourceUrl('/api-content' + handbookUrl) :$sce.trustAsResourceUrl('/api-content' + secondHandbookUrl)) : ctrl.getPolicyUrl(e.formPath, e.formId),
					confirmationMessage : (((e.formId === '1015' || (e.formDesc.indexOf('Handbook') !== -1)) && gso.getAppConfig().companyId === '001') ? ctrl.translateText('handbookConfirmationUsa') : (((e.formId === '1015' || (e.formDesc.indexOf('Handbook') !== -1)) && gso.getAppConfig().companyId === '002') ? ctrl.translateText('handbookConfirmationCanada') : (e.formId === '1015' || (e.formDesc.indexOf('Handbook') !== -1) ? ctrl.translateText('handbookConfirmation') : ctrl.translateText('generalConfirmation')))),
					acknowledgementMessage : ((e.formId === '1015' || (e.formDesc.indexOf('Handbook') !== -1)) ? ctrl.translateText('handbookAcknowledgement') : ctrl.translateText('generalAcknowledgement')),
					timeStamp : e.timeStamp,
					viewHide : 'View',
					isOpen : false
				}
			}
			DS.find('eforms-acknowledgement','').then(function(results) {
				ctrl.eformsData = [];
				results.eforms_data.map(function(e) {
					if( e.formId  === '1015' && ctrl.secondHandbookUrl){
						ctrl.eformsData.push(eformDataObject(e,ctrl.secondHandbookUrl)) ;
					}
					return ctrl.eformsData.push(eformDataObject(e));
				});
			});

		}).catch(function(error){
			ctrl.errorMessage = error.data._error.message;
		});

		if(GetAcrobatInfoService.getBrowserName() === 'ie' && !GetAcrobatInfoService.isAcrobatInstalled()){
				ctrl.showBrowserMessage = true;
		}else{
				ctrl.showBrowserMessage = false;
		}

	};
	ctrl.toggleFormView = function (index){
		ctrl.eformsData[index].isOpen = !ctrl.eformsData[index].isOpen;
		ctrl.eformsData[index].viewHide = ctrl.eformsData[index].isOpen === false ? ctrl.translateText('toggleLinkView') : ctrl.translateText('toggleLinkHide');
	};

	ctrl.getPolicyUrl = function (path, formId) {
		var formpathDynamicValue = "";
		if(formId === '1522'){
			formpathDynamicValue = "/api-content/v1/" + path;
		}else{
			formpathDynamicValue = "/api-content/v1/CustomFolders/Objects/Company/"+ gso.getAppConfig().companyId + "/ADDL_POLC/policy/pdf_doc/" + path;
		}
		return $sce.trustAsResourceUrl(formpathDynamicValue);
	};

	ctrl.translateText = function (translationProperty){
		return $filter('translate')('eformsAcknowledgement.' + translationProperty);
	};

	ctrl.formatConfirmationMessage = function(translationProperty, textToAdd, formId) {
		var translationText = $filter('translate')('eformsAcknowledgement.' + translationProperty);
		var triNetText = "";
		if (formId === "1015"){
			triNetText = "TriNet";
		}
		return stringUtil.format(translationText, { appendTriNet: triNetText, formName :textToAdd });
	};

	ctrl.acknowledge = function(index){

		var data = {
			ACKNOWLEDGED: "Accepted",
			NOT_ACKNOWLEDGED: "Not completed",
			formId: ctrl.eformsData[index].formId,
			formStatus: "Accepted"
		};
		DS.create('create-eforms-acknowledgement', data).then(function (results) {

			ctrl.eformsData[index].formStatus = 'Complete';
			ctrl.eformsData[index].displayStatus = ctrl.translateText('statusComplete');

			var success = {
				_statusCode: '200',
				_statusMessage: ctrl.eformsData[index].formId === '1015' ? ctrl.translateText('handbookAcknowledgement') : ctrl.translateText('generalAcknowledgement')
			};

			ctrl.data = success;
		}).then(function(){
		}).catch(function(error) {
			ctrl.data=error.data;
		});
	};
}
