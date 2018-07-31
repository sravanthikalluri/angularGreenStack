'use strict';

module.exports = DetailService;

/* @ngInject */
function DetailService(DS) {
	return DS.defineResource({
		name: 'detail',
		idAttribute: 'id',
		relations: {
			belongsTo: {
				paycheckDetails: {
					localField: 'paycheckDetails',
					localKey: 'paycheckDetailsId'
				}
			},
			hasMany: {
				taxData: {
					localField: 'taxData',
					foreignKey: 'detailId'
				},
				earns: {
					localField: 'earns',
					foreignKey: 'detailId'
				},
				taxWithholdings: {
					localField: 'taxWithholdings',
					foreignKey: 'detailId'
				},
				preTaxDedns: {
					localField: 'preTaxDedns',
					foreignKey: 'detailId'
				},
				postTaxDedns: {
					localField: 'postTaxDedns',
					foreignKey: 'detailId'
				},
				employerBenefits: {
					localField: 'employerBenefits',
					foreignKey: 'detailId'
				},
				employerBenefitsTaxable: {
					localField: 'employerBenefitsTaxable',
					foreignKey: 'detailId'
				},
				employerBenefitsNonTaxable: {
					localField: 'employerBenefitsNonTaxable',
					foreignKey: 'detailId'
				},
				totals: {
					localField: 'totals',
					foreignKey: 'detailId'
				},
				ptos: {
					localField: 'ptos',
					foreignKey: 'detailId'
				},
				netPayDistributions: {
					localField: 'netPayDistributions',
					foreignKey: 'detailId'
				},
				directDepositDistributions: {
					localField: 'directDepositDistributions',
					foreignKey: 'detailId'
				}
			}
		}
	});
}
