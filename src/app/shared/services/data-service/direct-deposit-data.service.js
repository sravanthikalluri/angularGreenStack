'use strict';

module.exports = DirectDepositDataService;

/* @ngInject */
function DirectDepositDataService(DS, $q, moment) {
	var svc = {};

	svc.fetchAllDirectDepositAccounts = fetchAllDirectDepositAccounts;
	svc.fetchPayChecks = fetchPayChecks;
	svc.fetchAllDirectDepositAccountsWithDetails = fetchAllDirectDepositAccountsWithDetails;

	return svc;

	function fetchAllDirectDepositAccounts() {
		var def = $q.defer();

		 DS.find('direct-deposit', '').then(function (results) {
			 def.resolve(results);
		}).catch(function(error) {
			 def.resolve(error.data);
		});

		return def.promise;

	}

	function fetchPayChecks() {
		var def = $q.defer();

		 DS.find('paychecks', '').then(function (results) {
			 def.resolve(results);
		}).catch(function(error) {
			 def.resolve(error.data);
		});

		return def.promise;
	}





	function fetchAllDirectDepositAccountsWithDetails() {
		var def = $q.defer();

		var promises = [fetchAllDirectDepositAccounts(),fetchPayChecks()];
		$q.all(promises).then(function(values) {

		    if(!values[0]._error){
				var totalEarningsDataObject = {};

				angular.forEach(values[0].currentlyEffective, function (value, key) {

					var currentlyEffectiveNetBalanceAccountIndex = getNetBalanceAccountIndex(value);
					if(currentlyEffectiveNetBalanceAccountIndex !== 0){
						value = resetPriorityOrder(value,currentlyEffectiveNetBalanceAccountIndex);
					}
					value = resetPriority(value);

					totalEarningsDataObject['Currently Effective'] = populateAccountDetails(value);
				});
				angular.forEach(values[0].futureEffective, function (value, key) {
					var futureEffectiveNetBalanceAccountIndex = getNetBalanceAccountIndex(value);
					if(futureEffectiveNetBalanceAccountIndex !== 0){
						value = resetPriorityOrder(value,futureEffectiveNetBalanceAccountIndex);
					}
					value = resetPriority(value);
					totalEarningsDataObject['Effective ' + key] = populateAccountDetails(value);
				});

				def.resolve({accounts :totalEarningsDataObject,paychecks :  values[1], apeligible : values[0] ? values[0].apeligible : "" , fsaeligible : values[0] ? values[0].fsaeligible : "" ,minEffectiveDate:values[0]  ? values[0].minEffectiveDate :""});
			}else{
				def.resolve({accounts : values[0], paychecks:  values[1]});
		    }

		});

		return def.promise;
	}

	/** Get the net balance account index value
	 * @returns {number}
	 */
	function getNetBalanceAccountIndex(data) {
		var indexValue = 0;
		angular.forEach(data, function (account, index) {
			if (account.netBalance) {
				indexValue = index;
			}
		});
		return indexValue;
	};
	function resetPriorityOrder(earningsData,index){
		var netBalanceAccount = earningsData[index];
		earningsData.splice(index,1);
		var tempData = earningsData;
		tempData.splice(0,0,netBalanceAccount);
		earningsData = tempData;

		return earningsData;
	};


	function populateAccountDetails(acounts) {

		acounts.sort(function (fromObj, toObj) {
			return parseInt(fromObj.priority, 10) - parseInt(toObj.priority, 10);
		});

		var data = [];

		angular.forEach(acounts, function (input) {
			input.account_number = input.accountType+'****'+input.accountNumber.substr(input.accountNumber.length - 4, input.accountNumber.length);
			if(input.netBalance) {
				data.push(input);
			}
			else{
				data.unshift(input);
			}
		});

		return data;

	}

	function toggleFlags(accountData) {
		var netBalance = accountData.netBalance,
			fsaAccount = accountData.fsaAccount,
			apAccount = accountData.apAccount;

		if (!netBalance) {
			accountData.netBalance = true;
		}
		if (!fsaAccount) {
			accountData.fsaAccount = true;
		}
		if (!apAccount) {
			accountData.apAccount = true;
		}

		return accountData;
	}

	function havingFSAAccount(acounts){
		var isHavingFSAAccount = false;
		angular.forEach(acounts, function (input) {
			if(input.fsaAccount) {
				isHavingFSAAccount = true;
			}
		});

		return isHavingFSAAccount;
	}

	function havingAPAccount(acounts){
		var isHavingAPAccount = false;
		angular.forEach(acounts, function (input) {
			if(input.apAccount) {
				isHavingAPAccount = true;
			}
		});

		return isHavingAPAccount;
	}

	function makeNetBalanceAccount(earningsData){
		angular.forEach(earningsData, function (value, key) {
			if(value.length === 1){
				value[0] = toggleFlags(value[0])
			}else{
				var isHavingFSAAccount = havingFSAAccount(value);
				var isHavingAPAccount = havingAPAccount(value);

				value.forEach(function(account){
					if (account.netBalance && !isHavingFSAAccount) {
						account.fsaAccount = true;
					}
					if (account.netBalance && !isHavingAPAccount) {
						account.apAccount = true;
					}

				});
			}

		});
		return earningsData;
	};
	function resetPriority(earningData){
		angular.forEach(earningData, function (value, index) {
			if (!value.netBalance) {
				value.priority = 700 - (index * 25);
			} else if (value.netBalance) {
				value.priority = 700;
			}
		});
		return earningData;
	};






}
