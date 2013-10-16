var stepDefinitions = function() {

this.Given(/^the app is running$/, function(callback) {
  // express the regexp above with the code you wish you had
  callback.pending();
});

this.When(/^I go to "([^"]*)"$/, function(arg1, callback) {
  // express the regexp above with the code you wish you had
  callback.pending();
});

this.Then(/^I should see "([^"]*)"$/, function(arg1, callback) {
  // express the regexp above with the code you wish you had
  callback.pending();
});

}

module.exports = stepDefinitions
