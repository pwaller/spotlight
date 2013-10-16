define(['test/spec/app/test-helper.js'], function (Requester) {

  var TestHelper = {

    withServer: function(callback) {
      var app, stopServer;
      asyncSpecWait();
      app = require("app/server.js").app;
      stopServer = function() {
        app.close();
        return asyncSpecDone();
      };
      app.listen(3000);
      return callback(new Requester, stopServer);

    }

  }

  return TestHelper;
});
