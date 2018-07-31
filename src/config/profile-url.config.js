'use strict';

module.exports ={
	profileApi: "",
	profileBase: "/api-profile/v1/identity/",
	profileSecurityCustomLogin:  "/api-profile/v1/security/",
	profileBaseUrl: "/api-profile/v1/",
	profilePictureBaseUrl: "/api-profile/v1/profile/",
	resources: {
		profile:"profile/",
		name: "/names",
		platform:"platform",
		contact: "/contacts",
		address: "/addresses",
		addresses: "/addresses?effectivedate=",
		personalInfo: "/personals",
		personalStatusUpdate: "/personal-status",
		personal: "/personals?uniqueId=",
		workprofile: "/employment-info",
		personalstatus: "/personals?effectivedate=",
		personalStatus: "/ssn",
		ssnInfo: '/identity-info',
		emergencyContact: "/emergency-contacts",
		employmentDetails: "/employee-details",
		totalEmpDetails: "/employment-details",
		bussinesTitleChange: "business-title",
		locations: "locations",
		departments: "departments",
		employmentChange: "employment-change",
		jobs: "jobs",
		companies: "/companies",
		citizenship: "/citizenship",
		picture: "/photos",
		compensation: "/compensation"
	}
};
