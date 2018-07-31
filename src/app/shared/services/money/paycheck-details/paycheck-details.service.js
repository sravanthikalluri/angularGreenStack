'use strict';

module.exports = PaycheckDetailsService;

/* @ngInject */
function PaycheckDetailsService(DS, moneyUrlConfig, Header, Detail,moment) {
	return DS.defineResource({
		name: 'paycheckDetails',
		idAttribute: 'id',
		basePath: '',
		endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.payroll +'/{companyId}/{empId}' + moneyUrlConfig.resources.payCheckDetails,
		deserialize: function(resourceConfig, data) {
			var createId = function(d) { d.id = JSON.stringify(d); };
			var json = data.data;
			var check = json.data;

			createId(check);
			createId(check.detail);
			createId(check.detail.totals);

			check.detail.taxData.forEach(createId);
			check.detail.earns.forEach(createId);
			check.detail.taxWithholdings.forEach(createId);
			check.detail.preTaxDedns.forEach(createId);
			check.detail.postTaxDedns.forEach(createId);
			check.detail.employerBenefits.forEach(createId);
			check.detail.employerBenefitsTaxable.forEach(createId);
			check.detail.employerBenefitsNonTaxable.forEach(createId);
			check.detail.ptos.forEach(createId);
			check.detail.netPayDistributions.forEach(createId);
			check.detail.directDepositDistributions.forEach(createId);

			return check;
		},
		methods: {
			getSummary: function() {
				//convert to float because they will be used to do calculation
				var netPay = parseFloat(this.detail.totals.curNetPay);
				var preTaxDedns = parseFloat(this.detail.totals.curPreDedn);
				var postTaxDedns = parseFloat(this.detail.totals.curPostDedn);
				var benefits = parseFloat(this.detail.totals.curEmpBenf);
				var taxes = parseFloat(this.detail.totals.curTaxes);

				return [
					{ label: 'Net Pay', 	 amount: netPay       },
					{ label: 'Pre-Tax Deductions',  amount: preTaxDedns  },
					{ label: 'Post-Tax Deductions', amount: postTaxDedns },
					{ label: 'Taxes', 	 amount: taxes 	  	  }
					//{ label: 'Benefits', amount: benefits 	  }

				];
			},
			getPayPeriod: function() {
				return moment(this.header.earnsBegDt).format('MMMM DD') + ' - ' + moment(this.header.earnsEndDt).format('MMMM DD');
			},
			getHeaderDetails: function() {
				return {
					company : {
						name : this.header.employerName,
						address1 : this.header.employerAddress1,
						address2 : this.header.employerAddress2,
						address3 : this.header.employerAddress3
					},
					employee : {
						name : this.header.name,
						address1 : this.header.address1,
						address2 : this.header.address2,
						address3 : this.header.address3,
						employeeId : this.header.employeeId,
						location: this.header.location,
						businessTitle: this.header.businessTitle
				      },
					netPay : this.header.netPay
				}
			}
		}
	});
}
