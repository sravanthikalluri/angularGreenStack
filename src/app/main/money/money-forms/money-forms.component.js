'use strict';


require('./money-forms.component.scss');


module.exports = {
	templateUrl: 'app/main/money/money-forms/money-forms.component.html',
	controller: ['DS','$window','gso','$stateParams','$state',moneyFormsController]
};

/* @ngInject */
function moneyFormsController(DS,$window,gso,$stateParams,$state) {
	var ctrl = this;
	//dataArrayList =[];
	ctrl.showAll = true;
	ctrl.countryCode = gso.getAppConfig().countryCode;
	ctrl.showPage = '';
	ctrl.showItem = false;
	ctrl.displayState = false;
	ctrl.taxeForms = $stateParams.data;
	ctrl.showState= false;
	ctrl.itemShow = null;
	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		ctrl.formsObj = [];
		DS.find('formsService','/forms?countryCode=' + ctrl.countryCode +'&module=money').then(function (result) {
			ctrl.formsObj = ctrl.formsObj.concat(result.formsDetails.forms);
		}).catch(function(error){
			ctrl.errorMessage = error.data._error.message;
		});

		if( ctrl.countryCode === 'CA'){
			DS.find('formsService','/forms?countryCode=' + ctrl.countryCode +'&formType=personalTaxForms').then(function (result) {
			ctrl.formsObj = ctrl.formsObj.concat(result.formsDetails.employeeForm);
			}).catch(function(error){
				ctrl.errorMessage = error.data._error.message;
			});
			DS.find('formsService','/forms?countryCode=' + ctrl.countryCode +'&formType=savingsPlanForms').then(function (result) {
			ctrl.formsObj = ctrl.formsObj.concat(result.formsDetails.employeeForm);
			}).catch(function(error){
				ctrl.errorMessage = error.data._error.message;
			});
		}

		DS.find('moneyPolicies','/policiesprocedures?pfClient='+gso.getAppConfig().pfClient).then(function(result){
			if(ctrl.taxeForms !== 'taxes'){
				ctrl.formsObj = ctrl.formsObj.concat(result.PoliciesDetails.forms);
			}
		}).catch(function(error){
			ctrl.errorMessage = error.data._error.message;
		});

    };

   ctrl.openPdf = function(url){
   		var urlLink = "/api-content"+url;
   		$window.open(urlLink,'_blank')
   };

	ctrl.redirectTo= function(data){
		if(!data.urlType){
			ctrl.showPage = data;
			ctrl.showItem = true;
		}else{
			ctrl.stateSpecificData = data;
			ctrl.stateSpecificData.specificForm = 'moneyStateSpecificForms';
			$state.go('app.main.money.stateSpecific', {data: ctrl.stateSpecificData});
			ctrl.showPage = 'State Specific Forms';
			ctrl.showItem = true;
		}
	};
	ctrl.toggle = function(index,value){
		ctrl.showState = !ctrl.showState;
		if(ctrl.itemShow ===  null){
			ctrl.itemShow = value;
		}else if(ctrl.itemShow === value){
			ctrl.itemShow = null;
		}else{
			ctrl.itemShow = value;
		}


	}
	ctrl.displayAllState = function(item){
		if(!ctrl.displayState){
			DS.find('moneyPolicies','/stateTaxForms').then(function(result){
				ctrl.displayAllStates = result.PoliciesDetails.forms[0];
				ctrl.dispSpinner = false;
			}).catch(function(error){
				ctrl.errorMessage = error.data._error.message;
			});
		}
		ctrl.displayState = !ctrl.displayState;
	}

	ctrl.showDownloadText = function(state){
		if(state === 'Indiana' || state === 'New Mexico'){
			return true;
		}else{
			return false;
		}
	};

	ctrl.checkDocUrl = function(url){
		if(url){
			return (url.split(".")[1] ==="docx") ? true : false;
		}
	}

}
