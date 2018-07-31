'use strict';

require('./edit-account-table.component.scss');

module.exports = {
	templateUrl: 'app/main/money/direct-deposit/edit-account/edit-account-table/edit-account-table.component.html',
	controller: ['$rootScope','utilService','$filter','$uibModal','constants',EditAccountTableController],
	bindings: {
		data: '=',
		lastPaycheckAmount : '<',
		remainingAmount : '=',
		doAnyChanges : '=',
		invalid : '=',
		error: '&'
	}
};

/* @ngInject */
function EditAccountTableController($rootScope,utilService,$filter,$uibModal,constants) {
	var ctrl = this;

	// TODO: Remove and implement one-way data binding properly.
	$rootScope.$on('onNewAccountModalClose', function(e, data) {
		ctrl.data = data.data;
		ctrl.resetAccounts();
		ctrl.onChange();
	});

	ctrl.$onInit = function() {
		var orderHelpText = $filter('translate')('money.direct_deposit.orderHelpText');
		var netBalanceHelpText = $filter('translate')('money.direct_deposit.netBalanceHelpText');
		var depositHelpText = $filter('translate')('money.direct_deposit.depositHelpText');
		var estimatedAmountHelpText = $filter('translate')('money.direct_deposit.estimatedAmountHelpText');
		ctrl.titles = [
			{
				title: 'Order',
				class: 'account-drag',
				tooltip: 'true',
				toolMessage: orderHelpText
			},
			{
				title: 'Account',
				class: 'account-name'
			},
			{
				title: 'Net Balance',
				class: 'net-balance',
				tooltip: 'true',
				toolMessage: netBalanceHelpText
			},
			{
				title: 'Deposit',
				class: 'deposit',
				tooltip: 'true',
				toolMessage: depositHelpText
			},
			{
				title: 'Estimated Amount',
				class: 'estiamted-amount',
				tooltip: 'true',
				toolMessage: estimatedAmountHelpText
			}
		];

		ctrl.resetAccounts();

	};
	ctrl.resetAccounts = function(){
		if (ctrl.data && ctrl.data.length > 0) {
			var accounts = [];
			angular.forEach(ctrl.data,function(account,index){
				if (account.netBalance) {
					ctrl.netBalanceSelected = {key : index, value : utilService.mockAccount(account)};
					account['data'] = {exempt:'Y'};
				}
				if(account.amount){
					account['data'] = {exempt:'Y'};
				}
				else if(account.percent){
					account['data'] = {exempt:'N'};
				}
				accounts.push({key : index,value : utilService.mockAccount(account)})
			});
			ctrl.accounts = angular.copy(accounts);
		}
	};

	ctrl.confirmDeleteAccount = function(index){
		ctrl.confirmData = {};
		ctrl.confirmData.messsage = 'money.direct_deposit.dd_confirm-delete';
		ctrl.confirmData.yesButton = 'money.direct_deposit.dd-yes-delete';
		ctrl.confirmData.noButton = 'preferences-card-email-toggle-false-label';

		if (ctrl.data[index].fsaAccount) {
			ctrl.confirmData.yesButton = 'money.direct_deposit.dd-yes-delete';
			ctrl.confirmData.messsage = 'confirm-fsa-delete';
		} else if (ctrl.data[index].apAccount) {
			ctrl.confirmData.yesButton = 'money.direct_deposit.dd-yes-delete';
			ctrl.confirmData.messsage = 'confirm-ap-delete';
		}
		ctrl.prompt()
			.then(function() {
				ctrl.data.splice(index, 1);
				ctrl.onChange();
			})
			.catch(function() {});
	};

	ctrl.deleteAccount = function(index){
		var account = ctrl.data[index];
		if(ctrl.data.length > 1 && account.netBalance){
			var customIdAlert = {
				_statusCode: constants.error,
				_statusMessage: $filter('translate')('money.direct_deposit.netBalanceAmountDeleteMessage')
			};
			ctrl.error({errorData : customIdAlert});

		}
		else{
			ctrl.confirmDeleteAccount(index);
		}
	};


	ctrl.prompt = function() {
		var modal = $uibModal.open({
			template  : '<tn-confirmation-modal></tn-confirmation-modal>',
			component : 'tnConfirmationModal',
			resolve   : {
				data: function() { return angular.merge({}, ctrl.confirmData); }
			}
		});
		return modal.result;
	};


	ctrl.selectAccount = function(index,key){
		ctrl.data.forEach(function(account,innerIndex){
			if(innerIndex === index){
				account[key] = true;
			}else{
				account[key] = false;
			}
		});
	};

	ctrl.onChange = function (index,type,value) {
		var lastPaycheckAmount = angular.copy(ctrl.lastPaycheckAmount);
		if(typeof value === 'undefined' || value === null || value === ''){
			if (type === 'dollar') {
				ctrl.data[index].amount = '';
			}else if (type === 'percentage') {
				ctrl.data[index].percent = '';
			}
		}
		populateObject(ctrl.data, lastPaycheckAmount);
	};



	ctrl.onDropComplete = function (index, obj) {
		var otherObj = ctrl.data[index],
			otherIndex = ctrl.data.indexOf(obj),
			dataPriority = ctrl.data[index].priority;

		if(otherIndex > index){
			ctrl.data[index].priority = ctrl.data[otherIndex].priority;
			ctrl.data[otherIndex].priority = dataPriority;
			ctrl.data[index] = obj;
			ctrl.data[otherIndex] = otherObj;
			var lastPaycheckAmount = angular.copy(ctrl.lastPaycheckAmount);

			populateObject(ctrl.data, lastPaycheckAmount);
		}

	};

    function sortOnPriority(data){
		data.sort(function compareIndexFound(a, b) {
			if (a.priority < b.priority) { return -1; }
			if (a.priority > b.priority) { return 1; }
			return 0;
		});
	}

	ctrl.resetPriority = function(accountsData){
		angular.forEach(accountsData, function (value, index) {
			if (!value.netBalance) {
				value.priority = 700 - (index * 25);
			} else if (value.netBalance) {
				value.priority = 700;
			}
		});
		return accountsData;
	};

	function populateObject(data, lastPaycheckAmount) {
		var remPayCheck = 0;

		angular.forEach(data, function (input) {
			if (typeof input.amount !== 'undefined' && input.amount !== null && !input.netBalance) {
				input.amountType = 'dollar';
				input.remAmount = parseFloat(input.amount == "" ? 0 : input.amount);
				remPayCheck = angular.extend(lastPaycheckAmount - input.remAmount);
				lastPaycheckAmount = parseFloat(lastPaycheckAmount) - parseFloat(input.remAmount);
				input.payCheck = remPayCheck;
			} else if (typeof input.percent !== 'undefined' && input.percent !== null && !input.netBalance) {
				input.amountType = 'percentage';
				lastPaycheckAmount = parseFloat(lastPaycheckAmount).toFixed(2);
				input.percAmout = lastPaycheckAmount < 0 ? 0.00 : lastPaycheckAmount;
				input.remAmount = parseFloat(((input.percent / 100) * lastPaycheckAmount).toFixed(2)) < 0 ? 0.00 : parseFloat(((input.percent / 100) * lastPaycheckAmount).toFixed(2));
				remPayCheck = lastPaycheckAmount = angular.extend(lastPaycheckAmount - parseFloat((input.remAmount.toFixed(2))));
				input.payCheck = parseFloat(remPayCheck.toFixed(2));
			} else{
					input.payCheck = input.remAmount = ctrl.remainingAmount =  parseFloat(lastPaycheckAmount.toFixed(2)) < 0 ? 0.00 : lastPaycheckAmount;
					input.amountType = input.netBalance ? 'netBalance' : null;
					input.amount = null;
			}

		});

		ctrl.doAnyChanges = true;
		if(data.length > 0){
			var invalid = false;
			data.filter(function(item){
				if(item.amountType === 'dollar' && !item.netBalance && !invalid){
					invalid = (!item.amount  || parseFloat(item.amount) === 0 ) ? true : false;
				}else if(item.amountType === 'percentage' && !item.netBalance && !invalid){
					invalid = (!item.percent || parseFloat(item.percent) === 0) ?  true : false;
				}
				ctrl.invalid = invalid;
			});

		}
		$rootScope.$broadcast('onChangeAccounts', { data: ctrl.data });
    }

	function getAmountType(type, data) {
		if (type === 'dollar') {
			data.percentOld = data.percent;
			data.percent = null;
			if (data.amountOld !== undefined && data.amountOld !== null) {
				data.amount = data.amountOld;
			} else {
				data.amount = '';
			}
			data.amountType = 'dollar';

		} else if (type === 'percentage') {
			data.amountOld = data.amount;
			if (data.percentOld !== undefined && data.percentOld !== null) {
				data.percent = data.percentOld;
			} else {
				data.percent = '';
			}
			data.amount = null;
			data.amountType = 'percentage';
		}

		return data;
	}

	ctrl.changeAmountType = function (index,type) {
		var lastPaycheckAmount = angular.copy(ctrl.lastPaycheckAmount);
		ctrl.data[index] = getAmountType(type,ctrl.data[index]);
		//populateObject(ctrl.data, lastPaycheckAmount);
	};

	ctrl.onNetBalanceChange = function(selectedIndex, isSelected){
		var havingNetBalance = false;
		angular.forEach(ctrl.data, function (account, index) {
			if(index !== selectedIndex || isSelected === false){
				if(account.netBalance){
				    account.data.exempt = 'Y';
					getAmountType("dollar", account);
					account.netBalance = false;
				}else{
					account.netBalance = false;
					if(!havingNetBalance && index == selectedIndex){getAmountType("dollar", ctrl.data[selectedIndex])}
				}
			}
			else{
				havingNetBalance = true;
				ctrl.data[selectedIndex].netBalance  = true;
				ctrl.data[selectedIndex].data.exempt = 'Y';
				ctrl.data[selectedIndex].priority = 700;
				ctrl.data[selectedIndex].amountType = 'dollar';
				ctrl.data[selectedIndex].percent = 0;
				ctrl.data[selectedIndex].amount = 0;
			}
		});
		ctrl.resetPriority(ctrl.data);
		//sortOnPriority(ctrl.data);
		if (selectedIndex !== ctrl.data.length - 1) {
			var selectedItem = ctrl.data.splice(selectedIndex, 1);
			var netBalItem = ctrl.data.splice(ctrl.data.length - 1, 1);
			ctrl.data.push(selectedItem[0]);
			ctrl.data.splice(selectedIndex, 0, netBalItem[0]);
		}

		populateObject(ctrl.data, ctrl.lastPaycheckAmount)
	};

	ctrl.getNetBalanceAccountIndex = function (data) {
		var indexValue = 0;
		angular.forEach(data, function (account, index) {
			if (account.netBalance) {
				indexValue = index;
			}
		});
		return indexValue;
	};

	ctrl.getAccountIndex = function (data,priority) {
		var indexValue = 0;
		angular.forEach(data, function (account, index) {
			if (account.priority === priority) {
				indexValue = index;
			}
		});
		return indexValue;
	};



	ctrl.selectNetBalanceAccount = function(selectedObjectIndex){
		var selectedObject = ctrl.data[selectedObjectIndex],
			selectedObjectPriority = selectedObject.priority,
			currentNetBalanceAccountIndex = ctrl.getNetBalanceAccountIndex(ctrl.data),
			currentNetBalanceObject = ctrl.data[currentNetBalanceAccountIndex];


		selectedObject.netBalance = true;
		selectedObject.priority = 700;

		currentNetBalanceObject.priority = selectedObjectPriority;
		currentNetBalanceObject.amountType = selectedObject.amountType;
		currentNetBalanceObject.netBalance = false;
		currentNetBalanceObject.percent = selectedObject.percent;
		currentNetBalanceObject.amount = selectedObject.amount;


		ctrl.data[selectedObjectIndex] = currentNetBalanceObject;
		ctrl.data[currentNetBalanceAccountIndex] = selectedObject;

		var lastPaycheckAmount = angular.copy(ctrl.lastPaycheckAmount);
		populateObject(ctrl.data, lastPaycheckAmount);
		ctrl.resetAccounts();

	};
	ctrl.updateAccount = function (value) {
		ctrl.data[ctrl.indexNumber] = value;
		ctrl.data[ctrl.indexNumber].account_number = value.accountType+'****'+value.accountNumber.substr(value.accountNumber.length - 4, value.accountNumber.length);
		delete ctrl.data[ctrl.indexNumber].update;
	};

	ctrl.editModalPopup = function (obj,index) {
		ctrl.indexNumber = index;
		var modalInstance = $uibModal.open({
			template: '<tn-edit-accoun-modal-popup></tn-edit-accoun-modal-popup>',
			component: 'tnEditAccounModalPopup',
			windowClass: 'edit-account-modal',
			resolve: {
				modalData: function() {return angular.extend({}, obj, {update: ctrl.updateAccount});}
			}
		});
		return modalInstance.result;
	};


}
