define(['/test/spec/app/requester.js', 'require', 'server'], function (Requester, require) {
  var app = require('server');

  var TestHelper = {

    withServer: function(callback) {
      var stopServer;
      stopServer = function() {
        app.close();
      };
      app.listen(3000);
      return callback(new Requester, stopServer);

    }

  }

  return TestHelper;
});
