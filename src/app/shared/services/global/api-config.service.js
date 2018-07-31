'use strict';
module.exports = apiConfigService;
/* @ngInject */
	function apiConfigService(genericService) {
    return {
        execAll:function(){

            genericService.countries();

            genericService.states();

            genericService.gender();

            genericService.suffix();

            genericService.accessTypes();

            genericService.relationShips();

            genericService.maritalStatus();

			genericService.militaryStatus();

			genericService.ethnicity();

            genericService.addressTypes();

            genericService.media();

            genericService.formOfAddress();

        }
    };
}
