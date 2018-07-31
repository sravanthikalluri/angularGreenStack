'use strict';

require('./w4-modal-table.component.scss');

module.exports = {
	template: require('./w4-modal-table.component.html'),
	controller: ['$element', 'taxWithholdingDisabledFields',W4ModalTableController],
	bindings: {
		formName: '<',
		items: '<',
		onUpdate: '&'
	}
};

/* @ngInject */
function W4ModalTableController($element, taxWithholdingDisabledFields) {
	var ctrl = this;
	ctrl.dependentAllowancesMaxValue = 2;
	ctrl.$onInit = function() {
		ctrl.items[0].data.exempt = (ctrl.items[0].data.exempt === 'Nonresident Alien' ? 'N' : ctrl.items[0].data.exempt);
		ctrl.fields = taxWithholdingDisabledFields;

		ctrl.keys = {
			maritalStatus     		: 'maritalStatus',
			allowances        		: 'allowancesRequested',
			addlAmount        		: 'addlAmount',
			marriedFileSingle 		: 'marriedFileSingle',
			exempt            		: 'exempt',
			percentageGross	  		: 'percentageGross',
			dependentAllowances	  	: 'dependentAllowances',
			maritalAllowance	    : 'maritalAllowance',
			additionalAllowances	: 'additionalAllowances',
			annualExemptionAmount	: 'annualExemptionAmount',

			// Needs to match the 'type' property in the data
			federalTax              : 'Federal tax',
			stateTax                : 'State tax',
			localTax                : 'Local tax'
		};
	};

	ctrl.update = function(item, prop, value) {
		var marriedFileSingleOld = item.data.marriedFileSingle;
		ctrl.onUpdate({ item: item, prop: prop, value: value });
		var element = angular.element('#statusUpdate[aria-live="polite"]');
		element.empty();
		if(prop == "exempt"){
			if(value === "Y") {
				if(item.data.marriedFileSingle === true){
					element.append('Disabled and Updated values '
									+ 'Allowance '+ item.data.allowancesRequested
									+ 'Additional Amount '+ item.data.addlAmount);
				}else if(item.data.marriedFileSingle == null || item.data.marriedFileSingle === false){
					element.append('Disabled and Updated values Marital Status '
									+ (item.selected? item.selected.value: 'Select a Marital Status')
									+ 'Allowance '+ item.data.allowancesRequested
									+ 'Additional Amount '+ item.data.addlAmount);
				}
			}else{
				if(item.data.marriedFileSingle === true){
					element.append('Enabled and Updated values '
									+ 'Allowance '+ item.data.allowancesRequested
									+ 'Additional Amount '+ item.data.addlAmount);
				}else if(marriedFileSingleOld === true && item.data.marriedFileSingle === false){
					element.append('Enabled and Updated values Marital Status '
									+ (item.selected? item.selected.value: 'Select a Marital Status')
									+ 'Married Filling Single ' + ( (item.data.marriedFileSingle === false)? 'No': 'Yes')
									+ 'Allowance '+ item.data.allowancesRequested
									+ 'Additional Amount '+ item.data.addlAmount);
				}else{
					element.append('Enabled and Updated values Marital Status '
									+ (item.selected? item.selected.value: 'Select a Marital Status')
									+ 'Allowance '+ item.data.allowancesRequested
									+ 'Additional Amount '+ item.data.addlAmount);
				}
			}
		}else if(prop == "marriedFileSingle"){
			if(item.data.exempt === 'N'){
				if(value === true){
					element.append('Disabled and Updated Value Marital Status is ' + item.selected.value);
				}else{
					element.append('Enabled and Updated Value Marital Status is ' + item.selected.value);
				}
			}
		}
	};

	ctrl.isMaritalStatusDisabled = function(item) {
		if (!item.data) {
			return true;
		}

		var type = item.data.type;
		var code = item.data.payDedCode;

		return type === ctrl.keys.stateTax && ctrl.fields.maritalStatus[code];
	};

	ctrl.isAllowancesDisabled = function(item) {
		if (!item.data) {
			return true;
		}

		var type = item.data.type;
		var code = item.data.payDedCode;

		// type's value '<code> State tax'
		return type.indexOf(ctrl.keys.stateTax) > -1 && ctrl.fields.allowances[code] || item.data.payDedCode === "MN";
	};

	ctrl.isExemptDisabled = function(item) {
		if (!item.data) {
			return true;
		}

		var type = item.data.type;
		var code = item.data.payDedCode;

		// type's value '<code> State tax'
		return type.indexOf(ctrl.keys.stateTax) > -1 && (ctrl.fields.exempt[code] || ctrl.fields.stateTax[code]);
	};
	ctrl.displayText = function(item){
		item.data.specialIndicator==="A"?ctrl.Resident_Alien ="Nonresident Alien":ctrl.Resident_Alien='';
		if(item.data.payDedCode !="AL"){
			return  ctrl.fields.exempt[item.data.payDedCode];
		}

	};
	ctrl.isDisabled = function(item,fieldName) {
		if (!item.data) {
			return true;
		}

		var type = item.data.type;
		var code = item.data.payDedCode;
		var isExempt = item.data.exempt === 'Y';

		var isHavingGA = ctrl.items.filter(function(d) { return d.data.payDedCode === 'GA'; });

		// type's value '<code> State tax'
		if(isHavingGA.length > 0 && ctrl.items.length > 1 && item.data.type.indexOf(ctrl.keys.stateTax) > -1 && ctrl.disableMaritalStatusAllowance(code) && fieldName === 'dependentAllowances') {
			return false;
		}
		else{
			return type.indexOf(ctrl.keys.stateTax) > -1 && ctrl.fields.stateTax[code] ||
				type === ctrl.keys.localTax && ctrl.fields.localTax[code] || isExempt;
		}

	};

	ctrl.isRequired = function(item){
		if (!item.data) {
			return true;
		}

		var type = item.data.type;
		var code = item.data.payDedCode;
		var isExempt = item.data.exempt === 'Y';

		return type.indexOf(ctrl.keys.stateTax) > -1 && ctrl.fields.stateTax[code] ||
			type === ctrl.keys.localTax && ctrl.fields.localTax[code] || isExempt;
	}



	ctrl.isAllowancesVisible = function(item) {
		if (item.data.payDedCode == 'MS' || item.data.payDedCode == 'GA') {
			return false;
		}
		else {
			//checking for state allowance in combination with Georgia State
			var isHavingGA = ctrl.items.filter(function(d) { return d.data.payDedCode === 'GA'; });
			if(isHavingGA.length > 0 && ctrl.items.length > 1 && item.data.type.indexOf(ctrl.keys.stateTax) > -1 && item.data.payDedCode !== 'GA'){
				return false;
			}
			return true;
		}
	}

	ctrl.disableMaritalStatusAllowance = function(code){
		var statesDisabled = {
			'TX': true,
			'TN': true,
			'True' : true
		}

		return statesDisabled[code] === true ? true  : false;
	}

	ctrl.isMaritalAllowanceDisabled = function(item){
		var isExempt = item.data.exempt === 'Y';
		var isHavingGA = ctrl.items.filter(function(d) { return d.data.payDedCode === 'GA'; });

		if(isExempt && isHavingGA.length > 0){
			item.data.maritalAllowance = 0;
			return true;
		}
		else{
			return false;
		}
	};
}
