'use strict';

module.exports = ProfileDataService;

/* @ngInject */
function ProfileDataService(DS, $q,gso) {
	var me = this;

	// Private methods
	me._adjustPersonalInfo = function(profile) {
		return angular.merge({}, profile.personalInfo, {
			citizenship       : (profile.ssn && profile.ssn.nationalIds) ? profile.ssn.nationalIds.country : '',
			citizenshipStatus : (profile.citizenship && profile.citizenship.workEligibility) ? profile.citizenship.workEligibility.citizenshipStatus : ' ',
			ssnId             : (profile.ssn && profile.ssn.nationalIds) ? profile.ssn.nationalIds.id : ''
		});
	};

	me._adjustWork = function(profile) {
		var workPhone =  profile.contacts.filter(function(d) { return (d.accessType === 'Work' || d.accessType === 'Second Work') && d.media === 'Phone'; })[0];
		//var cellPhone = profile.contacts.filter(function(d) { return (d.accessType === 'Work' || d.accessType === 'Second Work') && d.media === 'Cellular'; })[0];
		if (profile.ssn && profile.ssn.alternateId === null) {
			profile.ssn.alternateId = angular.noop();
		}
		if(profile.work && profile.work.supervisorId.trim() === '') {
			profile.work.supervisorId = angular.noop();
		}
		return angular.merge({}, profile.work, {
			alternateId : profile.ssn ? profile.ssn.alternateId : angular.noop(),
			workPhone   : profile.work.workPhone || (workPhone ? workPhone.telephoneNumber : null),
			employeeId  : gso.getAppConfig().userId
			//cellPhone   : (cellPhone ? cellPhone.telephoneNumber : null)
		});
	};

	me._adjustProfile = function(results) {

		var compensation;
		if(results[8] && results[8].compensationList && results[8].compensationList.length > 0){
			compensation = results[8].compensationList[0];
		}

		var profile = {
			names             : results[0],
			work              : results[1].data,
			address           : results[2],
			personalInfo      : results[3],
			ssn               : results[4],
			citizenship       : results[5],
			emergencyContacts : results[6],
			contacts          : results[7],
			compensation			: compensation
		};

		return angular.merge({}, profile, {
			personalInfo : me._adjustPersonalInfo(profile),
			work         : me._adjustWork(profile)
		});
	};

	// Public methods
	me.fetch = function() {
		// some calls may fail, add error handling for each
		var promises = [
			DS.find('names', '').catch(angular.noop),
			DS.find('work', '').catch(angular.noop),
			DS.find('address', '').catch(angular.noop),
			DS.find('personalInfo', '',{ bypassCache: true }).catch(angular.noop),
			DS.find('ssn', '').catch(angular.noop),
			DS.find('citizenship', '').catch(angular.noop),
			DS.findAll('emergencyContacts', '').catch(angular.noop),
			DS.findAll('contacts', '', {
				params: {
					excludehistory: true
				}
			}).catch(angular.noop),
			DS.find('compensation', '').catch(function(e){console.log(e)})
		];

		return $q
			.all(promises)
			.then(me._adjustProfile);
	};

	return me;
}
