'use strict';

module.exports = TaxesDataService;

/* @ngInject */
function TaxesDataService(DS, $q, $filter) {
	var svc = {};

	svc.fetchAllTaxes = fetchAllTaxes;
	svc.fetchI9Status = fetchI9Status;
	svc.fetchMaritalStatus = fetchMaritalStatus;
	svc.fetchAllTaxesWithDetails = fetchAllTaxesWithDetails;

	return svc;

	function fetchAllTaxes() {
		return DS.find('taxes', '');
	}

	function fetchI9Status() {
		return DS.find('i9-status', '');
	}

	function fetchMaritalStatus(payDedCode) {
		return DS.find('marital-status', payDedCode).then(function(data) {
			data.forEach(function(obj){
				delete obj["id"];
			});

			return data;
		});
	}

	function fetchAllTaxesWithDetails() {
		var def = $q.defer();

		var promises = [fetchAllTaxes(),fetchI9Status()];
		$q.all(promises).then(function(values) {
			values[0].forEach(function(c){ findTaxDetails(c)});
			values[0].i9Status = values[1].i9Status;
			def.resolve(values[0]);
		});

		return def.promise;
	}

	/*--- private functions ---*/
	function findTaxDetails(tax) {
		tax.elections = [];
		generateFedTaxObjectData(tax);
	}


	function generateFedTaxObjectData(tax) {
		if(tax.FedTaxWithholdings.length > 0){
			var input = null;

			if (tax.FedTaxWithholdings[0]) {
				input = tax.FedTaxWithholdings[0];
			} else if (!tax.FedTaxWithholdings[0] && tax.FedTaxWithholdings[1]) {
				input = tax.FedTaxWithholdings[1];
			}

			if (input.maritalStatus === null || input.maritalStatus !== 'Married') {
				input.isMarried = false;
			}else{
				input.isMarried = true;
			}

			input.addlAmount = input.addlAmount;
			input.allowances = input.allowancesRequested;
			input.exceedLimit = false;
			input.type =  'Federal';


			fetchMaritalStatus(input.payDedCode).then(function(response) {

				input.maritalStatusList = response;
				var single_object = $filter('filter')(response, function (d) {
					return d.taxMarStatDesc === input.maritalStatus;
				})[0];

				input.maritalStatusValue = single_object;

				setTaxesObject(tax,input);
				generateStateTaxObjectData(tax);
			});

		}
	}

	function generateStateTaxObjectData(tax) {
		angular.forEach(tax.StateTaxWithholdings, function (input, i) {
			if (input.maritalStatus === null || input.maritalStatus !== 'Married') {
				input.isMarried = false;
			}else{
				input.isMarried = true;
			}

			input.addlAmount = input.addlAmount;
			input.allowances = input.allowancesRequested;
			input.exceedLimit = false;
			input.type =  'State';

			fetchMaritalStatus(input.payDedCode).then(function(response) {

				input.maritalStatusList = response;
				var single_object = $filter('filter')(response, function (d) {
					return d.taxMarStatDesc === input.maritalStatus;
				})[0];

				input.maritalStatusValue = single_object;

				setTaxesObject(tax,input);

				if (tax.StateTaxWithholdings.length === i + 1) {
					generateLocalTaxObjectData(tax);
				}

			});


		});
	}

	function generateLocalTaxObjectData(tax) {
		angular.forEach(tax.LocalTaxWithholdings, function (input) {
			if (input.maritalStatus === null || input.maritalStatus !== 'Married') {
				input.isMarried = false;
			}else{
				input.isMarried = true;
			}

			input.addlAmount = input.addlAmount;
			input.allowances = input.allowancesRequested;


			input.type =  'Local';
			setTaxesObject(tax,input);
		});

	}

	function setTaxesObject(tax,object){
		if(tax.elections){
			tax.elections.push(object);
		}else{
			tax.elections = [];
			tax.elections.push(object);
		}
	}

}
