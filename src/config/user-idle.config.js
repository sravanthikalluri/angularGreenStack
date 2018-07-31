module.exports = userIdleConfig;

/** @ngInject */
function userIdleConfig(IdleProvider){
    IdleProvider.idle(2700); // 45 min
    IdleProvider.timeout(5); //5s
}