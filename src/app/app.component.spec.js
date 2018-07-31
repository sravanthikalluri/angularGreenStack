var angular = require('angular');
require('angular-mocks');
describe('App component', function () {
  it('shoud not cause unit test error', angular.mock.inject(function () {
    expect(true).toBe(true);
  }));
});
