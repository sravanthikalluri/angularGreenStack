'use strict';

module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('app/main/dashboard');

	$stateProvider
		.state('app', {
			url: '/app',
			template: '<app></app>',
			abstract: true
		})
		.state('app.login', {
			url: '/login',
			views: {
				'appContent': {
					template: '<login></login>'
				}
			}
		})
		.state('app.main', {
			url: '/main',
			abstract: true,
			views: {
				'appContent': {
					template: '<main></main>'
				}
			}
		})
		.state('app.main.dashboard', {
			url: '/dashboard',
			views: {
				'mainContent': {
					template: '<dashboard></dashboard>'
				}
			}
		})
		.state('ssowidget', {
			url: '/ssowidget/:ssoId?param',
			template: '<tn-sso></tn-sso>'
		})
		/*-------------------Money-------------------*/
		.state('app.main.money', {
			url: '/money',
			views: {
				'mainContent': {
					template: '<ui-view/>'
				}
			}
		})
		.state('app.main.money.overview', {
			url: '/overview',
			template: '<money></money>'
		})
		.state('app.main.money.paychecks-and-statements', {
			url: '/paychecks-and-statements',
			template: '<paychecks-and-statements></paychecks-and-statements>'
		})
		.state('app.main.money.taxes', {
			url: '/taxes',
			template: '<tn-taxes></tn-taxes>'
		})
		.state('app.main.money.direct-deposit', {
			url: '/directDeposit',
			template: '<tn-direct-deposit></tn-direct-deposit>'
		})
		.state('app.main.money.edit-account', {
			url: '/directDeposit/editAccount',
			template: '<tn-edit-account></tn-edit-account>',
			params: {
				data: null
			},
			data:{title:'Money - Edit Account'}
		})
		.state('app.main.money.employment-verification', {
			url: '/employment-verification',
			template: '<tn-employment-verification></tn-employment-verification>'
		})
		.state('app.main.money.retirement-savings', {
			url: '/retirementSavings',
			template: '<retirement-savings-card></retirement-savings-card>'
		})
		.state('app.main.money.forms-and-policies', {
			url: '/moneyForms',
			template: '<money-forms></money-forms>',
			params: {
				data: ''
			}
		})
		.state('app.main.money.stateSpecific', {
			url: '/stateSpecificMoneyForms',
			template: '<state-specific-forms></state-specific-forms>',
			params: {
				data: {}
			},
			data:{title:'Money - State Specific Forms'}
		})
		/*-------------------Benefits-------------------*/
		.state('app.main.benefits', {
			url: '/benefits',
			views: {
				'mainContent': {
					template: '<ui-view/>'
				}
			}
		})
		.state('app.main.benefits.overview', {
			url: '/overview',
			template: '<benefits-overview></benefits-overview>'
		})
		.state('app.main.benefits.healthandCounseling', {
			url: '/healthandCounseling',
			template: '<health-and-counseling></health-and-counseling>'
		})
		.state('app.main.benefits.aca-marketplace', {
			url: '/acaMarketPlace',
			template: '<aca-market-place></aca-market-place>'
		})
		.state('app.main.benefits.resources', {
			url: '/resources',
			template: '<benefits-resources></benefits-resources>',
			params: {
				response : null
			}
		})
		.state('app.main.benefits.aleSelection', {
			url: '/aleSelection',
			template: '<aleselection></aleselection>'
		})
		.state('app.main.benefits.carriers', {
			url: '/carriers',
			template: '<carriers></carriers>'
		})
		.state('app.main.benefits.legal-notice', {
			url: '/legal-notice',
			template: '<benefits-legal-notice></benefits-legal-notice>'
		})
		.state('app.main.benefits.fsa-calculator', {
			url: '/fsa-calculator',
			template: '<fsa-calculator></fsa-calculator>',
			data:{title:'Benefits - FSA Calcualator'}
		})
		.state('app.main.profile', {
			url: '/profile',
			views: {
				'mainContent': {
					template: '<profile></profile>'
				}
			},
			params: {
				response: undefined
			},
			data:{title:'Profile'}
		})
		.state('app.main.public-profile', {
			url: '/public-profile',
			views: {
				'mainContent': {
					template: '<public-profile></public-profile>'
				}
			},
			params: {
				id: undefined
			},
			data:{title:'Public Profile'}
		})
		.state('app.main.company-announcements', {
			url: '/company-announcements',
			views: {
				'mainContent': {
					template: '<company-announcements></company-announcements>'
				}
			},
			params: {
				id: undefined
			},
			data:{title:'Company Announcements'}
		})

		.state('app.main.company-notices', {
        			url: '/company-notices',
        			views: {
        				'mainContent': {
        					template: '<comapny-notices></comapny-notices>'
        				}
        			},
        			params: {
        				id: undefined
					},
					data:{title:'Company Notices'}
        		})
		/*------------TimeOff------------------------*/
		.state('app.main.timeoff', {
			url: '/timeoff',
			views: {
				'mainContent': {
					template: '<ui-view/>'
				}
			}
		})
		/*------------Company------------------------*/
		.state('app.main.company', {
			url: '/company',
			views: {
				'mainContent': {
					template: '<ui-view/>'
				}
			}
		})
		.state('app.main.company.overview', {
			url: '/overview',
			template: '<tn-company-overview></tn-company-overview>'
		})
		.state('app.main.company.locations', {
			url: '/locations',
			template: '<tn-company-locations></tn-company-locations>',
			data:{title:'Company - Locations'}
		})
		.state('app.main.company.holiday-calendar', {
			url: '/holidayCalendar',
			template: '<tn-holiday-calendar></tn-holiday-calendar>'
		})
		.state('app.main.company.company-directory', {
			url: '/companyDirectory',
			template: '<tn-company-directory></tn-company-directory>'
		})
		.state('app.main.company.org-chart', {
			url: '/org-chart',
			template: '<org-chart></org-chart>'
		})
		.state('app.main.company.forms-and-policies', {
			url: '/companyForms',
			template: '<tn-forms-and-policies></tn-forms-and-policies>'
		})
		.state('app.main.company.stateSpecific', {
			url: '/stateSpecificForms',
			template: '<state-specific-forms></state-specific-forms>',
			params: {
				data: null
			},
			data:{title:'Company - State Specific Forms'}
		})
		.state('app.main.company.benefitsGuidebook', {
			url: '/benefitsGuidebook',
			template: '<benefits-guide-book></benefits-guide-book>',
			params:{
				data : ''
			},
			data:{title:'Company - Benefit Guide Book'}
		})
		.state('app.main.company.termsAndConditions', {
			url: '/termsAndConditions',
			template: '<terms-and-conditions></terms-and-conditions>',
			params: {
				data: null
			},
			data:{title:'Company - Terms and Conditions'}
		})
		.state('app.main.company.compliance', {
			url: '/compliance',
			template: '<compliance-notices></compliance-notices>',
			data:{title:'Company - Compliance Notices'}
		})
		.state('app.main.company.acknowledgements', {
			url: '/acknowledgements',
			template: '<eforms-acknowledgement></eforms-acknowledgement>',
			data:{title:'Company - Acknowledgements'}
		})
		.state('app.main.company.paidTimeOff', {
			   url: '/paidTimeOffPolicies',
			   template: '<paid-time-off-policies></paid-time-off-policies>',
			   data:{title:'Company - Paid Time Off'}
	     })
		/*------------------------Team------------------------*/
		.state('app.main.team', {
			url: '/team',
			views: {
				'mainContent': {
					template: '<team></team>'
				}
			}
		})
		.state('app.main.team.overview', {
			url: '/overview',
			template: '<team></team>'
		})
		.state('app.main.editProfile', {
			url: '/profile/editProfile',
			views: {
				'mainContent': {
					template: '<edit-profile></edit-profile>'
				}
			},
			data:{title:'Edit Profile'}
		})
		.state('app.main.edit-profile-personal', {
			url: '/profile/edit-profile-personal',
			views: {
				'mainContent': {
					template: '<edit-profile-personal></edit-profile-personal>'
				}
			},
			data:{title:'Edit Profile - Personal'}
		})
		.state('app.main.edit-profile-emergency', {
			url: '/profile/edit-profile-emergency',
			views: {
				'mainContent': {
					template: '<edit-profile-emergency></edit-profile-emergency>'
				}
			},
			data:{title:'Edit Profile - Emergency'}
		})
		.state('app.main.edit-profile-work', {
			url: '/profile/edit-profile-work',
			views: {
				'mainContent': {
					template: '<edit-profile-work></edit-profile-work>'
				}
			},
			data:{title:'Edit Profile - Work'}
		})
		.state('app.main.settings', {
			url: '/settings',
			views: {
				'mainContent': {
					template: '<settings></settings>'
				}
			}
		})
		.state('app.main.contact', {
			url: '/contact',
			views: {
				'mainContent': {
					template: '<contact></contact>'
				}
			}
		})
		.state('app.main.help', {
          			url: '/help',
          			views: {
          				'mainContent': {
          					template: '<browser-support></browser-support>'
          				}
          			}
          		})
		.state('app.main.help.browser-support', {
			url: '/browsers',
			template: '<browser-support></browser-support>'

		});
}
