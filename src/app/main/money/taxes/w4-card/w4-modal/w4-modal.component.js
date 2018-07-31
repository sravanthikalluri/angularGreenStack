
'use strict';

require('./w4-modal.component.scss');

module.exports = {
	template: require('./w4-modal.component.html'),
	controller: ['taxWithholdingForm', '$uibModal', 'moment','taxWithholdingDisabledFields','$filter','constants','$rootScope','$timeout',W4ModalController],
	bindings: {
		modalInstance: '<',
		resolve: '<'
	}
};

/* @ngInject */
function W4ModalController(taxWithholdingForm, $uibModal, moment,taxWithholdingDisabledFields,$filter,constants,$rootScope,$timeout) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.hideSP = true;
		ctrl.w4LegalConfirmation = 'N';
		ctrl.data = ctrl.resolve.data;
		ctrl.effectiveDate = moment(ctrl.data.effectiveDate, "MM/DD/YYYY").format('MM/DD/YYYY');
		ctrl.maxDate = moment().add(60,'days').format('MM/DD/YYYY');
		ctrl.minDate = moment().format('MM/DD/YYYY');
		ctrl.selectedTax = [];
		ctrl.exemptCaches = {
			'Federal tax' : [],
			'State tax'   : [],
			'Local tax'   : []
		};

		if (ctrl.data.substantialText) {
			ctrl.confirmationMessage = ctrl.data.affirmationText  + '<br/> ' + ctrl.data.substantialText.replace('substantial presence test','<a class="substantial hand" ng-click="$ctrl.openSPTest();">substantial presence test</a>');
		}else{
			ctrl.confirmationMessage = ctrl.data.affirmationText;
		}

		ctrl.lastUpdated = ctrl.data.effectiveDate;
		ctrl.selectedTab = ctrl.data.uniqueTaxes.length > 0 ? ctrl.data.uniqueTaxes[0] : angular.noop();
		ctrl.selectedTax = ctrl.selectedTab  ? ctrl.getSelectedTabTaxes() : [];
	};

	ctrl.getSelectedTabTaxes = function(){
		return ctrl.data.items.filter(function(d) { return d.data.type === ctrl.selectedTab.type; });
	};
	// Disable Marital Status field and set the selected Marital Status to 'Single'
	ctrl.handleMarriedFileSingle = function(item) {

		var stateTax = ctrl.data.items.filter(function(d) { return d.data.type === 'State tax' })[0];
		var isNebraska = stateTax && stateTax.data.payDedCode === 'NE';
		var isFedTax = item.data.type === 'Federal tax';

		if(isFedTax){
			item.selected = item.dropdown.filter(function(d) { return d.key === 'S' })[0];
			item.data.maritalStatus = item.selected.key;

			//Handling NE state Marital status on federal married file change
			if (isNebraska) {
				stateTax.data.maritalStatus = item.data.maritalStatus;
				stateTax.selected = stateTax.dropdown.filter(function(d) { return d.key === item.data.maritalStatus; })[0];
			}
		}else{
			if(item.data.exempt === 'N' && item.data.maritalStatus === ''){
				item.selected = item.dropdown[0];
				item.data.maritalStatus =  item.selected.key
			}else{
				item.selected = undefined;
				item.data.maritalStatus = '';
			}

		}

	};

	ctrl.returnDate = function() {
		return new Date(ctrl.effectiveDate)
	}

	ctrl.handleNebraskaState = function(item,allowancesRequested){
		var stateTax = ctrl.data.items.filter(function(d) { return d.data.type === 'State tax' })[0];
		var isNebraska = stateTax && stateTax.data.payDedCode === 'NE';
		var isFedTax = item.data.type === 'Federal tax';

		if (isFedTax && isNebraska) {
			stateTax.data.maritalStatus = item.selected.key;;
			stateTax.selected = item.selected;
			stateTax.data.allowancesRequested = allowancesRequested;
		}

	}
	// Saves data when exempt === 'Y' and reverts changes when exempt === 'N'
	ctrl.handleExempt = function(item, value) {
		var cache = ctrl.exemptCaches[item.data.type];
		var idx;

		if (value === 'Y') {
			cache.push(angular.copy(item));

			item.data.allowancesRequested = 0;
			item.data.addlAmount = 0;
			ctrl.handleMarriedFileSingle(item);
			ctrl.handleNebraskaState(item,0);

		} else {
			idx = ctrl.data.items.indexOf(item);

			if (idx >= 0 && cache.length > 0) {
				var previousData = ctrl.data.items[idx];
				angular.extend(previousData, cache.pop());
				ctrl.handleNebraskaState(previousData,previousData.data.allowancesRequested);
			}else if(idx >= 0 ){
				var previousData = ctrl.data.items[idx];
				ctrl.handleMarriedFileSingle(previousData);

			}
		}
	};

	ctrl.handleMaritalStatus = function(item, value) {
		var stateTax = ctrl.data.items.filter(function(d) { return d.data.type === 'State tax' })[0];
		var isNebraska = stateTax && stateTax.data.payDedCode === 'NE';
		var isFedTax = item.data.type === 'Federal tax';
		var isMarried = item.data.type === 'State tax' &&  value === 'M';
		var isGeorgia  = item.data.payDedCode === 'GA' ;

		if (isFedTax && isNebraska) {
			stateTax.data.maritalStatus = value;
			stateTax.selected = stateTax.dropdown.filter(function(d) { return d.key === value; })[0];
		}
		if (isGeorgia && !isMarried) {
			item.data.maritalStatusAllowance = [0,1];
			item.data.maritalAllowance = item.data.maritalStatusAllowance[0];
		}else if(isGeorgia && isMarried){
			item.data.maritalStatusAllowance = [0,1,2];
			item.data.maritalAllowance = item.data.maritalStatusAllowance[0];
		}
	};

	ctrl.handleAllowancesRequested = function(item, value) {
		var stateTax = ctrl.data.items.filter(function(d) { return d.data.type === 'State tax'; })[0];
		var isNebraska = stateTax && stateTax.data.payDedCode === 'NE';
		var isFedTax = item.data.type === 'Federal tax';
		var stateCode = item.data.payDedCode;

		if (isFedTax && isNebraska) {
			stateTax.data.allowancesRequested = value;
		}


		if(taxWithholdingDisabledFields.statesToUpdateLocalTax[stateCode]){
			if(ctrl.data.otherItems){
				ctrl.data.otherItems.map(function(item){
					item.allowancesRequested = value;
				});
			}

			ctrl.warnState(stateCode);
		}
		if(stateTax.data.payDedCode === "MN" ){
			stateTax.data.allowancesRequested = value;
		}
	};

	ctrl.warnState = function (stateCode) {
		ctrl.errorAlert = {
			_statusCode: constants.warning,
			_statusMessage: $filter('translate')('money.tax_With_Holding.warnStateMsg.'+stateCode)
		};
		setTimeout(function () {
			angular.element('#alertMessage button').focus();
		},1000)

	};


	ctrl.update = function(item, prop, value) {
		if (prop === 'marriedFileSingle') {
			ctrl.handleMarriedFileSingle(item);
		}

		if (prop === 'exempt') {
			ctrl.handleExempt(item, value);
		}

		if (prop === 'maritalStatus') {
			ctrl.handleMaritalStatus(item, value);
		}

		if (prop === 'allowancesRequested') {
			ctrl.handleAllowancesRequested(item, value)
		}

		item.data[prop] = value;
	};

	ctrl.cancel = function() {
		ctrl.modalInstance.dismiss();
	};

	ctrl.nextStep = function(index){
		var validFederal = ctrl.data.items.filter(function(item){
			return item.data.type === 'Federal tax' && item.data.addlAmount !== undefined && item.data.addlAmount !== null && item.data.allowancesRequested !== undefined && item.data.allowancesRequested !== null;
		})[0];
		if(validFederal){
			ctrl.data.uniqueTaxes.map(function(item){
				if(item.id <= index){
					item.class='completed-state';
				}else if(item.id === (index + 1) ){
					item.class='active-state';
				}else{
					item.class='pending-state';
				}
			});
			ctrl.selectedTab = ctrl.data.uniqueTaxes.length > 0 ? ctrl.data.uniqueTaxes[index + 1] : angular.noop();
			ctrl.selectedTax = ctrl.selectedTab  ? ctrl.getSelectedTabTaxes() : [];
		}
		angular.element('button#taxEditClose').focus();
		angular.element('#statusUpdate[aria-live="polite"]').empty();
	};

	ctrl.previousStep = function(index){
		ctrl.data.uniqueTaxes.map(function(item){
			if(item.id >= index ){
				item.class='pending-state';
			}else if(item.id === (index -1)){
				item.class='active-state';
			}else{
				item.class='completed-state';
			}
		});
		ctrl.selectedTab = ctrl.data.uniqueTaxes.length > 0 ? ctrl.data.uniqueTaxes[index - 1] : angular.noop();
		ctrl.selectedTax = ctrl.selectedTab  ? ctrl.getSelectedTabTaxes() : [];
		angular.element('#statusUpdate[aria-live="polite"]').empty();

	};


	function handleMSStateValidation(){
		var msState = ctrl.data.items.filter(function(item){
			return item.data.type === 'State tax' && item.data.payDedCode === 'MS';
		})[0];

		if(msState){
			msState.data.allowancesRequested = msState.data.tempAllowancesRequested == null ? 0 : msState.data.tempAllowancesRequested;
		}
	}

	function handleGeorgiaStateValidation(){
		var isValid = true;
		var georgiaState = ctrl.data.items.filter(function(item){
			return item.data.type === 'State tax' && item.data.payDedCode === 'GA';
		})[0];

		if(georgiaState){
			var marStat =  georgiaState.data.maritalStatus;
			var marStatMaxAllow = ((marStat === 'M') ? 2 : 1);
			if(georgiaState.data.maritalAllowance > marStatMaxAllow) {
				ctrl.errorAlert = {
					_statusCode: constants.error,
					_statusMessage: 'Marital Status Allowance may only be a positive numeric value between 0 and ' + marStatMaxAllow + '.'
				};
				setTimeout(function () {
					angular.element('#alertMessage button').focus();
				},1000)
				isValid = false;
			}
			else {
				var stateTaxes = ctrl.data.items.filter(function(d) { return d.data.type === 'State tax' });
                if(stateTaxes.length > 1) {
					var otherState = stateTaxes.filter(function (item) {
						return item.data.payDedCode !== 'GA';
					})[0];

					otherState.data.addlExempts = otherState.data.dependentAllowances !== "" ? parseInt(otherState.data.dependentAllowances) : null ;
					otherState.data.allowancesRequested =  otherState.data.maritalAllowance;
				}
			}
		}

      return isValid;
	}
	function handleW4LegalConfirmation(){
		var isValid = true;
		if(ctrl.w4LegalConfirmation !== 'Y'){
			ctrl.errorAlert = {
				_statusCode: constants.error,
				_statusMessage: 'To "Update" the taxes information, you must check the "I Agree" button '
			};
			setTimeout(function () {
				angular.element('#alertMessage button').focus();
			},1000);
			isValid = false;
		}
		return isValid;
	}
	ctrl.save = function(form) {
		if (!form.$valid) {
			return;
		}

       if(!handleW4LegalConfirmation()){
		   return;
	   }

		var isValid = handleGeorgiaStateValidation();

		if(!isValid){
			return;
		}

		handleMSStateValidation();
		ctrl.errorAlert = null;
		ctrl.disableSaveButton = true;
		ctrl.data.effectiveDate = moment(new Date(ctrl.effectiveDate)).format('YYYY-MM-DD');
         angular.forEach(ctrl.data.items,function(item){
           item.data.addlAmount = item.data.addlAmount?item.data.addlAmount:null;
           item.data.allowancesRequested = item.data.allowancesRequested?item.data.allowancesRequested:null;
		 });
		taxWithholdingForm
			.save(ctrl.data)
			.then(function(response) {
				$rootScope.$broadcast('setMessage', response);
				ctrl.disableSaveButton = false;
				ctrl.modalInstance.close();
				$timeout(function(){
					angular.element(document.querySelectorAll('#alertMessage button')).focus();
				});
			}).catch(function(err) { ctrl.disableSaveButton = false; console.log(err); });

	};

	ctrl.hideSPTest = function () {
		ctrl.hideSP = !ctrl.hideSP;
	};

	ctrl.openSPTest = function () {
		ctrl.hideSP = false;
	};

	ctrl.prompt = function() {
		var modal = $uibModal.open({
			template  : '<w4-legal-modal></w4-legal-modal>',
			component : 'w4LegalModal',
			resolve   : {
				data: function() { return angular.merge({}, ctrl.data); }
			}
		});

		return modal.result;
	};
}
