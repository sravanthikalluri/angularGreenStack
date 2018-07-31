'use strict';

module.exports = TaxWithholdingForm;

/* @ngInject */
function TaxWithholdingForm($q, DS, taxWithholdingEffectiveDate,taxWithholdingDisabledFields) {
	var me = this;

	// Converts certain properties from description => code so that the API does not throw errors
	me._convertCodes = function(uniqueTaxItems, dict) {
		var uniqueTaxItemsCopy = angular.copy(uniqueTaxItems);

		uniqueTaxItemsCopy.forEach(function(item, i) {
			// Converts from Yes/No to Y/N
			item.exempt = (item.exempt === 'Nonresident Alien' ? item.exempt : item.exempt === 'Yes' ? 'Y' : 'N');
			item.tempMaritalStatusAllowance = item.maritalStatusAllowance;
			item.showDependantAllowences = false;

			// Converts marital status description to code (i.e. Single => S)
			var maritalObject = dict[item.payDedCode].filter(function(d) { return d.value === item.maritalStatus; });
			item.maritalStatus = maritalObject.length === 0 ? "" :maritalObject[0].key;

			// Prefixes the pdfUrl with /api-content/ so it can fetch PDFs
			if (item.isPDFAvailable === 'true') {
				Array.isArray(item.pdfURL) ?
					item.pdfURL.forEach(function(pdfItem) {
						(pdfItem.url ==='/')? pdfItem.url = '/api-content' + pdfItem.url : pdfItem.url = pdfItem.url;
					})
					: (item.pdfURL.url ==='/')? item.pdfURL.url = '/api-content' + item.pdfURL.url : item.pdfURL.url = item.pdfURL.url;
			}

			// Case where State tax type is prefixed with the payDedCode -- force the type to be 'State tax'.
			if (item.type.indexOf('State tax') !== -1) {
				item.type = 'State tax';
				item.maxValue = 3;
				item.tempAllowancesRequested = item.allowancesRequested;
				item.allowancesRequested  = taxWithholdingDisabledFields.hideAllowancesForStates[item.payDedCode] ? null : item.allowancesRequested;
			}else{
				item.maxValue = 2;
			}
			// Round percentageGross to 1 decimal point and convert to string
			if (item.percentageGross) {
				item.percentageGross = (Math.round(item.percentageGross * 10) / 10).toString();
			}
		});

		return uniqueTaxItemsCopy;
	};

	// Converts the form data into the structure that the API expects
	me._getPayload = function(data) {
		var taxes = data.items.map(function(d) { return d.data; });
		var localTaxes = data.otherItems  ? data.otherItems : [];

		return {
			employeeId           : data.employeeId,
			effectiveDate        : taxWithholdingEffectiveDate.getNext(data.effectiveDate),
			FedTaxWithholdings   : taxes.filter(function(d) { return d.type === 'Federal tax'; }),
			StateTaxWithholdings : taxes.filter(function(d) { return d.type === 'State tax'; }),
			LocalTaxWithholdings : localTaxes
		};
	};

	// Returns a dictionary with the payDedCode mapped to a maritalStatus array
	// i.e. { '$$US': [{ key: 'S', value: 'Single' }] }
	me._getMaritalStatusDict = function(uniqueTaxItems, maritalStatuses) {
		return uniqueTaxItems.reduce(function(result, d, i) {
			result[d.payDedCode] = maritalStatuses[i];
			return result;
		}, {});
	};

	// Converts marital statuses to use key/value instead of taxMaritalStat/taxMaritalDesc.
	// This is so it can be consumed by the <tn-select> component later on.
	me._convertMaritalStatuses = function(maritalStatuses) {
		return maritalStatuses.map(function(statuses) {
			return statuses.map(function(d) {
				return {
					key   : d.taxMaritalStat,
					value : d.taxMarStatDesc
				};
			});
		});
	};

	me.filterMaritalStatusForGeorgiaState = function(newUniqueTaxItems){
		var isHavingGA = newUniqueTaxItems.filter(function(d) { return d.payDedCode === 'GA'; });
		return newUniqueTaxItems.filter(function(item){
			if(item.type === 'State tax' && item.payDedCode === 'GA'){
				item.maritalStatusAllowance = item.maritalStatus === 'M'? [0,1,2] : [0,1];
				item.showDependantAllowences = true;
				item.allowancesRequested = item.maritalAllowance;
			}
			else if(item.type === 'State tax' && isHavingGA.length > 0 && item.payDedCode !== 'GA'){
				item.maritalStatusAllowance = isHavingGA[0].maritalStatus === 'M'? [0,1,2] : [0,1];
				item.maritalAllowance = item.allowancesRequested;
				item.dependentAllowances = item.addlExempts;
				item.showDependantAllowences = true;
			}
			return item;
		});
	};
	// Returns an array of objects that the <w4-modal-table> can easily render with ng-repeat.
	// Each element comes with its own marital status dropdown data.
	me._getItems = function(uniqueTaxItems, maritalStatuses) {
		var newMaritalStatuses = me._convertMaritalStatuses(maritalStatuses);
		var maritalStatusDict = me._getMaritalStatusDict(uniqueTaxItems, newMaritalStatuses);
		var newUniqueTaxItems = me._convertCodes(uniqueTaxItems, maritalStatusDict);
        var newUniqueUpdatedTaxItems = me.filterMaritalStatusForGeorgiaState(newUniqueTaxItems);
		return newUniqueUpdatedTaxItems.map(function(data) {
			var dropdown = maritalStatusDict[data.payDedCode];

			return {
				data     : data,
				dropdown : dropdown,
				selected : dropdown.filter(function(d) { return d.key === data.maritalStatus; })[0]
			};
		})
	};

	// Handle case where LocalTaxWithholding is present in JSON but is in read-only mode
	me._getOtherItems = function(tax, uniqueTaxItems) {
		var otherItems = uniqueTaxItems.filter(function(d) { return d.type === 'Local tax'; }).length === 0 ? null : tax.LocalTaxWithholdings;

		if (otherItems == null || otherItems.length == 0) {
			return null;
		}
		else {
			return otherItems;
		}
	};

	me._getUniqueTaxes = function(tax,uniqueTaxItems){
		var uniquesTaxes = [];
		uniqueTaxItems.filter(function(d) { return d.type === 'Federal tax'; }).length !== 0 ? uniquesTaxes.push({id : 0,type: 'Federal tax',name:'Federal',class:'active-state'}) : null;
		uniqueTaxItems.filter(function(d) { return d.type === 'State tax'; }).length !== 0 ? uniquesTaxes.push({id : 1,type: 'State tax',name:'State',class:'pending-state'}) : null;

		return uniquesTaxes;
	};
	// Creates the data that our components can easily consume.
	me._create = function(tax, uniqueTaxItems) {
		return function(maritalStatuses) {
			return {
				employeeId       : tax.employeeId,
				effectiveDate    : tax.effectiveDate,
				affirmationText : tax.affirmationText,
				substantialText : tax.substantialText,
				items            : me._getItems(uniqueTaxItems, maritalStatuses),
				otherItems       : me._getOtherItems(tax, uniqueTaxItems),
				uniqueTaxes : me._getUniqueTaxes(tax,uniqueTaxItems)
			};
		};
	};

	// Public
	me.fetch = function(tax) {
		if (tax) {
			var items = [tax.FedTaxWithholdings, tax.StateTaxWithholdings, tax.LocalTaxWithholdings];
			// Flattens the Federal, State, and Local taxes from 2-D => 1-D array. Returns a new array
            		// that have elements with non-null payDedCodes
            		var reduced = items
            			.reduce(function(a, b) { return a.concat(b); }, [])
            			.filter(function(d) { return d.payDedCode !== null; })

            		// Extracts unique elements
            		var uniqueTaxItems = reduced
            			.filter(function(d, i) { return reduced.indexOf(d) === i; });

            		// Load all maritalStatuses for Federal, State, and Local tax in parallel
            		var promises = uniqueTaxItems
            			.map(function(d) { return DS.find('marital-status', d.payDedCode); });

            		// High-level flow:
            		// 1. Build dictionary from marital status codes that maps payDedCode => particular maritalStatus array
            		// 2. Use the marital status dictionary to create a custom object that our components can easily consume.
            		return $q
            			.all(promises)
            			.then(me._create(tax, uniqueTaxItems));
		}



	};

	me.save = function(data) {

		return DS
			.update('taxes', '', me._getPayload(data))
			.then(function(results) {
				DS.ejectAll(['taxes']);

				return results;
			});
	};

	return me;
}
