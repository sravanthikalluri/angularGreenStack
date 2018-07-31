'use strict';

module.exports = RetirementSavingsDataService;

/* @ngInject */
function RetirementSavingsDataService(DS, $q, $filter) {
	var svc = {};

	svc.fetchRetirementSavings = fetchRetirementSavings;
	svc.fetchPlanTypes = fetchPlanTypes;
	svc.fetch401kVendors = fetch401kVendors;
	svc.fetchAllRetirementSavingsDetails = fetchAllRetirementSavingsDetails;

	return svc;

	function fetchRetirementSavings() {
		var def = $q.defer();

		 DS.find('retirement-savings', '').then(function (results) {
			 def.resolve(results);
		}).catch(function(error) {
			 def.resolve(error.data);
		});

		return def.promise;

	}

	function fetchPlanTypes() {
		var def = $q.defer();

		 DS.find('plan-types', '').then(function (results) {
			 def.resolve(results);
		}).catch(function(error) {
			 def.resolve(error.data);
		});

		return def.promise;
	}

	function fetch401kVendors() {
		var def = $q.defer();

		DS.find('401K-vendors', '').then(function (results) {
			def.resolve(results.response);
		}).catch(function(error) {
			def.resolve(error.data);
		});

		return def.promise;
	}



	function fetchAllRetirementSavingsDetails() {
		var def = $q.defer();

		var promises = [fetchPlanTypes(),fetchRetirementSavings(),fetch401kVendors()];
		$q.all(promises).then(function(values) {

		    if(!values[0]._error){
				var response = {};
				if(values[1]._statusCode === "404"){
					response['contributions'] = null;
				}
				else {
					response = values[1].data;
					response.contributions.map(function (item) {
						var selectedPlan = values[0].data.filter(function (plan) {
							return plan.benefitPlan === item.benefitPlan;

						});
						item.details.goalAmount = item.details.goalAmount ? item.details.goalAmount : response.federalAmount;
						item.selectedPlan = selectedPlan[0];

					});
				}

				response.vendorPlan = values[2].data;
				def.resolve({data :  response});

		    }else{
				def.resolve({ data:  values[1]});
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
			data.push(input);
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
